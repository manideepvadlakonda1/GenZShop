import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { productService, categoryService, subcategoryService } from '../services/api'
import './ShopPage.css'

const ShopPage = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 })
  const [sortBy, setSortBy] = useState('popularity')
  const [expandedCategory, setExpandedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchSubcategories()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get('category') || ''
    console.log('Category from URL:', categoryParam)
    setSelectedCategory(categoryParam)
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, selectedSubcategory, priceRange, sortBy])

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getActive()
      setCategories(response.data.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }

  const fetchSubcategories = async () => {
    try {
      const response = await subcategoryService.getActive()
      setSubcategories(response.data.data || [])
    } catch (error) {
      console.error('Error fetching subcategories:', error)
      setSubcategories([])
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const filters = {}
      
      if (selectedCategory) {
        filters.category = selectedCategory
      }
      
      if (selectedSubcategory) {
        filters.subcategory = selectedSubcategory
      }
      
      if (priceRange.min > 0 || priceRange.max < 20000) {
        filters.minPrice = priceRange.min
        filters.maxPrice = priceRange.max
      }
      
      if (sortBy && sortBy !== 'popularity') {
        filters.sortBy = sortBy
      }
      
      console.log('Fetching products with filters:', filters)
      const response = await productService.getAll(filters)
      let fetchedProducts = response.data.products || []
      
      // Client-side price filtering if needed
      if (priceRange.min > 0 || priceRange.max < 20000) {
        fetchedProducts = fetchedProducts.filter(
          p => p.price >= priceRange.min && p.price <= priceRange.max
        )
      }
      
      console.log('Fetched products:', fetchedProducts.length)
      setProducts(fetchedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory('')
      setExpandedCategory('')
    } else {
      setSelectedCategory(categoryName)
      setExpandedCategory(categoryName)
    }
    setSelectedSubcategory('')
  }

  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedSubcategory(selectedSubcategory === subcategoryName ? '' : subcategoryName)
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setPriceRange(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }))
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedSubcategory('')
    setPriceRange({ min: 0, max: 20000 })
    setExpandedCategory('')
  }

  const getCategorySubcategories = (categoryName) => {
    return subcategories.filter(sub => sub.category === categoryName)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="shop-page">
      {/* Shop Content with Sidebar */}
      <section className="shop-content">
        <div className="container">
          <div className="shop-layout">
            {/* Mobile Filter Toggle */}
            <button className="mobile-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <i className="fas fa-bars"></i>
            </button>

            {/* Sidebar Filters */}
            <aside className={`shop-sidebar ${showFilters ? 'show' : ''}`}>
              <div className="sidebar-header">
                <button className="clear-filters" onClick={clearFilters}>
                  <i className="fas fa-times"></i> CLEAR ALL FILTERS
                </button>
                <button className="close-filters-mobile" onClick={() => setShowFilters(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Categories Filter */}
              <div className="filter-section">
                <h4>Categories</h4>
                <div className="filter-options">
                  {categories.map(category => (
                    <div key={category._id} className="category-filter">
                      <div 
                        className={`filter-option ${selectedCategory === category.name ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <span>{category.name}</span>
                        {getCategorySubcategories(category.name).length > 0 && (
                          <i className={`fas fa-chevron-${expandedCategory === category.name ? 'up' : 'down'}`}></i>
                        )}
                      </div>
                      
                      {/* Subcategories */}
                      {expandedCategory === category.name && getCategorySubcategories(category.name).length > 0 && (
                        <div className="subcategory-list">
                          {getCategorySubcategories(category.name).map(sub => (
                            <div
                              key={sub._id}
                              className={`subcategory-option ${selectedSubcategory === sub.name ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSubcategoryClick(sub.name)
                              }}
                            >
                              {sub.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-filter">
                  <div className="price-inputs">
                    <input
                      type="number"
                      name="min"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={handlePriceChange}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      name="max"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="price-range-display">
                    ₹{priceRange.min} - ₹{priceRange.max}
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory || selectedSubcategory || priceRange.min > 0 || priceRange.max < 20000) && (
                <div className="active-filters">
                  <h4>Active Filters</h4>
                  {selectedCategory && (
                    <span className="filter-tag">
                      {selectedCategory}
                      <i className="fas fa-times" onClick={() => setSelectedCategory('')}></i>
                    </span>
                  )}
                  {selectedSubcategory && (
                    <span className="filter-tag">
                      {selectedSubcategory}
                      <i className="fas fa-times" onClick={() => setSelectedSubcategory('')}></i>
                    </span>
                  )}
                  {(priceRange.min > 0 || priceRange.max < 20000) && (
                    <span className="filter-tag">
                      ₹{priceRange.min} - ₹{priceRange.max}
                      <i className="fas fa-times" onClick={() => setPriceRange({ min: 0, max: 20000 })}></i>
                    </span>
                  )}
                </div>
              )}
            </aside>

            {/* Products Area */}
            <div className="shop-main">
              <div className="products-header">
                <h2 className="results-title">
                  {selectedCategory || selectedSubcategory || 'All Products'} 
                  <span className="results-count">({products.length} items)</span>
                </h2>
                <div className="sort-controls">
                  <label>Sort by:</label>
                  <select value={sortBy} onChange={handleSortChange}>
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              <div className="products-grid">
                {loading ? (
                  <p className="loading-text">Loading products...</p>
                ) : products.length > 0 ? (
                  products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <p className="no-products">No products found matching your filters.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShopPage
