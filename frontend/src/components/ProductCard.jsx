import { Link } from 'react-router-dom'
import { useCartStore } from '../context/cartStore'
import { useWishlistStore } from '../context/wishlistStore'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product._id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
    }
  }

  // Get the first image from images array or fallback to image field
  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.image || 'https://via.placeholder.com/300x400'

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`} 
          onClick={handleWishlistToggle}
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <i className={`${inWishlist ? 'fas' : 'far'} fa-heart`}></i>
        </button>
        <Link to={`/product/${product._id}`}>
          <img src={productImage} alt={product.name} />
        </Link>
      </div>
      <div className="product-info">
        <h5 className="product-title">{product.name}</h5>
        <p className="product-description">
          {product.description && product.description.length > 80 
            ? product.description.substring(0, 80) + '...' 
            : product.description || 'Quality product with premium features'}
        </p>
        <div className="product-pricing">
          <div className="product-price">
            <span className="price-current">₹{product.price.toFixed(0)}</span>
            {product.originalPrice && (
              <span className="price-original">₹{product.originalPrice.toFixed(0)}</span>
            )}
          </div>
        </div>
        <Link to={`/product/${product._id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
