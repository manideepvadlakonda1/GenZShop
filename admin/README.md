# Admin Panel

Admin dashboard for managing the GenzShop e-commerce platform.

## Features

- **Authentication**: Secure login with email/password
- **Product Management**: Full CRUD operations for products
  - Add/Edit/Delete products
  - Upload multiple images
  - Set prices, stock, categories
  - Add color variants
  - Mark bestsellers
- **Analytics Dashboard**: View key metrics (revenue, orders, customers)
- **Recent Orders**: Monitor latest transactions

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Make sure the backend API is running on `http://localhost:8000`

## Default Credentials

- **Email**: admin@gmail.com
- **Password**: 123456

## Tech Stack

- React 19
- Vite
- React Router
- Zustand (state management)
- Axios (API client)

## Product Management

Products added through the admin panel are immediately available in the frontend shop. The system supports:

- Multiple product images (max 4)
- Color variants with visual previews
- Sale pricing and stock management
- Category and fabric classification
- Collection organization
- Bestseller highlighting

All product data is stored in MongoDB and synced across the frontend and admin panel in real-time.

