import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { categoryService, subcategoryService, productService } from '../services/api'
import ProductCard from '../components/ProductCard'
import './SubcategoriesPage.css'

const SubcategoriesPage = () => {
  const { categoryName } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [subcategories, setSubcategories] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    fetchCategoryAndSubcategories()
  }, [categoryName])

  const fetchCategoryAndSubcategories = async () => {
    try {
      setLoading(true)
      
      // Fetch all categories to find the matching one
      const categoriesResponse = await categoryService.getAll()
      const categories = categoriesResponse.data.data || []
      const matchedCategory = categories.find(cat => cat.name === decodeURIComponent(categoryName))
      
      if (!matchedCategory) {
        console.error('Category not found')
        setLoading(false)
        return
      }
      
      setCategory(matchedCategory)
      
      // Fetch subcategories for this category
      const subcategoriesResponse = await subcategoryService.getByCategory(matchedCategory._id)
      const subs = subcategoriesResponse.data.data || []
      setSubcategories(subs.filter(sub => sub.active))
      
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubcategoryClick = async (subcategory) => {
    setSelectedSubcategory(subcategory)
    setLoadingProducts(true)
    
    try {
      const response = await productService.getAll({ subcategory: subcategory.name })
      setProducts(response.data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleBackToSubcategories = () => {
    setSelectedSubcategory(null)
    setProducts([])
  }

  if (loading) {
    return (
      <div className="subcategories-page">
        <div className="loading">Loading subcategories...</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="subcategories-page">
        <div className="error">Category not found</div>
      </div>
    )
  }

  return (
    <div className="subcategories-page">
      <div className="subcategories-header">
        <h1>{category.name}</h1>
        <p className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span> / 
          <span className="current"> {category.name}</span>
        </p>
      </div>

      {/* Always show subcategories */}
      {subcategories.length === 0 ? (
        <div className="empty-state">
          <i className="fa-solid fa-tags" />
          <p>No subcategories available yet</p>
          <button onClick={() => navigate('/shop')}>Browse All Products</button>
        </div>
      ) : (
        <div className="subcategories-grid">
          {subcategories.map(subcategory => (
            <div 
              key={subcategory._id} 
              className={`subcategory-card ${selectedSubcategory?._id === subcategory._id ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick(subcategory)}
            >
              {subcategory.image && (
                <div className="subcategory-image">
                  <img src={subcategory.image} alt={subcategory.name} />
                </div>
              )}
              <div className="subcategory-info">
                <h3>{subcategory.name}</h3>
                <p>Explore Collection</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show products below subcategories when one is selected */}
      {selectedSubcategory && (
        <div className="products-section">
          <div className="products-header">
            <h2>{selectedSubcategory.name} Products</h2>
          </div>

          {loadingProducts ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-box-open" />
              <p>No products found in this subcategory</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SubcategoriesPage
