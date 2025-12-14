type ColorName = "primary" | "muted";
type ColorShade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

const shades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const EMPTY_COLOR = "#000000";

/**
 * Normalize color to hex format for Tailwind CSS v4.
 * Tailwind v4 uses OKLCH by default but also accepts hex values.
 */
export const normalizeColor = (color: string): string => {
  if (!color) {
    return EMPTY_COLOR;
  }

  // If it's already in OKLCH, RGB, or other CSS format, pass it through
  if (
    color.includes("oklch") ||
    color.includes("rgb") ||
    color.includes("hsl")
  ) {
    console.log("Passing through CSS color format:", color);
    return color;
  }

  // Handle hex colors
  let hexColor = color.replace("#", "");

  // Convert short hex (e.g., #FFF) to long form (#FFFFFF)
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Validate hex color code
  if (hexColor.length !== 6) {
    console.warn("Invalid color value:", color);
    return EMPTY_COLOR;
  }

  // Return as hex string with # prefix
  return `#${hexColor}`;
};

/**
 * Set a tailwind color complete shade.
 */
export function switchColorShades(
  name: ColorName,
  shades: Record<ColorShade, string>
) {
  Object.entries(shades).forEach(([shade, color]) => {
    switchColor(name, shade as ColorShade, color);
  });
}

/**
 * Set a single tailwind color shade from a hex value.
 */
export function switchColor(name: ColorName, shade: ColorShade, color: string) {
  const hexColor = normalizeColor(color);
  window.document.documentElement.style.setProperty(
    `--color-${name}-${shade}`,
    hexColor
  );
}

/**
 * Reset all shades of a color.
 */
export function resetColor(name: ColorName) {
  for (const shade of shades) {
    window.document.documentElement.style.removeProperty(
      `--color-${name}-${shade}`
    );
  }
}
