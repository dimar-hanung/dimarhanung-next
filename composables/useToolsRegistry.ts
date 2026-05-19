export interface Tool {
  name: string;
  path: string;
  description: string;
  icon: string;
  iconBg?: string;
  iconColor?: string;
  tags?: string[];
}

export interface Category {
  name: string;
  icon: string;
  tools: Tool[];
}

export function useToolsRegistry() {
  const categories: Category[] = [
    {
      name: 'Developer Tools',
      icon: 'mdi:code-braces',
      tools: [
        {
          name: 'Diff Checker',
          path: '/tools/diff-checker',
          description: 'Compare text and find differences word by word with multiple view modes',
          icon: 'mdi:file-compare',
          iconBg: 'bg-blue-500/10 dark:bg-blue-400/10',
          iconColor: 'text-blue-500',
          tags: ['text', 'compare', 'diff'],
        },
        {
          name: 'CSV Chunker',
          path: '/tools/csv-chunker',
          description: 'Split large CSV files into smaller chunks for easy handling',
          icon: 'mdi:file-delimited',
          iconBg: 'bg-green-500/10 dark:bg-green-400/10',
          iconColor: 'text-green-500',
          tags: ['csv', 'split', 'data'],
        },
        {
          name: 'CSV Even Splitter',
          path: '/tools/csv-even-splitter',
          description: 'Split CSV files into a target number of balanced parts',
          icon: 'mdi:file-tree-outline',
          iconBg: 'bg-teal-500/10 dark:bg-teal-400/10',
          iconColor: 'text-teal-500',
          tags: ['csv', 'split', 'balanced'],
        },
        {
          name: 'Markdown Render',
          path: '/tools/markdown-render',
          description: 'Write or paste Markdown and see it rendered beautifully in real-time',
          icon: 'mdi:markdown',
          iconBg: 'bg-purple-500/10 dark:bg-purple-400/10',
          iconColor: 'text-purple-500',
          tags: ['markdown', 'preview', 'editor'],
        },
        {
          name: 'Base64 File Tool',
          path: '/tools/base64-file',
          description: 'Encode files to Base64 or decode Base64 strings back to files',
          icon: 'mdi:file-code-outline',
          iconBg: 'bg-amber-500/10 dark:bg-amber-400/10',
          iconColor: 'text-amber-500',
          tags: ['base64', 'encode', 'decode'],
        },
      ],
    },
    {
      name: 'Text & Content',
      icon: 'mdi:text-box',
      tools: [
        // Future tools can be added here
      ],
    },
    {
      name: 'Converters',
      icon: 'mdi:swap-horizontal',
      tools: [
        {
          name: 'CSV Separator Changer',
          path: '/tools/csv-separator-changer',
          description: 'Change CSV separators with delimiter detection, preview, and export options',
          icon: 'mdi:swap-horizontal-circle-outline',
          iconBg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
          iconColor: 'text-emerald-500',
          tags: ['csv', 'delimiter', 'separator'],
        },
        {
          name: 'JSON to CSV',
          path: '/tools/json-to-csv',
          description: 'Convert JSON data to CSV format with flattening, custom delimiters, and preview',
          icon: 'mdi:code-json',
          iconBg: 'bg-cyan-500/10 dark:bg-cyan-400/10',
          iconColor: 'text-cyan-500',
          tags: ['json', 'csv', 'convert'],
        },
      ],
    },
  ];

  return { categories };
}
