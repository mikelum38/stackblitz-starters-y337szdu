<template>
  <div class="min-h-screen bg-cover bg-center" :style="{ backgroundImage: 'url(/images/background.jpg)' }">
    <div class="min-h-screen bg-black bg-opacity-50 backdrop-blur-sm py-8">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-5xl font-bold text-white mb-8 text-center">
          Galeries Photos de Montagne
        </h1>
        
        <div v-for="[monthKey, month] in Object.entries(monthlyGalleries)" 
             :key="monthKey" 
             class="mb-16">
          <h2 class="text-3xl font-bold text-white mb-6 pl-4 border-l-4 border-blue-400">
            {{ month.name }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="gallery in month.galleries" 
                 :key="gallery.id" 
                 class="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
                 @click="navigateToGallery(gallery.id)">
              <div class="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-xl">
                <div class="relative aspect-w-16 aspect-h-9">
                  <img :src="gallery.photos[0].src" 
                       :alt="gallery.title"
                       class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                      <h3 class="text-2xl font-bold text-white mb-2">{{ gallery.title }}</h3>
                      <p class="text-gray-200 text-sm mb-2">{{ gallery.description }}</p>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-300 text-xs">
                          {{ formatGalleryDate(gallery.photos[0].src) }}
                        </span>
                        <span class="text-blue-400 text-sm">
                          {{ gallery.photos.length }} photos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGalleryStore } from '../stores/galleryStore';
import { formatDate, extractDateFromImagePath } from '../utils/dateFormatter';
import { groupGalleriesByMonth } from '../utils/monthGrouper';

const router = useRouter();
const galleryStore = useGalleryStore();

const monthlyGalleries = computed(() => {
  return groupGalleriesByMonth(galleryStore.galleries);
});

const navigateToGallery = (id) => {
  router.push(`/gallery/${id}`);
};

const formatGalleryDate = (src) => {
  const dateStr = extractDateFromImagePath(src);
  return dateStr ? formatDate(dateStr) : '';
};
</script>