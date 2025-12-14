// Fingerprint tracing using Canvas API (simulates OpenCV edge detection)
export async function traceFingerprint(imageDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      // Create canvas for processing
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Step 1: Convert to grayscale
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
      
      // Step 2: Apply Gaussian blur (3x3 kernel approximation)
      const blurred = applyGaussianBlur(imageData, canvas.width, canvas.height);
      
      // Step 3: Apply contrast enhancement (CLAHE approximation)
      const enhanced = enhanceContrast(blurred);
      
      // Step 4: Apply Sobel edge detection (Canny approximation)
      const edges = applySobelEdgeDetection(enhanced, canvas.width, canvas.height);
      
      // Step 5: Apply morphological operations to strengthen ridges
      const morphed = applyMorphologicalOperations(edges, canvas.width, canvas.height);
      
      // Put processed image data back
      ctx.putImageData(morphed, 0, 0);
      
      // Convert to data URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.src = imageDataUrl;
  });
}

function applyGaussianBlur(imageData: ImageData, width: number, height: number): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const result = new ImageData(new Uint8ClampedArray(data), width, height);
  
  // 3x3 Gaussian kernel
  const kernel = [
    1/16, 2/16, 1/16,
    2/16, 4/16, 2/16,
    1/16, 2/16, 1/16
  ];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sum = 0;
      let ki = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          sum += data[idx] * kernel[ki];
          ki++;
        }
      }
      
      const idx = (y * width + x) * 4;
      result.data[idx] = sum;
      result.data[idx + 1] = sum;
      result.data[idx + 2] = sum;
      result.data[idx + 3] = 255;
    }
  }
  
  return result;
}

function enhanceContrast(imageData: ImageData): ImageData {
  const data = imageData.data;
  const result = new ImageData(new Uint8ClampedArray(data), imageData.width, imageData.height);
  
  // Find min and max values
  let min = 255, max = 0;
  for (let i = 0; i < data.length; i += 4) {
    min = Math.min(min, data[i]);
    max = Math.max(max, data[i]);
  }
  
  // Apply contrast stretching
  const range = max - min || 1;
  for (let i = 0; i < result.data.length; i += 4) {
    const normalized = ((result.data[i] - min) / range) * 255;
    result.data[i] = normalized;
    result.data[i + 1] = normalized;
    result.data[i + 2] = normalized;
    result.data[i + 3] = 255;
  }
  
  return result;
}

function applySobelEdgeDetection(imageData: ImageData, width: number, height: number): ImageData {
  const data = imageData.data;
  const result = new ImageData(new Uint8ClampedArray(data.length), width, height);
  
  // Sobel kernels
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0, gy = 0;
      let ki = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          gx += data[idx] * sobelX[ki];
          gy += data[idx] * sobelY[ki];
          ki++;
        }
      }
      
      // Calculate gradient magnitude
      const magnitude = Math.min(255, Math.sqrt(gx * gx + gy * gy));
      
      const idx = (y * width + x) * 4;
      result.data[idx] = magnitude;
      result.data[idx + 1] = magnitude;
      result.data[idx + 2] = magnitude;
      result.data[idx + 3] = 255;
    }
  }
  
  return result;
}

function applyMorphologicalOperations(imageData: ImageData, width: number, height: number): ImageData {
  const data = imageData.data;
  const result = new ImageData(new Uint8ClampedArray(data), width, height);
  
  // Apply threshold to create binary image
  const threshold = 50;
  for (let i = 0; i < result.data.length; i += 4) {
    const val = result.data[i] > threshold ? 255 : 0;
    result.data[i] = val;
    result.data[i + 1] = val;
    result.data[i + 2] = val;
    result.data[i + 3] = 255;
  }
  
  // Apply dilation to strengthen ridge patterns
  const dilated = new ImageData(new Uint8ClampedArray(result.data), width, height);
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let maxVal = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          maxVal = Math.max(maxVal, result.data[idx]);
        }
      }
      
      const idx = (y * width + x) * 4;
      dilated.data[idx] = maxVal;
      dilated.data[idx + 1] = maxVal;
      dilated.data[idx + 2] = maxVal;
    }
  }
  
  // Invert colors for better visualization (white ridges on dark background)
  for (let i = 0; i < dilated.data.length; i += 4) {
    dilated.data[i] = 255 - dilated.data[i];
    dilated.data[i + 1] = 255 - dilated.data[i + 1];
    dilated.data[i + 2] = 255 - dilated.data[i + 2];
  }
  
  return dilated;
}
