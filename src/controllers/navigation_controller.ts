import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  redirectToPurchasedProducts() {
    // Redirect to the Purchased Products page
    window.location.href = '/orders'
  }
}