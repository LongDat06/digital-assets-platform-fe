export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface Asset {
  id: string
  type: string
  attributes: {
    title: string
    description: string
    fileUrl: string | null
    price: string
    createdAt: string
    updatedAt: string
    assetStats: {
      totalSales: number
      totalRevenue: string
    }
  }
  relationships: {
    creator: {
      data: {
        id: string
        type: string
      }
    }
  }
}

export interface AssetResponse {
  data: Asset[]
}

export interface Purchase {
  id: string
  type: string
  attributes: {
    title: string
    amount: string
    status: string
    createdAt: string
    updatedAt: string
  }
}

export interface PurchaseResponse {
  data: Purchase[]
}
