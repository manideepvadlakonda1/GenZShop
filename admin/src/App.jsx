import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import CategorySub from './pages/CategorySub'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Offers from './pages/Offers'
import FAQ from './pages/FAQ'
import Payments from './pages/Payments'
import Shipping from './pages/Shipping'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}> 
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<CategorySub />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="offers" element={<Offers />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="payments" element={<Payments />} />
          <Route path="shipping" element={<Shipping />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
