/**
 * Resizes an image file on the client using HTML Canvas to reduce upload size.
 *
 * @param file The original image file
 * @param maxWidth Maximum width in pixels (default: 1920)
 * @param maxHeight Maximum height in pixels (default: 1080)
 * @param quality JPEG/WebP quality between 0.1 and 1.0 (default: 0.85)
 * @returns Promise with the resized File (or original if SVG or smaller)
 */
export async function resizeImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85
): Promise<File> {
  // SVGs and non-images should not be canvas-processed
  if (file.type === 'image/svg+xml' || !file.type.startsWith('image/')) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width <= maxWidth && height <= maxHeight && file.size < 1024 * 1024) {
          // File is already small enough
          resolve(file);
          return;
        }

        // Calculate new dimensions preserving aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const resizedFile = new File([blob], file.name, {
              type: mimeType,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          },
          mimeType,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

