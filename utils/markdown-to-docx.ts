import { marked, type Tokens } from 'marked';
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  convertInchesToTwip,
  type IParagraphOptions,
  type IStylesOptions,
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

interface BuildContext {
  template: DocxTemplateConfig;
}

interface InlineRun {
  text: string;
  bold?: boolean;
  italics?: boolean;
  strike?: boolean;
  code?: boolean;
  link?: string;
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

function inlineRunsToTextRuns(runs: InlineRun[], ctx: BuildContext): (TextRun | ExternalHyperlink)[] {
  const { template } = ctx;
  const children: (TextRun | ExternalHyperlink)[] = [];
  for (const run of runs) {
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

function paragraphFromInline(tokens: Tokens.Generic[] | undefined, ctx: BuildContext): Paragraph {
  return new Paragraph({
    ...bodyParagraphProps(ctx),
    children: inlineRunsToTextRuns(collectInlineTokens(tokens), ctx),
  });
}

function codeBlockToParagraphs(token: Tokens.Code, ctx: BuildContext): Paragraph[] {
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
        shading: { type: ShadingType.SOLID, color: 'F4F4F4' },
        indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
      }),
  );
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
    children: inlineRunsToTextRuns(runs, ctx),
    ...(headingConfig?.pageBreakBefore ? { pageBreakBefore: true } : {}),
    ...(headingConfig
      ? {
          alignment: headingConfig.alignment,
          spacing: {
            before: headingConfig.spacingBefore,
            after: headingConfig.spacingAfter,
            line: template.lineSpacing,
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
          children: inlineRunsToTextRuns(collectInlineTokens(child.tokens), ctx),
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
  const { template } = ctx;
  const out: Paragraph[] = [];
  const ordered = Boolean(token.ordered);
  for (const item of token.items ?? []) {
    const textChildren: (TextRun | ExternalHyperlink)[] = [];
    const nestedLists: Tokens.List[] = [];
    const otherBlocks: Paragraph[] = [];

    for (const child of item.tokens ?? []) {
      if (child.type === 'list') {
        nestedLists.push(child as unknown as Tokens.List);
      } else if (child.type === 'paragraph' || child.type === 'text') {
        const inline = (child as Tokens.Paragraph).tokens ?? [];
        textChildren.push(...inlineRunsToTextRuns(collectInlineTokens(inline), ctx));
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
  const rows: TableRow[] = [];
  const headerCells = (token.header ?? []).map(
    (cell) =>
      new TableCell({
        children: [paragraphFromInline(cell.tokens, ctx)],
        shading: { type: ShadingType.SOLID, color: 'F4F4F4' },
      }),
  );
  rows.push(new TableRow({ children: headerCells, tableHeader: true }));

  for (const row of token.rows ?? []) {
    const cells = row.map(
      (cell) => new TableCell({ children: [paragraphFromInline(cell.tokens, ctx)] }),
    );
    rows.push(new TableRow({ children: cells }));
  }

  return new Table({
    rows,
    width: { size: 100, type: 'pct' },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' },
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
        children: inlineRunsToTextRuns(collectInlineTokens(token.tokens), ctx),
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
              line: template.lineSpacing,
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
  const ctx: BuildContext = { template };
  const tokens = marked.lexer(trimmed) as unknown as Tokens.Generic[];
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
                  left: convertInchesToTwip(0.5 * (level + 1)),
                  hanging: convertInchesToTwip(0.25),
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
                  left: convertInchesToTwip(0.5 * (level + 1)),
                  hanging: convertInchesToTwip(0.25),
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
