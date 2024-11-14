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

const EMPTY_COLOR = "0 0 0";

/**
 * Convert color to RGB values, for use with Tailwind CSS variables.
 */
export const colorToRgb = (color: string): string => {
  if (!color) {
    return EMPTY_COLOR;
  }

  color = color.replace("#", "");

  // Konversi singkat hex (misal, #FFF) menjadi bentuk panjang (#FFFFFF)
  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Pastikan kode warnanya valid
  if (color.length !== 6) {
    throw new Error("Invalid color value");
  }

  // Ekstrak komponen RGB dari hex color
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

  // Gabungkan komponen RGB menjadi string
  return `${r} ${g} ${b}`;
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
  const rgb = colorToRgb(color);
  window.document.documentElement.style.setProperty(
    `--color-${name}-${shade}`,
    rgb
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
