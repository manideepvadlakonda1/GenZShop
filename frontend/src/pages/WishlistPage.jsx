import { Link } from 'react-router-dom'
import { useWishlistStore } from '../context/wishlistStore'
import { useCartStore } from '../context/cartStore'
import './WishlistPage.css'

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()

  const handleAddToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product._id)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <i className="far fa-heart"></i>
            <h2>Your Wishlist is Empty</h2>
            <p>Save your favorite items here to easily find them later!</p>
            <Link to="/shop" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <button onClick={clearWishlist} className="btn btn-outline">
            Clear All
          </button>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <div key={product._id} className="wishlist-item">
              <button 
                className="remove-btn"
                onClick={() => removeFromWishlist(product._id)}
                title="Remove from wishlist"
              >
                <i className="fas fa-times"></i>
              </button>
              
              <Link to={`/product/${product._id}`} className="wishlist-image">
                <img 
                  src={product.image || 'https://via.placeholder.com/300x400'} 
                  alt={product.name} 
                />
              </Link>
              
              <div className="wishlist-info">
                <Link to={`/product/${product._id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="wishlist-category">{product.category}</p>
                <div className="wishlist-price">
                  <span className="price-current">₹{product.price.toFixed(0)}</span>
                  {product.originalPrice && (
                    <span className="price-original">₹{product.originalPrice.toFixed(0)}</span>
                  )}
                </div>
                <button 
                  className="btn btn-primary btn-add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
