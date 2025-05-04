import { Controller } from '@hotwired/stimulus'
import { downloadFile } from '../services/downloadService'

export default class extends Controller {
  static values = {
    purchaseId: Number,
  }

  purchaseIdValue!: number

  async download() {
    try {
      const authToken = localStorage.getItem('auth_token')
      if (!authToken) {
        throw new Error('User is not authenticated')
      }

      await downloadFile(this.purchaseIdValue, authToken)
      alert('File downloaded successfully!')
    } catch (error) {
      alert('Failed to download file. Please try again.')
    }
  }
}
