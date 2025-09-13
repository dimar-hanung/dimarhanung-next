// Utilities
export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
export const clamp100 = (n: number) =>
  Math.min(100, Math.max(0, Math.round(n)));
export const mmss = (s: number) => {
  const minutes = Math.floor(s / 60);
  const seconds = Math.floor(s % 60);
  const milliseconds = Math.floor((s % 1) * 100); // Get hundredths of a second
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}.${String(milliseconds).padStart(2, "0")}`;
};

export const createNoisePattern = (ctx: CanvasRenderingContext2D) => {
  try {
    const n = document.createElement("canvas");
    const size = 64;
    n.width = size;
    n.height = size;
    const nc = n.getContext("2d");
    if (!nc) return null;
    const img = nc.createImageData(size, size);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.floor(Math.random() * 256);
      data[i] = v; // r
      data[i + 1] = v; // g
      data[i + 2] = v; // b
      data[i + 3] = 24; // a (0-255) very subtle
    }
    nc.putImageData(img, 0, 0);

    return ctx.createPattern(n, "repeat");
  } catch (_) {
    return null;
  }
};
