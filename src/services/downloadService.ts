const API_BASE_URL = 'http://localhost:3000/api/v1'

export const downloadFile = async (purchaseId: number, authToken: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/purchases/${purchaseId}/download/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
  
      if (!response.ok) {
        throw new Error('Failed to download file')
      }
  
      const blob = await response.blob()
      triggerFileDownload(blob, `purchase_${purchaseId}.zip`)
    } catch (error) {
      console.error('Error downloading file:', error)
      throw error
    }
}
  
const triggerFileDownload = (blob: Blob, filename: string): void => {
    const url = window.URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = filename
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.URL.revokeObjectURL(url)
}
