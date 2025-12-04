import { useState } from 'react'
import './faq.css'

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 5-7 business days. Express delivery is available for 2-3 days.',
      category: 'Shipping',
      active: true
    },
    {
      id: 2,
      question: 'What is your return policy?',
      answer: 'We offer 7-day easy returns. Products must be unused and in original packaging.',
      category: 'Returns',
      active: true
    },
    {
      id: 3,
      question: 'Do you ship internationally?',
      answer: 'Currently we ship only within India. International shipping coming soon!',
      category: 'Shipping',
      active: true
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingFaq, setEditingFaq] = useState(null)
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'General',
    active: true
  })

  const handleAdd = () => {
    setEditingFaq(null)
    setForm({ question: '', answer: '', category: 'General', active: true })
    setShowModal(true)
  }

  const handleEdit = (faq) => {
    setEditingFaq(faq)
    setForm(faq)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return
    setFaqs(faqs.filter(f => f.id !== id))
  }

  const toggleActive = (id) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, active: !f.active } : f))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingFaq) {
      setFaqs(faqs.map(f => f.id === editingFaq.id ? { ...f, ...form } : f))
    } else {
      setFaqs([...faqs, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  return (
    <div className="faq-page">
      <div className="faq-header">
        <div>
          <h2>FAQ Management</h2>
          <p className="subtitle">Manage frequently asked questions</p>
        </div>
        <button className="add-btn" onClick={handleAdd}>
          <i className="fa-solid fa-plus" /> Add FAQ
        </button>
      </div>

      <div className="faq-list">
        {faqs.map(faq => (
          <div key={faq.id} className={`faq-card ${!faq.active ? 'inactive' : ''}`}>
            <div className="faq-header-row">
              <div className="faq-category">{faq.category}</div>
              <button
                className={`toggle-btn ${faq.active ? 'active' : ''}`}
                onClick={() => toggleActive(faq.id)}
              >
                {faq.active ? 'Active' : 'Inactive'}
              </button>
            </div>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
            <div className="faq-actions">
              <button className="icon-btn edit" onClick={() => handleEdit(faq)}>
                <i className="fa-solid fa-pen" /> Edit
              </button>
              <button className="icon-btn delete" onClick={() => handleDelete(faq.id)}>
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
              <h2>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSave} className="faq-form">
              <div className="form-field">
                <label>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                >
                  <option value="General">General</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Returns">Returns</option>
                  <option value="Payment">Payment</option>
                  <option value="Products">Products</option>
                </select>
              </div>
              <div className="form-field">
                <label>Question *</label>
                <input
                  type="text"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label>Answer *</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  required
                  rows={4}
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
                  {editingFaq ? 'Update' : 'Add'} FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default FAQ
