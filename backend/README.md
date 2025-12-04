# GenZshop E-Commerce Backend

PHP REST API for GenZshop e-commerce platform.

## API Endpoints

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- GET /api/products/category/:category - Get products by category
- GET /api/products/search?q=query - Search products
- POST /api/products - Create product (admin)

### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (requires auth)

### Orders
- POST /api/orders - Create order (requires auth)
- GET /api/orders - Get user orders (requires auth)
- GET /api/orders/:id - Get order by ID (requires auth)
