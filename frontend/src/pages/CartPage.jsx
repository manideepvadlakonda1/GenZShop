import { Link } from 'react-router-dom'
import { useCartStore } from '../context/cartStore'
import './CartPage.css'

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="container">
          <h2>Your Cart is Empty</h2>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h2>Shopping Cart</h2>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.images?.[0] || item.image || 'https://via.placeholder.com/100'} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>₹10.00</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{(getTotalPrice() + 10).toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-block">
              Proceed to Checkout
            </Link>
            <button className="btn btn-outline btn-block" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
