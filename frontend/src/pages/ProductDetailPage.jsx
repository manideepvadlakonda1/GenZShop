import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import { useCartStore } from '../context/cartStore'
import { useWishlistStore } from '../context/wishlistStore'
import './ProductDetailPage.css'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    if (product) {
      setInWishlist(isInWishlist(product._id))
    }
  }, [product, isInWishlist])

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      console.log('Fetching product with ID:', id)
      const response = await productService.getById(id)
      console.log('Product response:', response)
      console.log('Response data:', response.data)
      
      // Handle different response structures
      if (response.data) {
        const productData = response.data.product || response.data.data || response.data
        console.log('Setting product:', productData)
        setProduct(productData)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      console.error('Error details:', error.response)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity })
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity })
      navigate('/checkout')
    }
  }

  if (loading) return (
    <div className="product-detail-page">
      <div className="container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading product details...</p>
        </div>
      </div>
    </div>
  )
  
  if (!product) return (
    <div className="product-detail-page">
      <div className="product-detail-navbar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
      <div className="container">
        <div className="error-state">
          <i className="fas fa-exclamation-circle"></i>
          <h3>Product Not Found</h3>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Browse Products
          </button>
        </div>
      </div>
    </div>
  )

  // Get all images or fallback to single image
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://via.placeholder.com/500']

  return (
    <div className="product-detail-page">
      <div className="product-detail-navbar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
      <div className="container">
        <div className="product-detail">
          <div className="product-images">
            <div className="main-image-container">
              <img src={productImages[selectedImageIndex]} alt={product.name} className="main-image" />
            </div>
            {productImages.length > 1 && (
              <div className="thumbnail-images">
                {productImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="product-details">
            <h1>{product.name}</h1>
            <p className="product-category">{product.category}</p>
            
            <div className="product-rating">
              <span>⭐⭐⭐⭐⭐</span>
              <span>(10 Reviews)</span>
            </div>
            
            <div className="product-price-detail">
              {product.originalPrice && (
                <span className="price-old">₹{product.originalPrice.toFixed(2)}</span>
              )}
              <span className="price-new">₹{product.price.toFixed(2)}</span>
            </div>
            
            <p className="product-description">{product.description}</p>
            
            {product.colors && product.colors.length > 0 && (
              <div className="product-colors-select">
                <h4>Select Color:</h4>
                <div className="color-options">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-option ${selectedColor === index ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(index)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="quantity-selector">
              <h4>Quantity:</h4>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            
            <div className="product-actions">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart"></i>
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="btn btn-buy-now" onClick={handleBuyNow}>
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
              <button 
                className={`btn btn-wishlist ${inWishlist ? 'active' : ''}`}
                onClick={() => {
                  if (inWishlist) {
                    removeFromWishlist(product._id)
                  } else {
                    addToWishlist(product)
                  }
                  setInWishlist(!inWishlist)
                }}
                title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <i className={`${inWishlist ? 'fas' : 'far'} fa-heart`}></i>
              </button>
            </div>
            
            {addedToCart && (
              <div className="cart-notification">
                <i className="fas fa-check-circle"></i>
                Product added to cart! <a href="/cart">View Cart</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
