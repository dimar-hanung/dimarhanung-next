import { marked, type Tokens } from 'marked';
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  convertInchesToTwip,
  type IParagraphOptions,
  type IStylesOptions,
  type ParagraphChild,
} from 'docx';
import {
  type DocxTemplateConfig,
  type DocxTemplateId,
  getDocxTemplate,
} from './markdown-to-docx-templates';

const BULLET_REF = 'md2docx-bullets';
const ORDERED_REF = 'md2docx-numbers';

const HEADING_LEVELS: Record<number, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
  1: HeadingLevel.HEADING_1,
  2: HeadingLevel.HEADING_2,
  3: HeadingLevel.HEADING_3,
  4: HeadingLevel.HEADING_4,
  5: HeadingLevel.HEADING_5,
  6: HeadingLevel.HEADING_6,
};

const HEADING_STYLE_IDS: Record<number, string> = {
  1: 'Heading1',
  2: 'Heading2',
  3: 'Heading3',
  4: 'Heading4',
  5: 'Heading5',
  6: 'Heading6',
};

type DocxImageType = 'jpg' | 'png' | 'gif' | 'bmp';

interface FetchedImage {
  type: DocxImageType;
  data: Uint8Array;
  displayWidth: number;
  displayHeight: number;
}

interface BuildContext {
  template: DocxTemplateConfig;
  imageCache: Map<string, FetchedImage | null>;
  mermaidCache: Map<string, FetchedImage | null>;
}

interface InlineRun {
  text: string;
  bold?: boolean;
  italics?: boolean;
  strike?: boolean;
  code?: boolean;
  link?: string;
  image?: { href: string; alt: string };
}

const DEFAULT_MAX_IMAGE_WIDTH_PX = 580;

function getContentWidthTwip(template: DocxTemplateConfig): number {
  if (!template.page) return 9360;
  return template.page.size.width - template.page.margin.left - template.page.margin.right;
}

function getMaxImageWidthPx(template: DocxTemplateConfig): number {
  return Math.max(120, Math.round(getContentWidthTwip(template) / 15));
}

function scaleImageDimensions(
  width: number,
  height: number,
  maxWidth: number,
): { width: number; height: number } {
  if (width <= 0 || height <= 0) return { width: maxWidth, height: maxWidth };
  if (width <= maxWidth) return { width, height };
  const ratio = maxWidth / width;
  return { width: maxWidth, height: Math.round(height * ratio) };
}

function normalizeDocxImageType(
  mimeOrExt: string,
): DocxImageType | null {
  const value = mimeOrExt.toLowerCase();
  if (value === 'png' || value === 'image/png') return 'png';
  if (value === 'jpg' || value === 'jpeg' || value === 'image/jpeg' || value === 'image/jpg') {
    return 'jpg';
  }
  if (value === 'gif' || value === 'image/gif') return 'gif';
  if (value === 'bmp' || value === 'image/bmp' || value === 'image/x-ms-bmp') return 'bmp';
  return null;
}

function isSvgMime(mimeOrExt: string): boolean {
  const value = mimeOrExt.toLowerCase();
  return value === 'svg' || value === 'image/svg+xml';
}

function isSvgUrl(url: string): boolean {
  const path = url.split('?')[0]?.split('#')[0]?.toLowerCase() ?? '';
  return path.endsWith('.svg');
}

function isSvgContent(bytes: Uint8Array): boolean {
  const head = new TextDecoder().decode(bytes.slice(0, 512)).trimStart();
  return head.startsWith('<svg') || head.startsWith('<?xml');
}

function parseSvgDimensions(svgText: string): { width: number; height: number } {
  const defaultSize = 300;
  const parseLength = (value: string | undefined): number | null => {
    if (!value) return null;
    const trimmed = value.trim();
    if (/%$/.test(trimmed)) return null;
    const normalized = trimmed.replace(/(px|pt|cm|mm|in)$/i, '');
    const num = Number.parseFloat(normalized);
    return Number.isFinite(num) && num > 0 ? num : null;
  };

  const head = svgText.slice(0, 4096);
  const tagMatch = head.match(/<svg[\s\S]*?>/i);
  const tag = tagMatch?.[0] ?? head;

  const width = parseLength(tag.match(/\bwidth=["']([^"']+)["']/i)?.[1]);
  const height = parseLength(tag.match(/\bheight=["']([^"']+)["']/i)?.[1]);
  if (width && height) return { width, height };

  const viewBox = tag.match(/\bviewBox=["']([^"']+)["']/i)?.[1];
  if (viewBox) {
    const parts = viewBox.split(/[\s,]+/).map(Number);
    const viewWidth = parts[2];
    const viewHeight = parts[3];
    if (
      parts.length === 4 &&
      viewWidth !== undefined &&
      viewHeight !== undefined &&
      viewWidth > 0 &&
      viewHeight > 0
    ) {
      return { width: viewWidth, height: viewHeight };
    }
  }

  if (width) return { width, height: width };
  if (height) return { width: height, height };
  return { width: defaultSize, height: defaultSize };
}

const ADOBE_SVG_ENTITIES: Record<string, string> = {
  ns_extend: 'http://ns.adobe.com/Extensibility/1.0/',
  ns_ai: 'http://ns.adobe.com/AdobeIllustrator/10.0/',
  ns_graphs: 'http://ns.adobe.com/Graphs/1.0/',
  ns_vars: 'http://ns.adobe.com/Variables/1.0/',
  ns_imrep: 'http://ns.adobe.com/ImageReplacement/1.0/',
  ns_sfw: 'http://ns.adobe.com/SaveForWeb/1.0/',
  ns_custom: 'http://ns.adobe.com/GenericCustomNamespace/1.0/',
  ns_adobe_xpath: 'http://ns.adobe.com/XPath/1.0/',
};

function sanitizeSvgText(svgText: string): string {
  let out = svgText.replace(/^\uFEFF/, '');

  // Browsers ignore DTD entities on blob/data URLs — breaks Illustrator exports.
  out = out.replace(/<!DOCTYPE[\s\S]*?\]>\s*/i, '');
  out = out.replace(/<!DOCTYPE[^>]*>\s*/i, '');

  for (const [name, value] of Object.entries(ADOBE_SVG_ENTITIES)) {
    out = out.replace(new RegExp(`&${name};`, 'g'), value);
  }

  // Drop Adobe-only foreignObject branch inside <switch> (metadata, not artwork).
  out = out.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '');

  return out;
}

const WIKIMEDIA_THUMB_WIDTHS = [
  20, 40, 60, 80, 100, 120, 150, 180, 200, 220, 250, 300, 330, 400, 500, 960, 1280, 1920, 2560,
];

function pickWikimediaThumbWidth(target: number): number {
  const match = WIKIMEDIA_THUMB_WIDTHS.find((width) => width >= target);
  return match ?? WIKIMEDIA_THUMB_WIDTHS[WIKIMEDIA_THUMB_WIDTHS.length - 1] ?? 500;
}

function getWikimediaSvgThumbUrl(url: string, targetWidth: number): string | null {
  const match = url.trim().match(
    /^https?:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/((?:[a-f0-9]\/[a-f0-9]{2})\/[^/?#]+)\.svg(?:[?#].*)?$/i,
  );
  if (!match?.[1]) return null;

  const path = match[1];
  const filename = path.split('/').pop();
  if (!filename) return null;

  const width = pickWikimediaThumbWidth(targetWidth);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}.svg/${width}px-${filename}.svg.png`;
}

function detectImageTypeFromBytes(bytes: Uint8Array): DocxImageType | null {
  if (bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return 'png';
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'jpg';
  }
  if (bytes.length >= 3 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return 'gif';
  }
  if (bytes.length >= 2 && bytes[0] === 0x42 && bytes[1] === 0x4d) {
    return 'bmp';
  }
  return null;
}

function detectImageTypeFromUrl(url: string): DocxImageType | null {
  const path = url.split('?')[0]?.split('#')[0]?.toLowerCase() ?? '';
  if (path.endsWith('.png')) return 'png';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'jpg';
  if (path.endsWith('.gif')) return 'gif';
  if (path.endsWith('.bmp')) return 'bmp';
  return null;
}

async function parseDataUrlImage(url: string, maxWidth: number): Promise<FetchedImage | null> {
  const match = url.match(/^data:image\/([a-zA-Z0-9+.-]+);([^;,]+),([\s\S]+)$/);
  if (!match) return null;
  const mime = match[1];
  const encoding = match[2];
  const payload = match[3];
  if (!mime || !encoding || !payload) return null;

  if (isSvgMime(mime)) {
    const svgText =
      encoding.toLowerCase() === 'base64'
        ? atob(payload.replace(/\s/g, ''))
        : decodeURIComponent(payload);
    const pngBytes = await rasterizeSvgToPngBytes(svgText, maxWidth);
    return finalizeFetchedImage('png', pngBytes, maxWidth);
  }

  if (encoding.toLowerCase() !== 'base64') return null;
  const type = normalizeDocxImageType(mime);
  if (!type) return null;
  const base64 = payload.replace(/\s/g, '');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return finalizeFetchedImage(type, bytes, maxWidth);
}

async function readImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  const objectUrl = URL.createObjectURL(blob);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image decode failed'));
      img.src = objectUrl;
    });
    return {
      width: image.naturalWidth || image.width,
      height: image.naturalHeight || image.height,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image decode failed'));
    img.src = src;
  });
}

async function rasterizeBlobToPngBytes(
  blob: Blob,
  drawSize: { width: number; height: number },
): Promise<Uint8Array> {
  const objectUrl = URL.createObjectURL(blob);
  try {
    const image = await loadImageElement(objectUrl);
    const canvas = document.createElement('canvas');
    canvas.width = drawSize.width;
    canvas.height = drawSize.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    ctx.drawImage(image, 0, 0, drawSize.width, drawSize.height);
    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (!result) reject(new Error('PNG conversion failed'));
        else resolve(result);
      }, 'image/png');
    });
    return new Uint8Array(await pngBlob.arrayBuffer());
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function canvasToPngBytes(
  image: CanvasImageSource,
  drawSize: { width: number; height: number },
  background?: string,
): Promise<Uint8Array> {
  const canvas = document.createElement('canvas');
  canvas.width = drawSize.width;
  canvas.height = drawSize.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, drawSize.width, drawSize.height);
  }
  ctx.drawImage(image, 0, 0, drawSize.width, drawSize.height);
  const pngBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) reject(new Error('PNG conversion failed'));
      else resolve(result);
    }, 'image/png');
  });
  return new Uint8Array(await pngBlob.arrayBuffer());
}

async function rasterizeSvgToPngBytes(
  svgText: string,
  maxWidth: number,
  background?: string,
  options?: { sanitize?: boolean },
): Promise<Uint8Array> {
  const sanitized = options?.sanitize === false ? svgText.replace(/^\uFEFF/, '') : sanitizeSvgText(svgText);
  const nativeDims = parseSvgDimensions(sanitized);
  const drawSize = scaleImageDimensions(nativeDims.width, nativeDims.height, maxWidth);
  const canvasSize = drawSize;

  const blob = new Blob([sanitized], { type: 'image/svg+xml;charset=utf-8' });
  try {
    const objectUrl = URL.createObjectURL(blob);
    try {
      const image = await loadImageElement(objectUrl);
      return await canvasToPngBytes(image, canvasSize, background);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sanitized)}`;
    const image = await loadImageElement(dataUrl);
    return await canvasToPngBytes(image, canvasSize, background);
  }
}

async function fetchRasterizedPng(url: string, maxWidth: number): Promise<FetchedImage | null> {
  const response = await fetch(url);
  if (!response.ok) return null;
  const bytes = new Uint8Array(await response.arrayBuffer());
  return finalizeFetchedImage('png', bytes, maxWidth);
}

async function finalizeFetchedImage(
  type: DocxImageType,
  data: Uint8Array,
  maxWidth: number,
): Promise<FetchedImage> {
  const blob = new Blob([data as BlobPart], { type: `image/${type === 'jpg' ? 'jpeg' : type}` });
  const dimensions = await readImageDimensions(blob);
  const scaled = scaleImageDimensions(dimensions.width, dimensions.height, maxWidth);
  return {
    type,
    data,
    displayWidth: scaled.width,
    displayHeight: scaled.height,
  };
}

async function fetchImageForDocx(url: string, maxWidth: number): Promise<FetchedImage | null> {
  try {
    const trimmed = url.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('data:image/')) {
      return await parseDataUrlImage(trimmed, maxWidth);
    }

    const response = await fetch(trimmed);
    if (!response.ok) return null;

    const blob = await response.blob();
    const bytes = new Uint8Array(await blob.arrayBuffer());

    if (isSvgMime(blob.type) || isSvgUrl(trimmed) || isSvgContent(bytes)) {
      const svgText = new TextDecoder().decode(bytes);
      try {
        const pngBytes = await rasterizeSvgToPngBytes(svgText, maxWidth);
        return finalizeFetchedImage('png', pngBytes, maxWidth);
      } catch {
        const thumbUrl = getWikimediaSvgThumbUrl(trimmed, maxWidth);
        if (thumbUrl) {
          return await fetchRasterizedPng(thumbUrl, maxWidth);
        }
        return null;
      }
    }

    const typeFromBytes = detectImageTypeFromBytes(bytes);
    const typeFromHeader = normalizeDocxImageType(blob.type);
    const typeFromUrl = detectImageTypeFromUrl(trimmed);
    const type = typeFromBytes ?? typeFromHeader ?? typeFromUrl;

    if (!type) {
      if (blob.type === 'image/webp' || trimmed.toLowerCase().includes('.webp')) {
        const objectUrl = URL.createObjectURL(blob);
        try {
          const image = await loadImageElement(objectUrl);
          const drawSize = scaleImageDimensions(
            image.naturalWidth || 800,
            image.naturalHeight || 600,
            maxWidth,
          );
          const pngBytes = await rasterizeBlobToPngBytes(blob, drawSize);
          return finalizeFetchedImage('png', pngBytes, maxWidth);
        } finally {
          URL.revokeObjectURL(objectUrl);
        }
      }
      return null;
    }

    return finalizeFetchedImage(type, bytes, maxWidth);
  } catch {
    return null;
  }
}

async function prefetchImages(
  urls: string[],
  maxWidth: number,
): Promise<Map<string, FetchedImage | null>> {
  const unique = [...new Set(urls.filter((url) => url.trim().length > 0))];
  const cache = new Map<string, FetchedImage | null>();
  await Promise.all(
    unique.map(async (url) => {
      cache.set(url, await fetchImageForDocx(url, maxWidth));
    }),
  );
  return cache;
}

let mermaidRenderCount = 0;

function isMermaidLang(lang: string | undefined): boolean {
  return (lang ?? '').trim().toLowerCase() === 'mermaid';
}

async function waitForPaint(): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

async function getMermaid() {
  const mermaid = (await import('mermaid')).default;
  // Re-apply every call so a prior htmlLabels:true init cannot stick.
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'neutral',
    fontFamily: 'Arial, sans-serif',
    htmlLabels: false,
    flowchart: { htmlLabels: false, useMaxWidth: false },
    sequence: { useMaxWidth: false },
    gantt: { useMaxWidth: false },
    class: { htmlLabels: false, useMaxWidth: false },
  });
  return mermaid;
}

async function isMostlyBlankPng(bytes: Uint8Array): Promise<boolean> {
  const blob = new Blob([bytes as BlobPart], { type: 'image/png' });
  const objectUrl = URL.createObjectURL(blob);
  try {
    const image = await loadImageElement(objectUrl);
    const width = Math.min(image.naturalWidth || 1, 96);
    const height = Math.min(image.naturalHeight || 1, 96);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    ctx.drawImage(image, 0, 0, width, height);
    const pixels = ctx.getImageData(0, 0, width, height).data;
    let ink = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i] ?? 255;
      const green = pixels[i + 1] ?? 255;
      const blue = pixels[i + 2] ?? 255;
      const alpha = pixels[i + 3] ?? 0;
      if (alpha > 20 && (red < 250 || green < 250 || blue < 250)) ink += 1;
    }
    return ink < Math.max(8, width * height * 0.005);
  } catch {
    return true;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function renderMermaidToImage(
  source: string,
  maxWidth: number,
): Promise<FetchedImage | null> {
  if (typeof document === 'undefined') return null;
  const definition = source.trim();
  if (!definition) return null;

  // Wrapper is off-screen. Host stays a normal layout box so a screenshot
  // clone does not inherit left:-12000 / opacity:0 and come back blank.
  const wrapper = document.createElement('div');
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.style.cssText = 'position:fixed;left:-12000px;top:0;pointer-events:none;';

  const host = document.createElement('div');
  host.style.cssText = [
    `width:${maxWidth}px`,
    'padding:16px',
    'background:#ffffff',
    'opacity:1',
  ].join(';');
  wrapper.appendChild(host);
  document.body.appendChild(wrapper);

  try {
    const mermaid = await getMermaid();
    mermaidRenderCount += 1;
    const { svg } = await mermaid.render(`md2docxMermaid${mermaidRenderCount}`, definition);
    host.innerHTML = svg;
    const svgEl = host.querySelector('svg');
    if (!(svgEl instanceof SVGSVGElement)) return null;

    svgEl.style.display = 'block';
    svgEl.style.width = '100%';
    svgEl.style.height = 'auto';
    svgEl.style.maxWidth = '100%';
    svgEl.style.background = '#ffffff';

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForPaint();

    try {
      const { domToBlob } = await import('modern-screenshot');
      const blob = await domToBlob(host, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      if (blob && blob.size > 500) {
        const pngBytes = new Uint8Array(await blob.arrayBuffer());
        if (!(await isMostlyBlankPng(pngBytes))) {
          return finalizeFetchedImage('png', pngBytes, maxWidth);
        }
      }
    } catch {
      // Fall through to SVG rasterize — labels are SVG text.
    }

    const serialized = new XMLSerializer().serializeToString(svgEl);
    const pngBytes = await rasterizeSvgToPngBytes(serialized, maxWidth, '#ffffff', {
      sanitize: false,
    });
    if (await isMostlyBlankPng(pngBytes)) return null;
    return finalizeFetchedImage('png', pngBytes, maxWidth);
  } catch {
    return null;
  } finally {
    wrapper.remove();
  }
}

async function prefetchMermaid(
  sources: string[],
  maxWidth: number,
): Promise<Map<string, FetchedImage | null>> {
  const unique = [...new Set(sources.map((source) => source.trim()).filter(Boolean))];
  const cache = new Map<string, FetchedImage | null>();
  for (const source of unique) {
    cache.set(source, await renderMermaidToImage(source, maxWidth));
  }
  return cache;
}

function walkTokens(tokens: Tokens.Generic[] | undefined, visit: (token: Tokens.Generic) => void): void {
  if (!tokens) return;
  for (const token of tokens) {
    visit(token);
    if (token.type === 'table') {
      const table = token as unknown as Tokens.Table;
      for (const cell of table.header ?? []) {
        walkTokens(cell.tokens, visit);
      }
      for (const row of table.rows ?? []) {
        for (const cell of row) {
          walkTokens(cell.tokens, visit);
        }
      }
      continue;
    }
    if (token.type === 'list') {
      for (const item of (token as unknown as Tokens.List).items ?? []) {
        walkTokens(item.tokens, visit);
      }
      continue;
    }
    if (token.tokens) {
      walkTokens(token.tokens, visit);
    }
  }
}

function collectImageUrls(tokens: Tokens.Generic[]): string[] {
  const urls: string[] = [];
  walkTokens(tokens, (token) => {
    if (token.type === 'image') {
      const href = (token as unknown as Tokens.Image).href;
      if (href) urls.push(href);
    }
  });
  return urls;
}

function collectMermaidSources(tokens: Tokens.Generic[]): string[] {
  const sources: string[] = [];
  walkTokens(tokens, (token) => {
    if (token.type !== 'code') return;
    const code = token as unknown as Tokens.Code;
    if (!isMermaidLang(code.lang)) return;
    const source = (code.text ?? '').trim();
    if (source) sources.push(source);
  });
  return sources;
}

function createImageRun(image: FetchedImage, alt: string): ImageRun {
  const label = alt.trim() || 'Embedded image';
  return new ImageRun({
    type: image.type,
    data: image.data,
    transformation: {
      width: image.displayWidth,
      height: image.displayHeight,
    },
    altText: {
      title: label,
      description: label,
      name: label,
    },
  });
}

function imageFallbackChildren(href: string, alt: string, ctx: BuildContext): ParagraphChild[] {
  const label = alt.trim() || href;
  return [
    new ExternalHyperlink({
      link: href,
      children: [
        new TextRun({
          text: label,
          style: 'Hyperlink',
          font: ctx.template.useDocumentStyles ? ctx.template.bodyFont : undefined,
          size: ctx.template.useDocumentStyles ? ctx.template.bodyFontSize : undefined,
          color: ctx.template.useDocumentStyles ? ctx.template.bodyColor : undefined,
        }),
      ],
    }),
  ];
}

function flushImageParagraphProps(ctx: BuildContext): IParagraphOptions {
  return {
    alignment: AlignmentType.CENTER,
    indent: { firstLine: 0, left: 0, right: 0 },
    spacing: {
      before: ctx.template.imageSpacingBefore,
      after: ctx.template.imageSpacingAfter,
    },
  };
}

function imageToParagraph(href: string, alt: string, ctx: BuildContext): Paragraph {
  const fetched = ctx.imageCache.get(href);
  const children = fetched
    ? [createImageRun(fetched, alt)]
    : imageFallbackChildren(href, alt, ctx);
  return new Paragraph({
    ...flushImageParagraphProps(ctx),
    children,
  });
}

function pushInline(
  out: InlineRun[],
  text: string,
  style: Partial<InlineRun> = {},
): void {
  if (!text) return;
  out.push({ text, ...style });
}

function flattenInlineToken(token: Tokens.Generic, style: Partial<InlineRun>, out: InlineRun[]): void {
  const raw: string = token.text ?? '';
  const nested: Tokens.Generic[] | undefined = token.tokens;

  if (nested && nested.length > 0) {
    for (const child of nested) {
      const childStyle = { ...style };
      switch (child.type) {
        case 'strong':
          childStyle.bold = true;
          break;
        case 'em':
          childStyle.italics = true;
          break;
        case 'del':
          childStyle.strike = true;
          break;
        case 'codespan':
          childStyle.code = true;
          break;
        default:
          break;
      }
      if (child.tokens) {
        flattenInlineToken(child, childStyle, out);
      } else {
        pushInline(out, child.text ?? '', childStyle);
      }
    }
    return;
  }

  pushInline(out, raw, style);
}

function collectInlineTokens(tokens: Tokens.Generic[] | undefined, style: Partial<InlineRun> = {}): InlineRun[] {
  const out: InlineRun[] = [];
  if (!tokens) return out;
  for (const token of tokens) {
    switch (token.type) {
      case 'strong':
        flattenInlineToken(token, { ...style, bold: true }, out);
        break;
      case 'em':
        flattenInlineToken(token, { ...style, italics: true }, out);
        break;
      case 'del':
        flattenInlineToken(token, { ...style, strike: true }, out);
        break;
      case 'codespan':
        pushInline(out, token.text, { ...style, code: true });
        break;
      case 'link': {
        const href: string = token.href ?? '';
        const linkStyle = { ...style };
        const inner = collectInlineTokens(token.tokens, linkStyle);
        if (inner.length === 0) {
          pushInline(out, href, { ...style, link: href });
        } else {
          for (const run of inner) {
            out.push({ ...run, link: href });
          }
        }
        break;
      }
      case 'image': {
        const imageToken = token as unknown as Tokens.Image;
        const href = imageToken.href ?? '';
        if (href) {
          out.push({
            text: '',
            image: { href, alt: imageToken.text ?? '' },
          });
        }
        break;
      }
      case 'br':
        pushInline(out, '\n', style);
        break;
      case 'escape':
        pushInline(out, token.text, style);
        break;
      case 'text':
      default:
        flattenInlineToken(token, style, out);
        break;
    }
  }
  return out;
}

function applyHeadingTextTransform(
  runs: InlineRun[],
  depth: number,
  template: DocxTemplateConfig,
): InlineRun[] {
  const headingConfig = template.headings[depth as 1 | 2 | 3 | 4 | 5 | 6];
  if (!headingConfig?.uppercase) return runs;
  return runs.map((run) => ({ ...run, text: run.text.toUpperCase() }));
}

function inlineRunsToParagraphChildren(
  runs: InlineRun[],
  ctx: BuildContext,
): ParagraphChild[] {
  const { template } = ctx;
  const children: ParagraphChild[] = [];
  for (const run of runs) {
    if (run.image) {
      const fetched = ctx.imageCache.get(run.image.href);
      if (fetched) {
        children.push(createImageRun(fetched, run.image.alt));
      } else {
        children.push(...imageFallbackChildren(run.image.href, run.image.alt, ctx));
      }
      continue;
    }

    const font = run.code ? template.codeFont : template.useDocumentStyles ? template.bodyFont : undefined;
    const textRun = new TextRun({
      text: run.text,
      bold: run.bold,
      italics: run.italics,
      strike: run.strike,
      font,
      size: template.useDocumentStyles && !run.code ? template.bodyFontSize : undefined,
      color: template.useDocumentStyles ? template.bodyColor : undefined,
    });
    if (run.link) {
      children.push(
        new ExternalHyperlink({
          link: run.link,
          children: [
            new TextRun({
              text: run.text,
              bold: run.bold,
              italics: run.italics,
              strike: run.strike,
              style: 'Hyperlink',
              font,
              size: template.useDocumentStyles && !run.code ? template.bodyFontSize : undefined,
              color: template.useDocumentStyles ? template.bodyColor : undefined,
            }),
          ],
        }),
      );
    } else {
      children.push(textRun);
    }
  }
  return children;
}

function bodyParagraphProps(ctx: BuildContext, includeFirstLineIndent = true): IParagraphOptions {
  const { template } = ctx;

  return {
    spacing: { line: template.lineSpacing },
    ...(template.bodyAlignment ? { alignment: template.bodyAlignment } : {}),
    ...(includeFirstLineIndent && template.bodyFirstLineIndent
      ? { indent: { firstLine: template.bodyFirstLineIndent } }
      : {}),
  };
}

function paragraphFromInline(
  tokens: Tokens.Generic[] | undefined,
  ctx: BuildContext,
  includeFirstLineIndent = true,
): Paragraph {
  return new Paragraph({
    ...bodyParagraphProps(ctx, includeFirstLineIndent),
    children: inlineRunsToParagraphChildren(collectInlineTokens(tokens), ctx),
  });
}

function codeLinesToParagraphs(token: Tokens.Code, ctx: BuildContext): Paragraph[] {
  const { template } = ctx;
  const lines = (token.text ?? '').replace(/\n$/, '').split('\n');
  return lines.map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line.length > 0 ? line : '',
            font: template.codeFont,
          }),
        ],
        spacing: { line: template.lineSpacing },
        shading: { type: ShadingType.CLEAR, fill: 'F4F4F4' },
        indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
      }),
  );
}

function mermaidBlockToParagraphs(token: Tokens.Code, ctx: BuildContext): Paragraph[] {
  const source = (token.text ?? '').trim();
  const fetched = source ? ctx.mermaidCache.get(source) : null;
  if (fetched) {
    return [
      new Paragraph({
        ...flushImageParagraphProps(ctx),
        children: [createImageRun(fetched, 'Mermaid diagram')],
      }),
    ];
  }
  return codeLinesToParagraphs(token, ctx);
}

function codeBlockToParagraphs(token: Tokens.Code, ctx: BuildContext): Paragraph[] {
  if (isMermaidLang(token.lang)) return mermaidBlockToParagraphs(token, ctx);
  return codeLinesToParagraphs(token, ctx);
}

function headingToParagraph(token: Tokens.Heading, ctx: BuildContext): Paragraph {
  const { template } = ctx;
  const level = HEADING_LEVELS[token.depth] ?? HeadingLevel.HEADING_6;
  const headingConfig = template.headings[token.depth as 1 | 2 | 3 | 4 | 5 | 6];
  const runs = applyHeadingTextTransform(
    collectInlineTokens(token.tokens),
    token.depth,
    template,
  );

  const paragraphOptions: IParagraphOptions = {
    heading: level,
    children: inlineRunsToParagraphChildren(runs, ctx),
    ...(headingConfig?.pageBreakBefore ? { pageBreakBefore: true } : {}),
    ...(headingConfig
      ? {
          alignment: headingConfig.alignment,
          spacing: {
            before: headingConfig.spacingBefore,
            after: headingConfig.spacingAfter,
          },
        }
      : {}),
  };

  return new Paragraph(paragraphOptions);
}

function blockquoteToParagraphs(token: Tokens.Blockquote, ctx: BuildContext): Paragraph[] {
  const { template } = ctx;
  const out: Paragraph[] = [];
  for (const child of token.tokens ?? []) {
    if (child.type === 'paragraph') {
      out.push(
        new Paragraph({
          children: inlineRunsToParagraphChildren(collectInlineTokens(child.tokens), ctx),
          indent: { left: convertInchesToTwip(0.5) },
          spacing: { line: template.blockquoteLineSpacing },
          border: {
            left: { style: BorderStyle.SINGLE, size: 24, color: 'CCCCCC', space: 12 },
          },
        }),
      );
    } else {
      out.push(blockTokenToElements(child, ctx) as Paragraph);
    }
  }
  return out;
}

function listToParagraphs(token: Tokens.List, ctx: BuildContext, level: number = 0): Paragraph[] {
  const out: Paragraph[] = [];
  const ordered = Boolean(token.ordered);
  for (const item of token.items ?? []) {
    const textChildren: ParagraphChild[] = [];
    const nestedLists: Tokens.List[] = [];
    const otherBlocks: Paragraph[] = [];

    for (const child of item.tokens ?? []) {
      if (child.type === 'list') {
        nestedLists.push(child as unknown as Tokens.List);
      } else if (child.type === 'paragraph' || child.type === 'text') {
        const inline = (child as Tokens.Paragraph).tokens ?? [];
        textChildren.push(...inlineRunsToParagraphChildren(collectInlineTokens(inline), ctx));
      } else {
        const els = blockTokenToElements(child, ctx);
        if (Array.isArray(els)) {
          otherBlocks.push(...(els as Paragraph[]));
        } else if (els) {
          otherBlocks.push(els as Paragraph);
        }
      }
    }

    out.push(
      new Paragraph({
        numbering: {
          reference: ordered ? ORDERED_REF : BULLET_REF,
          level: Math.min(level, 3),
        },
        children: textChildren,
        ...bodyParagraphProps(ctx, false),
      }),
    );

    for (const block of otherBlocks) {
      out.push(block);
    }
    for (const nested of nestedLists) {
      out.push(...listToParagraphs(nested, ctx, level + 1));
    }
  }
  return out;
}

function tableToTable(token: Tokens.Table, ctx: BuildContext): Table {
  const columnCount = Math.max(token.header?.length ?? 0, 1);
  const tableWidth = getContentWidthTwip(ctx.template);
  const columnWidth = Math.floor(tableWidth / columnCount);
  const columnWidths = Array.from({ length: columnCount }, (_, index) =>
    index === columnCount - 1 ? tableWidth - columnWidth * (columnCount - 1) : columnWidth,
  );
  const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
  const borders = { top: border, bottom: border, left: border, right: border };
  const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

  const rows: TableRow[] = [];
  const headerCells = (token.header ?? []).map(
    (cell, index) =>
      new TableCell({
        borders,
        width: { size: columnWidths[index] ?? columnWidth, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: 'F4F4F4' },
        margins: cellMargins,
        children: [paragraphFromInline(cell.tokens, ctx, false)],
      }),
  );
  rows.push(new TableRow({ children: headerCells, tableHeader: true }));

  for (const row of token.rows ?? []) {
    const cells = row.map(
      (cell, index) =>
        new TableCell({
          borders,
          width: { size: columnWidths[index] ?? columnWidth, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: 'FFFFFF' },
          margins: cellMargins,
          children: [paragraphFromInline(cell.tokens, ctx, false)],
        }),
    );
    rows.push(new TableRow({ children: cells }));
  }

  return new Table({
    rows,
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths,
    borders: {
      top: border,
      bottom: border,
      left: border,
      right: border,
      insideHorizontal: border,
      insideVertical: border,
    },
  });
}

function blockTokenToElements(
  token: Tokens.Generic,
  ctx: BuildContext,
): Paragraph | Table | Paragraph[] {
  switch (token.type) {
    case 'heading':
      return headingToParagraph(token as unknown as Tokens.Heading, ctx);
    case 'paragraph':
      return paragraphFromInline(token.tokens, ctx);
    case 'code':
      return codeBlockToParagraphs(token as unknown as Tokens.Code, ctx);
    case 'blockquote':
      return blockquoteToParagraphs(token as unknown as Tokens.Blockquote, ctx);
    case 'list':
      return listToParagraphs(token as unknown as Tokens.List, ctx);
    case 'table':
      return tableToTable(token as unknown as Tokens.Table, ctx);
    case 'image':
      const imageToken = token as unknown as Tokens.Image;
      return imageToParagraph(imageToken.href ?? '', imageToken.text ?? '', ctx);
    case 'hr':
      return new Paragraph({
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC', space: 1 },
        },
        spacing: { before: 120, after: 120 },
      });
    case 'space':
      return [] as unknown as Paragraph[];
    case 'html':
      return new Paragraph({
        ...bodyParagraphProps(ctx),
        children: [new TextRun({ text: token.text })],
      });
    default:
      return new Paragraph({
        ...bodyParagraphProps(ctx),
        children: inlineRunsToParagraphChildren(collectInlineTokens(token.tokens), ctx),
      });
  }
}

function buildSectionChildren(tokens: Tokens.Generic[], ctx: BuildContext): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];
  for (const token of tokens) {
    const el = blockTokenToElements(token, ctx);
    if (Array.isArray(el)) {
      children.push(...(el as (Paragraph | Table)[]));
    } else {
      children.push(el as Paragraph | Table);
    }
  }
  return children;
}

function buildDocumentStyles(template: DocxTemplateConfig): IStylesOptions | undefined {
  if (!template.useDocumentStyles) return undefined;

  const paragraphStyles = [
    {
      id: 'Normal',
      name: 'Normal',
      basedOn: 'Normal',
      next: 'Normal',
      quickFormat: true,
      run: {
        font: template.bodyFont,
        size: template.bodyFontSize,
        color: template.bodyColor,
      },
      paragraph: {
        alignment: template.bodyAlignment,
        spacing: { line: template.lineSpacing },
        indent: template.bodyFirstLineIndent
          ? { firstLine: template.bodyFirstLineIndent }
          : undefined,
      },
    },
    ...([1, 2, 3] as const)
      .filter((depth) => template.headings[depth])
      .map((depth) => {
        const heading = template.headings[depth]!;
        return {
          id: HEADING_STYLE_IDS[depth] as string,
          name: `Heading ${depth}`,
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            font: template.bodyFont,
            size: heading.fontSize,
            bold: heading.bold,
            color: template.bodyColor,
          },
          paragraph: {
            alignment: heading.alignment,
            spacing: {
              before: heading.spacingBefore,
              after: heading.spacingAfter,
            },
            outlineLevel: heading.outlineLevel,
          },
        };
      }),
  ];

  return {
    default: {
      document: {
        run: {
          font: template.bodyFont,
          size: template.bodyFontSize,
          color: template.bodyColor,
        },
      },
    },
    paragraphStyles,
  };
}

export async function markdownToDocxBlob(
  markdown: string,
  templateId: DocxTemplateId = 'default',
): Promise<Blob> {
  const trimmed = markdown.trim();
  if (!trimmed) {
    throw new Error('Nothing to convert. Paste or upload markdown first.');
  }

  const template = getDocxTemplate(templateId);
  const tokens = marked.lexer(trimmed) as unknown as Tokens.Generic[];
  const imageUrls = collectImageUrls(tokens);
  const mermaidSources = collectMermaidSources(tokens);
  const maxImageWidth = getMaxImageWidthPx(template);
  const [imageCache, mermaidCache] = await Promise.all([
    prefetchImages(imageUrls, maxImageWidth),
    prefetchMermaid(mermaidSources, maxImageWidth),
  ]);
  const ctx: BuildContext = { template, imageCache, mermaidCache };
  const sectionChildren = buildSectionChildren(tokens, ctx);

  if (sectionChildren.length === 0) {
    throw new Error('No convertible content found in the markdown.');
  }

  const styles = buildDocumentStyles(template);
  const sectionProperties = template.page
    ? { page: { size: template.page.size, margin: template.page.margin } }
    : {};

  const doc = new Document({
    styles,
    numbering: {
      config: [
        {
          reference: BULLET_REF,
          levels: [0, 1, 2, 3].map((level) => ({
            level,
            format: LevelFormat.BULLET,
            text: '\u2022',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: {
                  left: 720 * (level + 1),
                  hanging: 360,
                },
              },
            },
          })),
        },
        {
          reference: ORDERED_REF,
          levels: [0, 1, 2, 3].map((level) => ({
            level,
            format: LevelFormat.DECIMAL,
            text: `%${level + 1}.`,
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: {
                  left: 720 * (level + 1),
                  hanging: 360,
                },
              },
            },
          })),
        },
      ],
    },
    sections: [{ properties: sectionProperties, children: sectionChildren }],
  });

  return Packer.toBlob(doc);
}
