export const downloadExistingImage = (imgElement, filename) => {
  // Create a canvas to draw the image
  const canvas = document.createElement('canvas')
  canvas.width = imgElement.naturalWidth || imgElement.width
  canvas.height = imgElement.naturalHeight || imgElement.height
  const ctx = canvas.getContext('2d')

  try {
    // Draw the image to canvas
    ctx.drawImage(imgElement, 0, 0)

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Failed to create blob from canvas')
        return
      }

      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename || 'image.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Release URL object
      URL.revokeObjectURL(blobUrl)
    }, 'image/png')
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}
