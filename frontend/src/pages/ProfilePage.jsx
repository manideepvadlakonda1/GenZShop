import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../context/authStore'
import { orderService } from '../services/api'
import './ProfilePage.css'

const ProfilePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, setUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profileImage: user?.profileImage || ''
  })
  const [addresses, setAddresses] = useState([])
  const [orders, setOrders] = useState([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null)
  const [addressFormData, setAddressFormData] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  })

  const fetchUserOrders = useCallback(async () => {
    try {
      console.log('Fetching user orders...')
      console.log('User object:', user)
      console.log('Token:', localStorage.getItem('token'))
      const response = await orderService.getUserOrders()
      console.log('Orders response:', response.data)
      if (response.data.success) {
        console.log('Orders fetched:', response.data.orders)
        const fetchedOrders = response.data.orders || []
        setOrders(fetchedOrders)
        // Clear localStorage cache to prevent conflicts
        if (fetchedOrders.length > 0) {
          localStorage.removeItem('orders')
        }
      } else {
        console.log('Failed to fetch orders:', response.data)
        setOrders([])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      console.error('Error response:', error.response?.data)
      console.error('Status:', error.response?.status)
      if (error.response?.status === 401) {
        console.error('User is not authenticated! Redirecting to login...')
        navigate('/login')
      }
      setOrders([])
    }
  }, [user, navigate])

  useEffect(() => {
    // Check if user is authenticated by checking both user object and token
    const token = localStorage.getItem('token')
    const authStorage = localStorage.getItem('auth-storage')
    
    console.log('ProfilePage mounted')
    console.log('User:', user)
    console.log('Token:', token)
    console.log('Auth storage:', authStorage)
    
    if (!user && !token && !authStorage) {
      console.log('No authentication found, redirecting to login')
      navigate('/login')
      return
    }
    
    if (user) {
      // Load orders from API immediately on mount
      fetchUserOrders()
      
      // Load addresses from localStorage
      const savedAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]')
      setAddresses(savedAddresses)
    }
  }, [user, navigate, fetchUserOrders])
  
  // Auto-refresh orders when on orders tab and set up interval
  useEffect(() => {
    if (activeTab === 'orders' && user) {
      // Refresh immediately when switching to orders tab
      console.log('Active tab is orders, fetching fresh data...')
      fetchUserOrders()
      
      // Set up auto-refresh every 30 seconds
      const refreshInterval = setInterval(() => {
        console.log('Auto-refreshing orders...')
        fetchUserOrders()
      }, 30000) // 30 seconds
      
      return () => clearInterval(refreshInterval)
    }
  }, [activeTab, user, fetchUserOrders])
  
  // Refresh orders when user navigates back to this page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && activeTab === 'orders' && user) {
        fetchUserOrders()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [activeTab, user, fetchUserOrders])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // TODO: API call to update profile
    setUser({ ...user, ...profileData }, user.token)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, profileImage: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddressDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const updatedAddresses = addresses.filter(addr => addr.id !== id)
      setAddresses(updatedAddresses)
      localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses))
    }
  }

  const handleAddressEdit = (address) => {
    setEditingAddressId(address.id)
    setAddressFormData(address)
    setShowAddressForm(true)
  }

  const handleAddNewAddress = () => {
    setEditingAddressId(null)
    setAddressFormData({
      type: 'Home',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    })
    setShowAddressForm(true)
  }

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setAddressFormData({
      ...addressFormData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleAddressFormSubmit = (e) => {
    e.preventDefault()
    
    let updatedAddresses
    if (editingAddressId) {
      // Update existing address
      updatedAddresses = addresses.map(addr => 
        addr.id === editingAddressId ? { ...addressFormData, id: editingAddressId } : addr
      )
    } else {
      // Add new address
      const newAddress = {
        ...addressFormData,
        id: Date.now().toString()
      }
      updatedAddresses = [...addresses, newAddress]
    }
    
    setAddresses(updatedAddresses)
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses))
    
    setShowAddressForm(false)
    setEditingAddressId(null)
  }

  const handleCancelAddressForm = () => {
    setShowAddressForm(false)
    setEditingAddressId(null)
  }

  const getStatusColor = (status) => {
    const statusLower = (status || '').toLowerCase()
    switch(statusLower) {
      case 'delivered': return 'status-delivered'
      case 'shipped': 
      case 'in transit': return 'status-transit'
      case 'processing':
      case 'pending': return 'status-processing'
      case 'cancelled': return 'status-cancelled'
      default: return ''
    }
  }

  if (!user) return null

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-user-info">
              <div className="profile-avatar">
                {profileData.profileImage ? (
                  <img src={profileData.profileImage} alt={user.name} />
                ) : (
                  <i className="fas fa-user-circle"></i>
                )}
              </div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            
            <nav className="profile-nav">
              <button 
                className={activeTab === 'profile' ? 'active' : ''} 
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-user"></i> My Profile
              </button>
              <button 
                className={activeTab === 'address' ? 'active' : ''} 
                onClick={() => setActiveTab('address')}
              >
                <i className="fas fa-map-marker-alt"></i> My Addresses
              </button>
              <button 
                className={activeTab === 'orders' ? 'active' : ''} 
                onClick={() => setActiveTab('orders')}
              >
                <i className="fas fa-shopping-bag"></i> My Orders
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </nav>
          </div>

          <div className="profile-content">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>My Profile</h2>
                  {!isEditing && (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-edit"></i> Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="profile-form">
                    <div className="profile-image-upload">
                      <div className="image-preview">
                        {profileData.profileImage ? (
                          <img src={profileData.profileImage} alt="Profile" />
                        ) : (
                          <i className="fas fa-user-circle"></i>
                        )}
                      </div>
                      <label htmlFor="profile-image" className="upload-label">
                        <i className="fas fa-camera"></i> Change Photo
                        <input 
                          type="file" 
                          id="profile-image" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>

                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={profileData.email}
                        disabled
                      />
                      <small>Email cannot be changed</small>
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="save-btn">Save Changes</button>
                      <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-details">
                    <div className="detail-item">
                      <label>Full Name</label>
                      <p>{user.name}</p>
                    </div>
                    <div className="detail-item">
                      <label>Email Address</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="detail-item">
                      <label>Phone Number</label>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <div className="address-section">
                <div className="section-header">
                  <h2>My Addresses</h2>
                  <button className="add-btn" onClick={handleAddNewAddress}>
                    <i className="fas fa-plus"></i> Add New Address
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddressFormSubmit} className="address-form">
                    <h3>{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Address Type</label>
                        <select name="type" value={addressFormData.type} onChange={handleAddressFormChange} required>
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Street Address</label>
                      <input 
                        type="text" 
                        name="street"
                        value={addressFormData.street}
                        onChange={handleAddressFormChange}
                        placeholder="Enter street address"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input 
                          type="text" 
                          name="city"
                          value={addressFormData.city}
                          onChange={handleAddressFormChange}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input 
                          type="text" 
                          name="state"
                          value={addressFormData.state}
                          onChange={handleAddressFormChange}
                          placeholder="State"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>ZIP Code</label>
                        <input 
                          type="text" 
                          name="zipCode"
                          value={addressFormData.zipCode}
                          onChange={handleAddressFormChange}
                          placeholder="ZIP"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group checkbox-group">
                      <label>
                        <input 
                          type="checkbox" 
                          name="isDefault"
                          checked={addressFormData.isDefault}
                          onChange={handleAddressFormChange}
                        />
                        <span>Set as default address</span>
                      </label>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        {editingAddressId ? 'Update Address' : 'Add Address'}
                      </button>
                      <button type="button" className="cancel-btn" onClick={handleCancelAddressForm}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="address-list">
                  {addresses.length > 0 ? (
                    addresses.map(address => (
                      <div key={address.id} className="address-card">
                        <div className="address-header">
                          <div className="address-type">
                            <i className="fas fa-home"></i>
                            <strong>{address.type}</strong>
                            {address.isDefault && <span className="default-badge">Default</span>}
                          </div>
                          <div className="address-actions">
                            <button className="icon-btn" onClick={() => handleAddressEdit(address)}>
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="icon-btn" onClick={() => handleAddressDelete(address.id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <div className="address-details">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-map-marker-alt"></i>
                      <p>No addresses added yet</p>
                      <button onClick={handleAddNewAddress}>Add Your First Address</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="orders-section">
                <div className="section-header">
                  <h2>My Orders</h2>
                  <button className="refresh-btn" onClick={fetchUserOrders} title="Refresh orders">
                    <i className="fas fa-sync-alt"></i> Refresh
                  </button>
                </div>

                <div className="orders-list">
                  {orders.length > 0 ? (
                    orders.map(order => (
                      <div key={order._id || order.orderId || order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <h4>Order #{(order.orderId || order.id || order._id || '').toString().slice(-8)}</h4>
                            <p className="order-date">{new Date(order.createdAt || order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                          <span className={`order-status ${getStatusColor(order.status)}`}>
                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                          </span>
                        </div>
                        <div className="order-items-preview">
                          {order.items?.slice(0, 3).map((item, index) => (
                            <div key={index} className="order-item-mini">
                              <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} />
                              <div className="item-mini-info">
                                <p className="item-mini-name">{item.name}</p>
                                <p className="item-mini-qty">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                          {order.items && order.items.length > 3 && (
                            <p className="more-items">+{order.items.length - 3} more items</p>
                          )}
                        </div>
                        <div className="order-details">
                          <div className="order-meta">
                            <span><i className="fas fa-box"></i> {order.items?.length || 0} items</span>
                            <span className="order-total">₹{(order.totalAmount || order.total || 0).toFixed(0)}</span>
                          </div>
                          <button className="view-order-btn" onClick={() => setSelectedOrderDetails(order)}>View Details</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-shopping-bag"></i>
                      <p>No orders yet</p>
                      <button onClick={() => navigate('/shop')}>Start Shopping</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="modal-overlay" onClick={() => setSelectedOrderDetails(null)}>
          <div className="modal-content order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close" onClick={() => setSelectedOrderDetails(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="order-detail-header">
                <div className="order-detail-info">
                  <h3>Order #{(selectedOrderDetails.orderId || selectedOrderDetails.id || selectedOrderDetails._id || '').toString().slice(-8)}</h3>
                  <p className="order-date">
                    <i className="fas fa-calendar"></i> 
                    {new Date(selectedOrderDetails.createdAt || selectedOrderDetails.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`order-status ${getStatusColor(selectedOrderDetails.status)}`}>
                  {selectedOrderDetails.status ? selectedOrderDetails.status.charAt(0).toUpperCase() + selectedOrderDetails.status.slice(1) : 'Pending'}
                </span>
              </div>

              <div className="order-detail-section">
                <h4><i className="fas fa-box"></i> Items Ordered</h4>
                <div className="order-items-list">
                  {selectedOrderDetails.items?.map((item, index) => (
                    <div key={index} className="order-detail-item">
                      <img src={item.image || item.images?.[0] || 'https://via.placeholder.com/80'} alt={item.name} />
                      <div className="order-detail-item-info">
                        <h5>{item.name}</h5>
                        <p className="item-category">{item.category}</p>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                      </div>
                      <div className="order-detail-item-price">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-detail-section">
                <h4><i className="fas fa-map-marker-alt"></i> Shipping Address</h4>
                <div className="shipping-address-box">
                  <p><strong>{selectedOrderDetails.shippingAddress?.name}</strong></p>
                  <p>{selectedOrderDetails.shippingAddress?.address}</p>
                  <p>{selectedOrderDetails.shippingAddress?.city}, {selectedOrderDetails.shippingAddress?.state} {selectedOrderDetails.shippingAddress?.zipCode}</p>
                  <p><i className="fas fa-phone"></i> {selectedOrderDetails.shippingAddress?.phone}</p>
                  <p><i className="fas fa-envelope"></i> {selectedOrderDetails.shippingAddress?.email}</p>
                </div>
              </div>

              <div className="order-detail-section">
                <h4><i className="fas fa-credit-card"></i> Payment Information</h4>
                <div className="payment-info-box">
                  <div className="payment-row">
                    <span>Payment Method:</span>
                    <span className="payment-method">{selectedOrderDetails.paymentMethod?.toUpperCase() || 'COD'}</span>
                  </div>
                  <div className="payment-row">
                    <span>Payment Status:</span>
                    <span className={`payment-status ${selectedOrderDetails.paymentStatus === 'paid' ? 'paid' : 'pending'}`}>
                      {selectedOrderDetails.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="order-detail-section">
                <h4><i className="fas fa-receipt"></i> Order Summary</h4>
                <div className="order-summary-box">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{((selectedOrderDetails.totalAmount || selectedOrderDetails.total || 0) - (selectedOrderDetails.shippingCost || 0)).toFixed(0)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>₹{(selectedOrderDetails.shippingCost || 0).toFixed(0)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹{(selectedOrderDetails.totalAmount || selectedOrderDetails.total || 0).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
