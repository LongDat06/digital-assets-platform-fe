import React, { useState, useEffect } from 'react'
import { fetchPurchases } from '../../services/assetService'
import { Purchase } from '../../types'
import PurchaseDownloadButton from './PurchaseDownloadButton';

const PurchasedProducts: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const response = await fetchPurchases()
        setPurchases(response.data)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    loadPurchases()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {error}
        </div>
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Purchased Products</h1>
        <div className="text-center text-gray-600">
          Customers have not purchased the product yet..
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Purchased Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex flex-row items-center justify-between p-4 bg-gray-100">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Title: {purchase.attributes.title}</h3>
                <p className="text-gray-600 mt-2">Purchase ID: {purchase.id}</p>
                <p className="text-gray-600 mt-2">Amount: ${purchase.attributes.amount}</p>
                <p className="text-gray-600 mt-2">Status: {purchase.attributes.status}</p>
                <p className="text-gray-600 mt-2">
                  Purchased c: {new Date(purchase.attributes.createdAt).toLocaleDateString()}
                </p>
              </div>
                <PurchaseDownloadButton purchaseId={Number(purchase.id)} />
            </div>
          </div> 
        ))}
      </div>
    </div>
  )
}

export default PurchasedProducts