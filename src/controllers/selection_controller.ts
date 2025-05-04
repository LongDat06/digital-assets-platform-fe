import { Controller } from '@hotwired/stimulus'
import { purchaseAssets } from '../services/assetService'

export default class extends Controller {
  static targets = ['checkbox']
  selectedAssets: Set<string> = new Set()

  toggleSelection(event: Event) {
    const checkbox = event.target as HTMLInputElement
    const assetId = checkbox.dataset.assetId

    if (!assetId) return

    if (checkbox.checked) {
      this.selectedAssets.add(assetId)
    } else {
      this.selectedAssets.delete(assetId)
    }
  }

  async purchase() {
    try {
      const authToken = localStorage.getItem('auth_token')
      if (!authToken) {
        throw new Error('User is not authenticated')
      }

      const data = await purchaseAssets(Array.from(this.selectedAssets), authToken)
      console.log('Purchase successful:', data)
      alert('Purchase completed successfully!')
    } catch (error) {
      alert('Failed to complete the purchase. Please try again.')
    }
  }
}