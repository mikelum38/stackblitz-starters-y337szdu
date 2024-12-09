export function groupGalleriesByMonth(galleries) {
  const monthNames = {
    '11': 'Novembre',
    '12': 'Décembre'
  };

  const grouped = {};

  Object.entries(galleries).forEach(([id, gallery]) => {
    if (!gallery.photos.length) return;
    
    const firstPhoto = gallery.photos[0].src;
    const match = firstPhoto.match(/IMG_(\d{4})(\d{2})/);
    
    if (match) {
      const [_, year, month] = match;
      const monthKey = `${year}-${month}`;
      const monthName = `${monthNames[month]} ${year}`;
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          name: monthName,
          galleries: []
        };
      }
      
      grouped[monthKey].galleries.push({
        id,
        title: gallery.title,
        description: gallery.description,
        photos: gallery.photos
      });
    }
  });

  // Sort months in reverse chronological order
  return Object.entries(grouped)
    .sort(([a], [b]) => b.localeCompare(a))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}