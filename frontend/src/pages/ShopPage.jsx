import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { productService, categoryService } from '../services/api'
import './ShopPage.css'

const ShopPage = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get('category') || ''
    console.log('Category from URL:', categoryParam)
    setSelectedCategory(categoryParam)
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy])

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getActive()
      setCategories(response.data.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      // Only filter by category
      if (selectedCategory) {
        filters.category = selectedCategory
      }
      
      if (sortBy && sortBy !== 'popularity') {
        filters.sortBy = sortBy
      }
      
      console.log('Fetching products with filters:', filters)
      const response = await productService.getAll(filters)
      const fetchedProducts = response.data.products || []
      console.log('Fetched products:', fetchedProducts.length)
      setProducts(fetchedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (categoryName) => {
    const urlCategoryName = categoryName || ''
    setSelectedCategory(urlCategoryName)
    if (urlCategoryName) {
      const newUrl = `/shop?category=${encodeURIComponent(urlCategoryName)}`
      window.history.pushState({}, '', newUrl)
    } else {
      window.history.pushState({}, '', '/shop')
    }
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="shop-page">
      {/* Shop Header */}
      <section className="shop-header">
        <div className="container">
          <div className="shop-header-content">
            <h2 className="page-title">Shop by Category</h2>
            <nav className="breadcrumb">
              <a href="/">Home</a>
              <i className="fas fa-chevron-right"></i>
              <span>Shop</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Shop Categories */}
      <section className="shop-categories">
        <div className="container">
          <h3 style={{ marginBottom: '20px', color: '#252B42' }}>Filter by Category</h3>
          <div className="categories-grid">
            {/* All Products */}
            <div 
              className={`category-card ${!selectedCategory ? 'active' : ''}`}
              onClick={() => handleCategoryClick('')}
              style={{ cursor: 'pointer' }}
            >
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop" alt="All Products" />
              <div className="category-overlay">
                <h5>ALL</h5>
              </div>
            </div>

            {/* Dynamic Categories from Database */}
            {categories.map(category => (
              <div 
                key={category._id}
                className={`category-card ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.name)}
                style={{ cursor: 'pointer' }}
              >
                {category.image ? (
                  <img src={category.image} alt={category.name} />
                ) : (
                  <img src="https://via.placeholder.com/400x400?text=Category" alt={category.name} />
                )}
                <div className="category-overlay">
                  <h5>{category.name.toUpperCase()}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="shop-products">
        <div className="container">
          <div className="section-header">
            <h2>{selectedCategory ? selectedCategory : 'All Products'}</h2>
            <p>Explore our collection</p>
          </div>
          <div className="products-grid">
            {loading ? (
              <p className="loading-text">Loading products...</p>
            ) : products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="no-products">No products found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShopPage
