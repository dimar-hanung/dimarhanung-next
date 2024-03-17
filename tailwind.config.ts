import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class", // or 'media' or 'class
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
        // primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        neutral: "var(--color-neutral)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
          950: "rgb(var(--color-primary-950) / <alpha-value>)",
        },
        muted: {
          50: "rgb(var(--color-muted-50) / <alpha-value>)",
          100: "rgb(var(--color-muted-100) / <alpha-value>)",
          200: "rgb(var(--color-muted-200) / <alpha-value>)",
          300: "rgb(var(--color-muted-300) / <alpha-value>)",
          400: "rgb(var(--color-muted-400) / <alpha-value>)",
          500: "rgb(var(--color-muted-500) / <alpha-value>)",
          600: "rgb(var(--color-muted-600) / <alpha-value>)",
          700: "rgb(var(--color-muted-700) / <alpha-value>)",
          800: "rgb(var(--color-muted-800) / <alpha-value>)",
          900: "rgb(var(--color-muted-900) / <alpha-value>)",
          950: "rgb(var(--color-muted-950) / <alpha-value>)",
        },
      },
    },
  },
};
