import { useLocation } from 'react-router-dom'
import './header.css'

const titleMap = {
  '/': 'Analytics',
  '/products': 'Product Management',
  '/categories': 'Category & Collections',
  '/orders': 'Order Management',
  '/customers': 'Customer Management',
  '/offers': 'Offer Banners',
  '/faq': 'FAQ Management',
  '/payments': 'Payments',
  '/shipping': 'Shipping',
}

const Header = () => {
  const { pathname } = useLocation()
  const title = titleMap[pathname] || 'Admin'
  return (
    <header className="header">
      <h1 className="page-title">{title}</h1>
      <div className="header-actions">
        <button className="icon-btn" title="Notifications">
          <i className="fa-regular fa-bell" />
        </button>
        <div className="admin-info">
          <div className="avatar">A</div>
          <div className="meta">
            <div className="name">Admin</div>
            <div className="email">admin@genzshop.com</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
