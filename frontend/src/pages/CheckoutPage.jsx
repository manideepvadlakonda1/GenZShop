import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../context/cartStore'
import { useAuthStore } from '../context/authStore'
import { orderService } from '../services/api'
import './CheckoutPage.css'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart, removeFromCart, updateQuantity } = useCartStore()
  const { user } = useAuthStore()
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod',
    saveAddress: true
  })

  useEffect(() => {
    // Load saved addresses from localStorage
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]')
    setSavedAddresses(addresses)
    
    // Pre-fill user info if logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
    
    // If no addresses exist, show the form
    if (addresses.length === 0) {
      setShowNewAddressForm(true)
    }
  }, [user])

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id)
    setFormData(prev => ({
      ...prev,
      address: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode
    }))
    setShowNewAddressForm(false)
  }

  const handleAddNewAddress = () => {
    setSelectedAddressId(null)
    setFormData(prev => ({
      ...prev,
      address: '',
      city: '',
      state: '',
      zipCode: ''
    }))
    setShowNewAddressForm(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Generate order ID
      const orderId = 'ORD' + Date.now()
      
      const orderData = {
        orderId: orderId,
        userId: user?._id || null, // Include userId if user is logged in
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          image: item.image || item.images?.[0],
          price: item.price,
          quantity: item.quantity,
          category: item.category
        })),
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        totalAmount: getTotalPrice() + 10,
        subtotal: getTotalPrice(),
        shippingCost: 10,
        status: 'pending',
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'pending'
      }
      
      console.log('Order data being sent:', orderData)
      console.log('User logged in:', !!user)
      console.log('User ID:', user?._id)
      
      // Save address to localStorage if saveAddress is checked and it's a new address
      if (formData.saveAddress && (showNewAddressForm || !selectedAddressId)) {
        const newAddress = {
          id: Date.now().toString(),
          type: 'Home',
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          isDefault: savedAddresses.length === 0
        }
        
        const updatedAddresses = [...savedAddresses, newAddress]
        localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses))
      }
      
      // Save order to backend
      let savedOrderId = orderId
      try {
        console.log('Saving order to backend:', orderData)
        const response = await orderService.create(orderData)
        console.log('Order saved successfully:', response)
        if (response.data && response.data.orderId) {
          savedOrderId = response.data.orderId
        }
        
        // Order saved successfully
        clearCart()
        
        // Navigate to success page
        navigate('/order-success', { 
          state: { 
            orderData: {
              orderId: savedOrderId,
              total: orderData.totalAmount
            }
          } 
        })
        return
      } catch (backendError) {
        console.error('Backend save failed:', backendError)
        console.error('Error details:', backendError.response?.data)
        alert('Failed to place order. Please try again.')
        return
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h2>Checkout</h2>
        
        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-row">
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="First Name" 
                  value={formData.firstName}
                  required 
                  onChange={handleChange} 
                />
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Last Name" 
                  value={formData.lastName}
                  required 
                  onChange={handleChange} 
                />
              </div>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                required 
                onChange={handleChange} 
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone" 
                value={formData.phone}
                required 
                onChange={handleChange} 
              />
            </div>

            <div className="form-section">
              <div className="section-header-with-action">
                <h3>Shipping Address</h3>
                {savedAddresses.length > 0 && !showNewAddressForm && (
                  <button 
                    type="button" 
                    className="btn-add-new-address"
                    onClick={handleAddNewAddress}
                  >
                    <i className="fas fa-plus"></i> Add New Address
                  </button>
                )}
              </div>

              {savedAddresses.length > 0 && !showNewAddressForm && (
                <div className="saved-addresses">
                  {savedAddresses.map((address) => (
                    <div 
                      key={address.id}
                      className={`address-card ${selectedAddressId === address.id ? 'selected' : ''}`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className="address-card-header">
                        <input 
                          type="radio" 
                          checked={selectedAddressId === address.id}
                          onChange={() => handleSelectAddress(address)}
                        />
                        <span className="address-type">{address.type}</span>
                        {address.isDefault && <span className="default-badge">Default</span>}
                      </div>
                      <div className="address-card-body">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showNewAddressForm && (
                <>
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Street Address" 
                    value={formData.address}
                    required 
                    onChange={handleChange} 
                  />
                  <div className="form-row">
                    <input 
                      type="text" 
                      name="city" 
                      placeholder="City" 
                      value={formData.city}
                      required 
                      onChange={handleChange} 
                    />
                    <input 
                      type="text" 
                      name="state" 
                      placeholder="State" 
                      value={formData.state}
                      required 
                      onChange={handleChange} 
                    />
                    <input 
                      type="text" 
                      name="zipCode" 
                      placeholder="Zip Code" 
                      value={formData.zipCode}
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                  <label className="save-address-checkbox">
                    <input 
                      type="checkbox" 
                      name="saveAddress"
                      checked={formData.saveAddress}
                      onChange={(e) => setFormData({...formData, saveAddress: e.target.checked})}
                    />
                    <span>Save this address for future orders</span>
                  </label>
                  {savedAddresses.length > 0 && (
                    <button 
                      type="button" 
                      className="btn-use-saved"
                      onClick={() => setShowNewAddressForm(false)}
                    >
                      <i className="fas fa-arrow-left"></i> Use saved address
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <i className="fas fa-money-bill-wave"></i>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <p>Pay when you receive your order</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Place Order</button>
          </form>

          <div className="order-summary-sidebar">
            <h3>Order Summary</h3>
            
            <div className="cart-items-summary">
              {cart.map((item) => (
                <div key={item._id} className="checkout-item">
                  <img src={item.image || item.images?.[0] || 'https://via.placeholder.com/80x100'} alt={item.name} />
                  <div className="checkout-item-details">
                    <h4>{item.name}</h4>
                    <p className="item-category">{item.category}</p>
                    <div className="quantity-controls">
                      <button 
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="checkout-item-right">
                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item._id)}
                      title="Remove item"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <div className="checkout-item-price">
                      ₹{(item.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{getTotalPrice().toFixed(0)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>₹10</span>
              </div>
              <div className="total-row total-final">
                <span>Total:</span>
                <span>₹{(getTotalPrice() + 10).toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
