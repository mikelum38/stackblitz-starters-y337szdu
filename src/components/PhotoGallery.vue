<template>
  <div class="photo-gallery">
    <div v-if="galleryStore.loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="(photo, index) in processedPhotos" 
           :key="photo.src" 
           class="photo-item group relative cursor-pointer"
           @click="openLightbox(index)">
        <div class="aspect-w-16 aspect-h-9">
          <img :src="photo.src" 
               :alt="formatTitle(photo.src)"
               loading="lazy"
               class="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 group-hover:brightness-90">
        </div>
        <div v-if="photo.dimensions" 
             class="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div>{{ formatTitle(photo.src) }}</div>
          <div class="text-xs">{{ photo.dimensions.w }}x{{ photo.dimensions.h }}px</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';
import { useGalleryStore } from '../stores/galleryStore';

const props = defineProps({
  photos: {
    type: Array,
    required: true
  }
});

const route = useRoute();
const galleryStore = useGalleryStore();

onMounted(async () => {
  await galleryStore.preloadGalleryImages(route.params.id);
});

const processedPhotos = computed(() => {
  return props.photos.map(photo => ({
    ...photo,
    dimensions: galleryStore.getImageDimensions(photo.src)
  }));
});

const formatTitle = (src) => {
  const date = src.match(/IMG_(\d{8})_(\d{6})/);
  if (date) {
    const [_, dateStr, timeStr] = date;
    const formattedDate = `${dateStr.slice(6,8)}/${dateStr.slice(4,6)}/${dateStr.slice(0,4)}`;
    const formattedTime = `${timeStr.slice(0,2)}:${timeStr.slice(2,4)}:${timeStr.slice(4,6)}`;
    return `${formattedDate} ${formattedTime}`;
  }
  return src.split('/').pop().replace('IMG_', '').replace('.jpg', '');
};

const openLightbox = (index) => {
  const options = {
    dataSource: processedPhotos.value.map(photo => ({
      src: photo.src,
      w: photo.dimensions?.w || 0,
      h: photo.dimensions?.h || 0,
      title: formatTitle(photo.src)
    })),
    index: index,
    closeOnVerticalDrag: true,
    history: false,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    bgOpacity: 0.9,
    showHideAnimationType: 'fade'
  };

  const pswp = new PhotoSwipe(options);
  pswp.init();
};
</script>

<style scoped>
.photo-gallery {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.photo-item {
  break-inside: avoid;
}

.photo-item img {
  backface-visibility: hidden;
}
</style>