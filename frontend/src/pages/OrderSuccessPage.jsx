import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './OrderSuccessPage.css'

const OrderSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const orderData = location.state?.orderData || {}

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  const handleViewOrders = () => {
    navigate('/profile', { state: { activeTab: 'orders' } })
  }

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          
          <h1>Order Placed Successfully!</h1>
          <p className="success-message">
            Thank you for your order. We've received your order and will process it shortly.
          </p>

          {orderData.orderId && (
            <div className="order-info">
              <div className="info-row">
                <span className="label">Order ID:</span>
                <span className="value">#{orderData.orderId}</span>
              </div>
              {orderData.total && (
                <div className="info-row">
                  <span className="label">Total Amount:</span>
                  <span className="value">₹{orderData.total.toFixed(0)}</span>
                </div>
              )}
              <div className="info-row">
                <span className="label">Payment Method:</span>
                <span className="value">Cash on Delivery</span>
              </div>
            </div>
          )}

          <div className="delivery-info">
            <i className="fas fa-truck"></i>
            <p>Your order will be delivered to your address within 5-7 business days.</p>
          </div>

          <div className="action-buttons">
            <button onClick={handleViewOrders} className="btn btn-primary">
              <i className="fas fa-receipt"></i>
              View My Orders
            </button>
            <Link to="/shop" className="btn btn-outline">
              <i className="fas fa-shopping-bag"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage
