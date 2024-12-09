<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <button @click="router.push('/')" 
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <span class="material-icons">arrow_back</span>
          Retour
        </button>
        <h2 class="text-3xl font-bold">{{ galleryTitle }}</h2>
      </div>
      
      <PhotoGallery :photos="galleryPhotos" v-if="galleryPhotos.length > 0" />
      
      <div v-else class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGalleryStore } from '../stores/galleryStore';
import PhotoGallery from '../components/PhotoGallery.vue';

const router = useRouter();
const route = useRoute();
const galleryStore = useGalleryStore();

const galleryPhotos = computed(() => {
  return galleryStore.getGalleryPhotos(route.params.id);
});

const galleryTitle = computed(() => {
  return galleryStore.galleries[route.params.id]?.title || route.params.id;
});
</script>