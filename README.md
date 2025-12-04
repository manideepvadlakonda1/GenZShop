# GenZshop - Full Stack E-Commerce Platform

A modern e-commerce website built with React+Vite frontend, PHP backend, and MongoDB database.

## 📁 Project Structure

```
NewWebsite/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # State management (Zustand)
│   │   └── assets/          # Images, fonts, etc.
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # PHP REST API
│   ├── api/                 # API routes
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── models/              # Data models
│   ├── middleware/          # Auth middleware
│   ├── composer.json
│   └── .env
│
├── index.html              # Original static homepage
├── shop.html               # Original static shop page
└── styles.css              # Original styles
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PHP (v8.0 or higher)
- MongoDB (v5.0 or higher)
- Composer (PHP package manager)

### 1. Setup MongoDB Atlas (Cloud Database)

**Create MongoDB Atlas Account:**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account (no credit card required)
3. Create a new cluster (choose Free Tier - M0)
4. Wait for cluster to be created (~3-5 minutes)

**Configure Database Access:**
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose authentication method: Username/Password
4. Create username and password (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

**Configure Network Access:**
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, use specific IP addresses
4. Click "Confirm"

**Get Connection String:**
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "PHP" and version "1.13 or later"
5. Copy the connection string (looks like: `mongodb+srv://...`)

### 2. Setup Backend (PHP + MongoDB)

```powershell
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Update .env file with your MongoDB Atlas connection
# Edit backend\.env and replace the placeholders:
# 1. Replace <username> with your MongoDB Atlas username
# 2. Replace <password> with your MongoDB Atlas password
# 3. Replace <cluster-url> with your cluster URL (e.g., cluster0.xxxxx.mongodb.net)
# 
# Example:
# MONGODB_URI=mongodb+srv://genzshop:MyP@ssw0rd@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
# DB_NAME=genzshop
# JWT_SECRET=generate-a-random-secret-key-here

# Seed sample data to MongoDB
php seed.php

# Start PHP built-in server
php -S localhost:8080 -t api
```

The backend API will run on `http://localhost:8080`

### 3. Setup Frontend (React + Vite)

```powershell
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install npm dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth)

## 📦 Features Implemented

### Frontend (React)
✅ Home page with hero, categories, and featured products
✅ Shop page with filters and sorting
✅ Product detail page
✅ Shopping cart functionality
✅ Checkout process
✅ User authentication (login/register)
✅ Responsive design
✅ State management with Zustand
✅ React Router for navigation

### Backend (PHP)
✅ RESTful API architecture
✅ MongoDB database integration
✅ JWT authentication
✅ Product CRUD operations
✅ User registration and login
✅ Order management
✅ CORS handling
✅ Error handling

## 🎯 Next Steps

### Immediate Actions:
1. **Install Dependencies:**
   ```powershell
   cd backend
   composer install
   
   cd ../frontend
   npm install
   ```

2. **Start MongoDB:**
   - Open MongoDB Compass and connect to `mongodb://localhost:27017`
   - Or start via command line

3. **Seed Database:**
   ```powershell
   cd backend
   php seed.php
   ```

4. **Start Both Servers:**
   - Terminal 1: `cd backend; php -S localhost:8080 -t api`
   - Terminal 2: `cd frontend; npm run dev`

5. **Test the Application:**
   - Open browser: `http://localhost:3000`
   - Register a new account
   - Browse products
   - Add items to cart
   - Complete checkout

### Future Enhancements:
- [ ] Admin dashboard for managing products
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] Product recommendations
- [ ] User profile page
- [ ] Order history
- [ ] Image upload for products
- [ ] Inventory management
- [ ] Discount codes/coupons
- [ ] Multi-currency support
- [ ] Social media login

## 🛠️ Technologies Used

**Frontend:**
- React 18
- Vite
- React Router
- Zustand (State Management)
- Axios
- CSS3

**Backend:**
- PHP 8+
- MongoDB
- JWT Authentication
- Composer

## 📝 Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=GenZshop
```

**Backend (.env):**
```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=genzshop
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

## 🐛 Troubleshooting

### MongoDB Connection Issues:
- Ensure MongoDB service is running
- Check connection string in backend/.env
- Verify MongoDB is listening on port 27017

### CORS Errors:
- Verify CORS_ORIGIN in backend/.env matches frontend URL
- Check browser console for specific CORS errors

### API Not Working:
- Ensure PHP server is running on port 8080
- Check backend/api/index.php is accessible
- Verify composer dependencies are installed

## 📞 Support

For issues or questions, check:
- Backend API: `http://localhost:8080/api/products`
- MongoDB Compass for database inspection
- Browser console for frontend errors
- PHP error logs for backend issues

Happy Coding! 🚀
