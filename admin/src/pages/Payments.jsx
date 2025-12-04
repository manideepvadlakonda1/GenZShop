import { useState } from 'react'
import './payments.css'

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      orderId: 'ORD001234',
      customerName: 'Priya Sharma',
      amount: 5499,
      method: 'Cash on Delivery',
      status: 'completed',
      date: '2025-11-28'
    },
    {
      id: 2,
      orderId: 'ORD001235',
      customerName: 'Anjali Patel',
      amount: 3299,
      method: 'Cash on Delivery',
      status: 'pending',
      date: '2025-11-27'
    },
    {
      id: 3,
      orderId: 'ORD001236',
      customerName: 'Divya Kumar',
      amount: 6799,
      method: 'Cash on Delivery',
      status: 'completed',
      date: '2025-11-26'
    }
  ])

  const [filter, setFilter] = useState('all')

  const filteredPayments = payments.filter(payment =>
    filter === 'all' || payment.status === filter
  )

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingPayments = payments.filter(p => p.status === 'pending').length

  return (
    <div className="payments-page">
      <div className="payments-header">
        <div>
          <h2>Payment Management</h2>
          <p className="subtitle">Track payments and transactions</p>
        </div>
        <div className="payments-stats">
          <div className="stat-card">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">₹{totalRevenue.toLocaleString()}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingPayments}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{payments.filter(p => p.status === 'completed').length}</span>
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        <button className={filter === 'failed' ? 'active' : ''} onClick={() => setFilter('failed')}>Failed</button>
      </div>

      <div className="payments-table-wrap">
        <table className="payments-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>AMOUNT</th>
              <th>METHOD</th>
              <th>STATUS</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id}>
                <td><strong>#{payment.orderId}</strong></td>
                <td>{payment.customerName}</td>
                <td><strong>₹{payment.amount.toLocaleString()}</strong></td>
                <td>
                  <span className="payment-method">
                    <i className="fa-solid fa-money-bill" /> {payment.method}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${payment.status}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPayments.length === 0 && (
          <div className="empty-state">No payments found</div>
        )}
      </div>
    </div>
  )
}

export default Payments
