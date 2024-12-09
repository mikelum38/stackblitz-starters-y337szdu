import { ref } from 'vue';
import { ImageLoader } from '../utils/imageLoader';

export function useImagePreloader() {
  const loadedImages = ref(new Map());
  const errors = ref(new Map());
  const loading = ref(false);

  const preloadImages = async (images) => {
    if (!images.length) return;
    
    loading.value = true;
    
    try {
      const results = await ImageLoader.preloadImages(images);
      
      results.forEach((result, index) => {
        const src = images[index].src;
        
        if (result.status === 'fulfilled') {
          loadedImages.value.set(src, result.value.dimensions);
        } else {
          console.error(`Error loading image ${src}:`, result.reason);
          errors.value.set(src, result.reason);
        }
      });
    } catch (error) {
      console.error('Error in preload batch:', error);
    } finally {
      loading.value = false;
    }
  };

  const getImageDimensions = (src) => loadedImages.value.get(src);
  const hasError = (src) => errors.value.has(src);

  return {
    loadedImages,
    errors,
    loading,
    preloadImages,
    getImageDimensions,
    hasError
  };
}