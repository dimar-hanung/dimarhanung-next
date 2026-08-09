import { AlignmentType, convertMillimetersToTwip } from 'docx';

export type DocxTemplateId = 'default' | 'laporan-indonesia';

export interface HeadingStyleConfig {
  fontSize: number;
  bold: boolean;
  alignment: (typeof AlignmentType)[keyof typeof AlignmentType];
  uppercase: boolean;
  pageBreakBefore: boolean;
  spacingBefore: number;
  spacingAfter: number;
  outlineLevel: number;
}

export interface DocxTemplateConfig {
  id: DocxTemplateId;
  label: string;
  helperText?: string;
  useDocumentStyles: boolean;
  page?: {
    size: { width: number; height: number };
    margin: { top: number; right: number; bottom: number; left: number };
  };
  bodyFont: string;
  bodyFontSize: number;
  bodyColor: string;
  codeFont: string;
  lineSpacing: number;
  blockquoteLineSpacing: number;
  bodyAlignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
  bodyFirstLineIndent?: number;
  headings: Partial<Record<1 | 2 | 3 | 4 | 5 | 6, HeadingStyleConfig>>;
}

const A4_WIDTH = 11906;
const A4_HEIGHT = 16838;

const LAPORAN_INDONESIA_MARGINS = {
  top: convertMillimetersToTwip(40),
  left: convertMillimetersToTwip(40),
  bottom: convertMillimetersToTwip(30),
  right: convertMillimetersToTwip(30),
};

const DEFAULT_TEMPLATE: DocxTemplateConfig = {
  id: 'default',
  label: 'Default',
  useDocumentStyles: false,
  bodyFont: 'Arial',
  bodyFontSize: 24,
  bodyColor: '000000',
  codeFont: 'Consolas',
  lineSpacing: 276,
  blockquoteLineSpacing: 312,
  headings: {},
};

const LAPORAN_INDONESIA_TEMPLATE: DocxTemplateConfig = {
  id: 'laporan-indonesia',
  label: 'Laporan Indonesia',
  helperText: 'A4 · Times New Roman 12 pt · 1,5 spasi · margin atas/kiri 4 cm, bawah/kanan 3 cm',
  useDocumentStyles: true,
  page: {
    size: { width: A4_WIDTH, height: A4_HEIGHT },
    margin: LAPORAN_INDONESIA_MARGINS,
  },
  bodyFont: 'Times New Roman',
  bodyFontSize: 24,
  bodyColor: '000000',
  codeFont: 'Consolas',
  lineSpacing: 360,
  blockquoteLineSpacing: 360,
  bodyAlignment: AlignmentType.JUSTIFIED,
  bodyFirstLineIndent: convertMillimetersToTwip(10),
  headings: {
    1: {
      fontSize: 28,
      bold: true,
      alignment: AlignmentType.CENTER,
      uppercase: true,
      pageBreakBefore: true,
      spacingBefore: 240,
      spacingAfter: 240,
      outlineLevel: 0,
    },
    2: {
      fontSize: 24,
      bold: true,
      alignment: AlignmentType.LEFT,
      uppercase: false,
      pageBreakBefore: false,
      spacingBefore: 180,
      spacingAfter: 180,
      outlineLevel: 1,
    },
    3: {
      fontSize: 24,
      bold: true,
      alignment: AlignmentType.LEFT,
      uppercase: false,
      pageBreakBefore: false,
      spacingBefore: 120,
      spacingAfter: 120,
      outlineLevel: 2,
    },
  },
};

const TEMPLATES: Record<DocxTemplateId, DocxTemplateConfig> = {
  default: DEFAULT_TEMPLATE,
  'laporan-indonesia': LAPORAN_INDONESIA_TEMPLATE,
};

export const DOCX_TEMPLATE_OPTIONS = Object.values(TEMPLATES).map((template) => ({
  value: template.id,
  label: template.label,
  helperText: template.helperText,
}));

export function getDocxTemplate(id: DocxTemplateId): DocxTemplateConfig {
  return TEMPLATES[id] ?? DEFAULT_TEMPLATE;
}
