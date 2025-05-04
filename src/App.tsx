import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import ProductList from './components/products/ProductList'
import PurchasedProducts from './components/products/PurchasedProducts'

// Import Stimulus application
import './controllers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<PurchasedProducts />} />
      </Routes>
    </Router>
  )
}

export default App
