import { useState } from 'react'
import './shipping.css'

const Shipping = () => {
  const [shippingMethods, setShippingMethods] = useState([
    {
      id: 1,
      name: 'Standard Shipping',
      cost: 0,
      estimatedDays: '5-7',
      minOrder: 500,
      active: true,
      description: 'Free shipping on orders above ₹500'
    },
    {
      id: 2,
      name: 'Express Shipping',
      cost: 150,
      estimatedDays: '2-3',
      minOrder: 0,
      active: true,
      description: 'Fast delivery within 2-3 business days'
    },
    {
      id: 3,
      name: 'Same Day Delivery',
      cost: 300,
      estimatedDays: '1',
      minOrder: 1000,
      active: false,
      description: 'Available for selected cities only'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingMethod, setEditingMethod] = useState(null)
  const [form, setForm] = useState({
    name: '',
    cost: 0,
    estimatedDays: '',
    minOrder: 0,
    active: true,
    description: ''
  })

  const handleAdd = () => {
    setEditingMethod(null)
    setForm({ name: '', cost: 0, estimatedDays: '', minOrder: 0, active: true, description: '' })
    setShowModal(true)
  }

  const handleEdit = (method) => {
    setEditingMethod(method)
    setForm(method)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this shipping method?')) return
    setShippingMethods(shippingMethods.filter(m => m.id !== id))
  }

  const toggleActive = (id) => {
    setShippingMethods(shippingMethods.map(m => 
      m.id === id ? { ...m, active: !m.active } : m
    ))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingMethod) {
      setShippingMethods(shippingMethods.map(m => 
        m.id === editingMethod.id ? { ...m, ...form } : m
      ))
    } else {
      setShippingMethods([...shippingMethods, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  return (
    <div className="shipping-page">
      <div className="shipping-header">
        <div>
          <h2>Shipping Management</h2>
          <p className="subtitle">Manage shipping methods and rates</p>
        </div>
        <button className="add-btn" onClick={handleAdd}>
          <i className="fa-solid fa-plus" /> Add Shipping Method
        </button>
      </div>

      <div className="shipping-grid">
        {shippingMethods.map(method => (
          <div key={method.id} className={`shipping-card ${!method.active ? 'inactive' : ''}`}>
            <div className="shipping-header-row">
              <h3>{method.name}</h3>
              <button
                className={`toggle-btn ${method.active ? 'active' : ''}`}
                onClick={() => toggleActive(method.id)}
              >
                {method.active ? 'Active' : 'Inactive'}
              </button>
            </div>
            <div className="shipping-cost">
              {method.cost === 0 ? 'FREE' : `₹${method.cost}`}
            </div>
            <div className="shipping-details">
              <p><i className="fa-solid fa-clock" /> Delivery: {method.estimatedDays} days</p>
              <p><i className="fa-solid fa-shopping-cart" /> Min Order: ₹{method.minOrder}</p>
              <p className="shipping-desc">{method.description}</p>
            </div>
            <div className="shipping-actions">
              <button className="icon-btn edit" onClick={() => handleEdit(method)}>
                <i className="fa-solid fa-pen" /> Edit
              </button>
              <button className="icon-btn delete" onClick={() => handleDelete(method.id)}>
                <i className="fa-solid fa-trash" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingMethod ? 'Edit Shipping Method' : 'Add New Shipping Method'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave} className="shipping-form">
              <div className="form-field">
                <label>Method Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Shipping Cost (₹) *</label>
                  <input
                    type="number"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: parseInt(e.target.value) })}
                    required
                    min="0"
                  />
                </div>
                <div className="form-field">
                  <label>Estimated Days *</label>
                  <input
                    type="text"
                    value={form.estimatedDays}
                    onChange={(e) => setForm({ ...form, estimatedDays: e.target.value })}
                    required
                    placeholder="e.g., 5-7"
                  />
                </div>
              </div>
              <div className="form-field">
                <label>Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  value={form.minOrder}
                  onChange={(e) => setForm({ ...form, minOrder: parseInt(e.target.value) })}
                  min="0"
                />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="form-field">
                <label>
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  />
                  {' '}Active
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">
                  {editingMethod ? 'Update' : 'Add'} Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shipping
