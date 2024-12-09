export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      resolve({
        w: img.naturalWidth,
        h: img.naturalHeight
      })
    }

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`))
    }

    img.src = src
  })
}

export const preloadImage = async (src) => {
  try {
    const dimensions = await getImageDimensions(src)
    return { src, dimensions, error: null }
  } catch (error) {
    console.error(`Error loading image ${src}:`, error)
    return { src, dimensions: null, error }
  }
}