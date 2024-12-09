import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { galleryData } from '../data/galleryData';
import { useImagePreloader } from '../composables/useImagePreloader';

export const useGalleryStore = defineStore('gallery', () => {
  const galleries = ref(galleryData);
  const { 
    loadedImages, 
    errors, 
    loading, 
    preloadImages, 
    getImageDimensions, 
    hasError 
  } = useImagePreloader();

  const getGalleryPhotos = (galleryId) => {
    return galleries.value[galleryId]?.photos || [];
  };

  const preloadGalleryImages = async (galleryId) => {
    const photos = getGalleryPhotos(galleryId);
    await preloadImages(photos);
  };

  const galleryList = computed(() => {
    return Object.entries(galleries.value).map(([id, gallery]) => ({
      id,
      title: gallery.title,
      description: gallery.description,
      coverImage: gallery.photos[0]?.src,
      photoCount: gallery.photos.length
    }));
  });

  return {
    galleries,
    loading,
    getGalleryPhotos,
    getImageDimensions,
    hasError,
    preloadGalleryImages,
    galleryList
  };
});