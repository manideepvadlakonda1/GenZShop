const RecentOrderItem = ({ order }) => {
  return (
    <div className="order-item">
      <div className="order-main">
        <div className="order-title">Order #order_{order.id}</div>
        <div className="order-sub">{order.customer} - ₹{order.amount.toLocaleString()}</div>
        <div className="order-time">{order.time}</div>
      </div>
      <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
    </div>
  )
}
export default RecentOrderItem
