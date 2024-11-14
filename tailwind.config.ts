import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { setupInspiraUI } from "@inspira-ui/plugins";

export default <Partial<Config>>{
  darkMode: "class", // or 'media' or 'class
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        borderRadius: {
          xl: "calc(var(--radius) + 4px)",
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
  },
  plugins: [animate, setupInspiraUI],
};
