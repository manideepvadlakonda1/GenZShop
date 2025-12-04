import { useState } from 'react'
import './offers.css'

const Offers = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: 'Summer Sale 2025',
      discount: '50% OFF',
      code: 'SUMMER50',
      validUntil: '2025-12-31',
      active: true,
      minPurchase: 2000
    },
    {
      id: 2,
      title: 'New Customer Offer',
      discount: '₹500 OFF',
      code: 'WELCOME500',
      validUntil: '2025-12-31',
      active: true,
      minPurchase: 3000
    },
    {
      id: 3,
      title: 'Festival Special',
      discount: '40% OFF',
      code: 'FEST40',
      validUntil: '2025-12-15',
      active: false,
      minPurchase: 1500
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingOffer, setEditingOffer] = useState(null)
  const [form, setForm] = useState({
    title: '',
    discount: '',
    code: '',
    validUntil: '',
    active: true,
    minPurchase: 0
  })

  const handleAdd = () => {
    setEditingOffer(null)
    setForm({ title: '', discount: '', code: '', validUntil: '', active: true, minPurchase: 0 })
    setShowModal(true)
  }

  const handleEdit = (offer) => {
    setEditingOffer(offer)
    setForm(offer)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this offer?')) return
    setOffers(offers.filter(o => o.id !== id))
  }

  const toggleActive = (id) => {
    setOffers(offers.map(o => o.id === id ? { ...o, active: !o.active } : o))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingOffer) {
      setOffers(offers.map(o => o.id === editingOffer.id ? { ...o, ...form } : o))
    } else {
      setOffers([...offers, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  return (
    <div className="offers-page">
      <div className="offers-header">
        <div>
          <h2>Offers & Promotions</h2>
          <p className="subtitle">Manage discount codes and promotional banners</p>
        </div>
        <button className="add-btn" onClick={handleAdd}>
          <i className="fa-solid fa-plus" /> Add Offer
        </button>
      </div>

      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className={`offer-card ${!offer.active ? 'inactive' : ''}`}>
            <div className="offer-header">
              <div className="offer-discount">{offer.discount}</div>
              <button
                className={`toggle-btn ${offer.active ? 'active' : ''}`}
                onClick={() => toggleActive(offer.id)}
              >
                {offer.active ? 'Active' : 'Inactive'}
              </button>
            </div>
            <h3>{offer.title}</h3>
            <div className="offer-code">
              <span>Code:</span>
              <code>{offer.code}</code>
            </div>
            <div className="offer-details">
              <p><i className="fa-solid fa-calendar" /> Valid until: {new Date(offer.validUntil).toLocaleDateString()}</p>
              <p><i className="fa-solid fa-shopping-cart" /> Min Purchase: ₹{offer.minPurchase}</p>
            </div>
            <div className="offer-actions">
              <button className="icon-btn edit" onClick={() => handleEdit(offer)}>
                <i className="fa-solid fa-pen" />
              </button>
              <button className="icon-btn delete" onClick={() => handleDelete(offer.id)}>
                <i className="fa-solid fa-trash" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingOffer ? 'Edit Offer' : 'Add New Offer'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave} className="offer-form">
              <div className="form-field">
                <label>Offer Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Discount *</label>
                  <input
                    type="text"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    required
                    placeholder="50% OFF or ₹500 OFF"
                  />
                </div>
                <div className="form-field">
                  <label>Coupon Code *</label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Valid Until *</label>
                  <input
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Min Purchase (₹)</label>
                  <input
                    type="number"
                    value={form.minPurchase}
                    onChange={(e) => setForm({ ...form, minPurchase: parseInt(e.target.value) })}
                  />
                </div>
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
                  {editingOffer ? 'Update' : 'Add'} Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Offers
