import jsQR from 'jsqr';

export type QrDecodeResult =
  | { success: true; data: string }
  | { success: false; error: string };

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = src;
  });
}

function decodeFromImageData(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): string | null {
  const code = jsQR(data, width, height, {
    inversionAttempts: 'attemptBoth',
  });
  return code?.data ?? null;
}

function decodeQrFromImageElement(image: HTMLImageElement): QrDecodeResult {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    return { success: false, error: 'Canvas is not supported in this browser' };
  }

  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (!width || !height) {
    return { success: false, error: 'Image has no readable dimensions' };
  }

  const maxSide = Math.max(width, height);
  const scales = new Set<number>([1]);

  if (maxSide > 1024) {
    scales.add(1024 / maxSide);
  }
  if (maxSide < 320) {
    scales.add(320 / maxSide);
  }
  if (maxSide < 640) {
    scales.add(640 / maxSide);
  }

  for (const scale of scales) {
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(image, 0, 0, w, h);

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = decodeFromImageData(imageData.data, w, h);
    if (data) {
      return { success: true, data };
    }
  }

  return { success: false, error: 'No QR code found in this image' };
}

export async function decodeQrFromBlob(blob: Blob): Promise<QrDecodeResult> {
  const url = URL.createObjectURL(blob);
  try {
    const image = await loadImage(url);
    return decodeQrFromImageElement(image);
  } catch {
    return { success: false, error: 'Failed to load image' };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function decodeQrFromFile(file: File): Promise<QrDecodeResult> {
  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'Please upload an image file' };
  }
  return decodeQrFromBlob(file);
}
