import { AssetResponse } from '../types'
import { PurchaseResponse } from '../types'

const API_BASE_URL = 'http://localhost:3000/api/v1' 

export const fetchAssets = async (): Promise<AssetResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/`)
    if (!response.ok) {
      throw new Error('Failed to fetch assets')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching assets:', error)
    throw error
  }
}

export const fetchPurchases = async (): Promise<PurchaseResponse> => {
  try {
    const authToken = localStorage.getItem('auth_token')
    if (!authToken) {
      throw new Error('User is not authenticated')
    }

    const response = await fetch(`${API_BASE_URL}/purchases/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch purchases')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching purchases:', error)
    throw error
  }
}

export const purchaseAssets = async (assetIds: string[], authToken: string): Promise<void> => {

  console.log('Purchasing assets:', assetIds)
  try {
    const response = await fetch(`${API_BASE_URL}/purchases/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ asset_ids: assetIds }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to purchase assets')
    }
  } catch (error) {
    console.error('Error purchasing assets:', error)
    throw error
  }
}
