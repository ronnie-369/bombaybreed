/**
 * Utility functions for image processing, specifically background removal
 */

const imageCache = new Map<string, string>();

/**
 * Removes white/light background from an image and makes it transparent
 * Uses canvas to process pixels and remove near-white colors
 */
export const removeWhiteBackground = async (imageUrl: string): Promise<string> => {
  // Check cache first
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl)!;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        // Create canvas for processing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Process pixels - remove white/light backgrounds
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Calculate brightness and saturation
          const brightness = (r + g + b) / 3;
          const maxColor = Math.max(r, g, b);
          const minColor = Math.min(r, g, b);
          const saturation = maxColor === 0 ? 0 : (maxColor - minColor) / maxColor;
          
          // Remove pixels that are:
          // - Very bright (near white)
          // - Low saturation (grayish/white)
          // - Close to pure white
          if (brightness > 240 || 
              (brightness > 200 && saturation < 0.1) ||
              (r > 245 && g > 245 && b > 245)) {
            data[i + 3] = 0; // Make transparent
          }
        }
        
        // Put processed data back
        ctx.putImageData(imageData, 0, 0);
        
        // Convert to data URL
        const processedImageUrl = canvas.toDataURL('image/png');
        
        // Cache the result
        imageCache.set(imageUrl, processedImageUrl);
        
        resolve(processedImageUrl);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageUrl;
  });
};

/**
 * Preload and process an image for immediate use
 */
export const preloadTransparentImage = async (imageUrl: string): Promise<void> => {
  try {
    await removeWhiteBackground(imageUrl);
  } catch (error) {
    console.warn('Failed to preload transparent image:', error);
  }
};