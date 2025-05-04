import React, { useState, useEffect } from 'react'
import { Asset } from '../../types'
import { fetchAssets } from '../../services/assetService'

const ProductList: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'title'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const response = await fetchAssets()
        setAssets(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load assets')
        setLoading(false)
      }
    }

    loadAssets()
  }, [])

  const filteredAssets = assets
    .filter(asset => 
      asset.attributes.title.toLowerCase().includes(filter.toLowerCase()) ||
      asset.attributes.description.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        const priceA = parseFloat(a.attributes.price)
        const priceB = parseFloat(b.attributes.price)
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA
      } else {
        return sortOrder === 'asc' 
          ? a.attributes.title.localeCompare(b.attributes.title)
          : b.attributes.title.localeCompare(a.attributes.title)
      }
    })

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

  return (
    <div data-controller="selection" className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Digital Assets</h1>
        <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              data-controller="navigation"
              data-action="click->navigation#redirectToPurchasedProducts"
            >
            Purchased Products
            </button>
          <input
            type="text"
            placeholder="Search assets..."
            className="px-4 py-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'title')}
          >
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold">{asset.attributes.title}</h3>
              <p className="text-gray-600 mt-2">{asset.attributes.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold">${asset.attributes.price}</span>
                    <p className="text-sm text-gray-500">
                    Sales: {asset.attributes.assetStats.totalSales}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    data-selection-target="checkbox"
                    data-asset-id={asset.id}
                    data-action="change->selection#toggleSelection"
                  />                
                </div>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(asset.attributes.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          data-action="click->selection#purchase"
        >
          Purchase
        </button>
      </div>
    </div>
  )
}

export default ProductList
