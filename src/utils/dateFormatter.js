export function formatDate(dateString) {
  const [year, month, day] = dateString.split('_').slice(0, 3);
  const date = new Date(`${year}-${month}-${day}`);
  
  const options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  };
  
  return date.toLocaleDateString('fr-FR', options);
}

export function extractDateFromImagePath(path) {
  const match = path.match(/IMG_(\d{8})_/);
  if (!match) return null;
  
  const dateStr = match[1];
  return `${dateStr.slice(0,4)}_${dateStr.slice(4,6)}_${dateStr.slice(6,8)}`;
}