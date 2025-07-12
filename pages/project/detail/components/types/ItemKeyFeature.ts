export interface KeyFeature {
  icon: string;
  title: string;
  description: string;
  bgGradient?: string;
  borderColor?: string;
  iconBg?: string;
  colSpan?: number;
}

export interface ItemKeyFeatureProps {
  features?: KeyFeature[];
}

// Predefined feature styles for common use cases
export const FeatureStyles = {
  blue: {
    bgGradient:
      "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    borderColor: "border-blue-200 dark:border-blue-800/50",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  purple: {
    bgGradient:
      "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    borderColor: "border-purple-200 dark:border-purple-800/50",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  emerald: {
    bgGradient:
      "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800/50",
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  orange: {
    bgGradient:
      "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    borderColor: "border-orange-200 dark:border-orange-800/50",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
  violet: {
    bgGradient:
      "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
    borderColor: "border-violet-200 dark:border-violet-800/50",
    iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
  },
};
