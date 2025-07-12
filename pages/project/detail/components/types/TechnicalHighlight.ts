export interface TechnicalHighlight {
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: string;
  iconGradient: string;
  badgeStyle: string;
}

// Predefined color styles for common technical highlights
export const TechnicalHighlightStyles = {
  emerald: {
    color: "emerald",
    iconGradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    badgeStyle:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  pink: {
    color: "pink",
    iconGradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    badgeStyle: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  },
  blue: {
    color: "blue",
    iconGradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    badgeStyle: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  purple: {
    color: "purple",
    iconGradient: "bg-gradient-to-br from-purple-500 to-violet-600",
    badgeStyle:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  orange: {
    color: "orange",
    iconGradient: "bg-gradient-to-br from-orange-500 to-amber-600",
    badgeStyle:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  red: {
    color: "red",
    iconGradient: "bg-gradient-to-br from-red-500 to-rose-600",
    badgeStyle: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  yellow: {
    color: "yellow",
    iconGradient: "bg-gradient-to-br from-yellow-500 to-amber-600",
    badgeStyle:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  teal: {
    color: "teal",
    iconGradient: "bg-gradient-to-br from-teal-500 to-cyan-600",
    badgeStyle: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  },
} as const;
