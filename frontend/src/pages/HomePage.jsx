import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { productService, categoryService } from '../services/api'
import './HomePage.css'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      console.log('Fetching active categories...')
      const response = await categoryService.getActive()
      console.log('Categories response:', response.data)
      const categoryData = response.data.data || []
      console.log('Active categories:', categoryData)
      setCategories(categoryData)
    } catch (error) {
      console.error('Error fetching categories:', error)
      console.error('Error details:', error.response?.data)
    }
  }

  const fetchProducts = async () => {
    try {
      // Fetch bestseller products or all products with limit
      const response = await productService.getAll({ limit: 8, sortBy: 'newest' })
      const fetchedProducts = response.data.products || []
      
      // Filter bestsellers if marked, otherwise show all
      const bestsellers = fetchedProducts.filter(p => p.isBestseller)
      setProducts(bestsellers.length > 0 ? bestsellers : fetchedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text-center">
              <h1 className="hero-title">Discover Your Perfect Style</h1>
              <p className="hero-description">
                Premium fashion for men, women, and kids. Shop the latest trends and timeless classics from our exclusive collection.
              </p>
              <Link to="/shop" className="btn btn-primary hero-btn">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="shop-category-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop By Category</h2>
          </div>
          
          <div className="category-grid">
            {/* Default All Products Category */}
            <Link 
              to="/shop" 
              className="category-card"
            >
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop" alt="All Products" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="category-overlay">
                <h3>All Products</h3>
              </div>
            </Link>

            {categories.length > 0 ? (
              categories.map(category => (
                <Link 
                  key={category._id} 
                  to={`/categories/${encodeURIComponent(category.name)}`} 
                  className="category-card"
                >
                  {category.image ? (
                    <img src={category.image} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src="https://via.placeholder.com/400x300?text=Category" alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                  </div>
                </Link>
              ))
            ) : null}
          </div>
        </div>
      </section>

      {/* Bestseller Products */}
      <section className="bestseller-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Bestsellers</h2>
            <p className="section-subtitle">Discover our most loved collections</p>
          </div>
          
          <div className="products-grid">
            {loading ? (
              <p>Loading products...</p>
            ) : (
              products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
