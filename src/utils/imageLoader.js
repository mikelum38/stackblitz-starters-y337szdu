export class ImageLoader {
  static async load(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      const timeoutId = setTimeout(() => {
        reject(new Error(`Timeout loading image: ${src}`));
      }, 10000); // 10 second timeout

      img.onload = () => {
        clearTimeout(timeoutId);
        resolve({
          src,
          dimensions: {
            w: img.naturalWidth,
            h: img.naturalHeight
          },
          error: null
        });
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Failed to load image: ${src}`));
      };

      // Add cache busting to prevent browser caching issues
      const cacheBuster = `?t=${Date.now()}`;
      img.src = src + cacheBuster;
    });
  }

  static async preloadImages(images) {
    return Promise.allSettled(
      images.map(img => this.load(img.src))
    );
  }
}