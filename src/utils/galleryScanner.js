export function scanGalleryDirectories() {
  const galleries = {
    vercors: {
      title: 'Massif du Vercors',
      description: 'Randonnée hivernale dans le Vercors',
      photos: []
    },
    belledonne: {
      title: 'Chaîne de Belledonne',
      description: 'Exploration de Belledonne',
      photos: []
    },
    jocou: {
      title: 'Le Jocou',
      description: 'Ascension du Jocou',
      photos: []
    },
    queyras: {
      title: 'Massif du Queyras',
      description: 'Randonnée dans le Queyras',
      photos: []
    },
    'dent-du-chat': {
      title: 'Dent du Chat',
      description: 'Ascension de la Dent du Chat',
      photos: []
    },
    'pas-de-loeille': {
      title: 'Pas de l\'Oeille',
      description: 'Randonnée au Pas de l\'Oeille',
      photos: []
    },
    'vallon-pierra': {
      title: 'Vallon de la Pierra',
      description: 'Exploration du Vallon de la Pierra',
      photos: []
    },
    nevaches: {
      title: 'Vallée de la Clarée',
      description: 'Randonnée dans la vallée de Névaches',
      photos: []
    },
    'grand-rocher': {
      title: 'Le Grand Rocher',
      description: 'Ascension du Grand Rocher',
      photos: []
    }
  };

  // Map directory names to gallery IDs
  const directoryMap = {
    'Vercors': 'vercors',
    'Belledonne': 'belledonne',
    'Jocou': 'jocou',
    'Queyras': 'queyras',
    'Dent du chat': 'dent-du-chat',
    'Pas de l\'oeille': 'pas-de-loeille',
    'Vallon Pierra': 'vallon-pierra',
    'Nevaches': 'nevaches',
    'Grand Rocher': 'grand-rocher'
  };

  // Add all photos to their respective galleries
  Object.entries(directoryMap).forEach(([dirName, galleryId]) => {
    const photos = import.meta.glob('/public/images/**/*.jpg', { eager: true });
    const galleryPhotos = Object.keys(photos)
      .filter(path => path.includes(`/images/${dirName}/`))
      .map(path => ({
        src: path.replace('/public', '')
      }))
      .sort((a, b) => a.src.localeCompare(b.src));

    if (galleries[galleryId]) {
      galleries[galleryId].photos = galleryPhotos;
    }
  });

  return galleries;
}