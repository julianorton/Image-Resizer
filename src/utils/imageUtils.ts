export const generateImageId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

export const resizeImage = async (
  file: File,
  targetWidth: number,
  targetHeight: number,
  options: {
    quality: number;
    format: string;
    stripMetadata: boolean;
    maxFileSize?: number;
  }
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      // Draw image with specified dimensions
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      
      // Convert to blob with specified format and quality
      const mimeType = `image/${options.format}`;
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob from canvas'));
            return;
          }

          // Check if the blob size exceeds maxFileSize (if specified)
          if (options.maxFileSize && blob.size > options.maxFileSize * 1024) {
            // Recursively try with lower quality until size requirement is met
            if (options.quality > 0.1) {
              const newQuality = options.quality - 0.1;
              try {
                const resizedBlob = await resizeImage(file, targetWidth, targetHeight, {
                  ...options,
                  quality: newQuality,
                });
                resolve(resizedBlob);
              } catch (error) {
                reject(error);
              }
              return;
            }
          }

          resolve(blob);
        },
        mimeType,
        options.quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const calculateAspectRatioFit = (
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

export const generateFileName = (
  originalName: string,
  width: number,
  height: number,
  options: {
    prefix: string;
    suffix: string;
    separator: string;
    useSequentialNumbers: boolean;
    format: string;
    sequenceNumber?: number;
  }
): string => {
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
  const dimensions = `${width}x${height}`;
  const sequence = options.useSequentialNumbers && options.sequenceNumber !== undefined
    ? `${options.separator}${options.sequenceNumber}`
    : '';
  
  return `${options.prefix}${nameWithoutExt}${options.separator}${dimensions}${options.suffix}${sequence}.${options.format}`;
};