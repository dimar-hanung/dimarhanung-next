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
} from 'docx';

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

function inlineRunsToTextRuns(runs: InlineRun[]): (TextRun | ExternalHyperlink)[] {
  const children: (TextRun | ExternalHyperlink)[] = [];
  for (const run of runs) {
    const textRun = new TextRun({
      text: run.text,
      bold: run.bold,
      italics: run.italics,
      strike: run.strike,
      font: run.code ? 'Consolas' : undefined,
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
              font: run.code ? 'Consolas' : undefined,
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

function paragraphFromInline(tokens: Tokens.Generic[] | undefined): Paragraph {
  return new Paragraph({ children: inlineRunsToTextRuns(collectInlineTokens(tokens)) });
}

function codeBlockToParagraphs(token: Tokens.Code): Paragraph[] {
  const lines = (token.text ?? '').replace(/\n$/, '').split('\n');
  return lines.map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line.length > 0 ? line : '',
            font: 'Consolas',
          }),
        ],
        spacing: { line: 276 },
        shading: { type: ShadingType.SOLID, color: 'F4F4F4' },
        indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
      }),
  );
}

function headingToParagraph(token: Tokens.Heading): Paragraph {
  const level = HEADING_LEVELS[token.depth] ?? HeadingLevel.HEADING_6;
  return new Paragraph({
    heading: level,
    children: inlineRunsToTextRuns(collectInlineTokens(token.tokens)),
  });
}

function blockquoteToParagraphs(token: Tokens.Blockquote): Paragraph[] {
  const out: Paragraph[] = [];
  for (const child of token.tokens ?? []) {
    if (child.type === 'paragraph') {
      out.push(
        new Paragraph({
          children: inlineRunsToTextRuns(collectInlineTokens(child.tokens)),
          indent: { left: convertInchesToTwip(0.5) },
          spacing: { line: 312 },
          border: {
            left: { style: BorderStyle.SINGLE, size: 24, color: 'CCCCCC', space: 12 },
          },
        }),
      );
    } else {
      out.push(blockTokenToElements(child) as Paragraph);
    }
  }
  return out;
}

function listToParagraphs(token: Tokens.List, level: number = 0): Paragraph[] {
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
        textChildren.push(...inlineRunsToTextRuns(collectInlineTokens(inline)));
      } else {
        const els = blockTokenToElements(child);
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
        spacing: { line: 276 },
      }),
    );

    for (const block of otherBlocks) {
      out.push(block);
    }
    for (const nested of nestedLists) {
      out.push(...listToParagraphs(nested, level + 1));
    }
  }
  return out;
}

function tableToTable(token: Tokens.Table): Table {
  const rows: TableRow[] = [];
  const headerCells = (token.header ?? []).map(
    (cell) =>
      new TableCell({
        children: [paragraphFromInline(cell.tokens)],
        shading: { type: ShadingType.SOLID, color: 'F4F4F4' },
      }),
  );
  rows.push(new TableRow({ children: headerCells, tableHeader: true }));

  for (const row of token.rows ?? []) {
    const cells = row.map(
      (cell) => new TableCell({ children: [paragraphFromInline(cell.tokens)] }),
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

function blockTokenToElements(token: Tokens.Generic): Paragraph | Table | Paragraph[] {
  switch (token.type) {
    case 'heading':
      return headingToParagraph(token as unknown as Tokens.Heading);
    case 'paragraph':
      return paragraphFromInline(token.tokens);
    case 'code':
      return codeBlockToParagraphs(token as unknown as Tokens.Code);
    case 'blockquote':
      return blockquoteToParagraphs(token as unknown as Tokens.Blockquote);
    case 'list':
      return listToParagraphs(token as unknown as Tokens.List);
    case 'table':
      return tableToTable(token as unknown as Tokens.Table);
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
      return new Paragraph({ children: [new TextRun({ text: token.text })] });
    default:
      return new Paragraph({
        children: inlineRunsToTextRuns(collectInlineTokens(token.tokens)),
      });
  }
}

function buildSectionChildren(tokens: Tokens.Generic[]): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];
  for (const token of tokens) {
    const el = blockTokenToElements(token);
    if (Array.isArray(el)) {
      children.push(...(el as (Paragraph | Table)[]));
    } else {
      children.push(el as Paragraph | Table);
    }
  }
  return children;
}

export async function markdownToDocxBlob(markdown: string): Promise<Blob> {
  const trimmed = markdown.trim();
  if (!trimmed) {
    throw new Error('Nothing to convert. Paste or upload markdown first.');
  }

  const tokens = marked.lexer(trimmed) as unknown as Tokens.Generic[];
  const sectionChildren = buildSectionChildren(tokens);

  if (sectionChildren.length === 0) {
    throw new Error('No convertible content found in the markdown.');
  }

  const doc = new Document({
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
    sections: [{ properties: {}, children: sectionChildren }],
  });

  return Packer.toBlob(doc);
}