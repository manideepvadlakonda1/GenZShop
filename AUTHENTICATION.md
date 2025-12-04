# Authentication Guide

## Overview
GenZshop now has a complete authentication system with email/password registration and login, plus Google Sign-In integration.

## Features Implemented

### 1. User Registration
- Navigate to `/register` or click "Sign Up" from the login page
- Fill in: Full Name, Email, Password, Confirm Password
- After successful registration, you are **automatically logged in** and redirected to the home page
- Your credentials are stored securely in MongoDB Atlas

### 2. User Login
- Navigate to `/login` or click the profile icon when not logged in
- Enter your registered email and password
- Upon successful login, you are redirected to the home page
- Your authentication token is stored in localStorage for persistent sessions

### 3. Profile Icon Behavior
- **Not logged in**: Profile icon redirects to `/login`
- **Logged in**: Profile icon redirects to `/profile` (to be created)
- The icon provides a visual indicator of authentication status

### 4. Google Sign-In (Placeholder)
- Both Login and Register pages have a "Sign in with Google" button
- Currently shows a placeholder alert
- Ready for integration with Google OAuth or Firebase Authentication

## Authentication Flow

```
Registration Flow:
1. User fills registration form
2. POST request to backend /auth/register
3. User account created in MongoDB
4. Automatically calls POST /auth/login with same credentials
5. JWT token returned and stored in authStore (localStorage)
6. User redirected to home page (authenticated)

Login Flow:
1. User enters email and password
2. POST request to backend /auth/login
3. Backend validates credentials against MongoDB
4. JWT token returned and stored
5. User object stored in Zustand authStore
6. Redirect to home page

Google OAuth Flow (Future):
1. User clicks "Sign in with Google"
2. Google OAuth popup opens
3. User authorizes the app
4. Backend validates Google token
5. Creates user if new, or finds existing user
6. Returns JWT token
7. User logged in and redirected
```

## Technical Implementation

### Frontend
- **Pages**: `LoginPage.jsx`, `RegisterPage.jsx`
- **State**: Zustand `authStore` with localStorage persistence
- **API**: `authService.login()`, `authService.register()`
- **Routing**: React Router with protected routes (future)

### Backend (PHP)
- **Endpoints**: 
  - `POST /auth/register` - Create new user
  - `POST /auth/login` - Authenticate user
  - `POST /auth/google` (future) - Google OAuth
- **Database**: MongoDB Atlas - `users` collection
- **Security**: JWT tokens, password hashing

## Testing the Authentication

1. **Start the servers**:
   ```bash
   # Backend (PHP)
   cd backend
   php -S localhost:8080
   
   # Frontend (React)
   cd frontend
   npm run dev
   ```

2. **Test Registration**:
   - Go to http://localhost:3000/register
   - Fill in all fields with valid data
   - Click "Create Account"
   - You should be automatically logged in and redirected to home

3. **Test Login with Registered Credentials**:
   - Logout (if needed - add logout button later)
   - Go to http://localhost:3000/login
   - Enter the email and password you just registered with
   - Click "Login"
   - You should be logged in and redirected to home

4. **Test Profile Icon**:
   - When logged out: Click profile icon → redirects to /login
   - When logged in: Click profile icon → redirects to /profile

## Next Steps for Google Sign-In

To implement full Google OAuth:

1. **Get Google OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:3000`

2. **Install Google OAuth Library**:
   ```bash
   npm install @react-oauth/google
   ```

3. **Wrap App with Provider**:
   ```jsx
   import { GoogleOAuthProvider } from '@react-oauth/google';
   
   <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
     <App />
   </GoogleOAuthProvider>
   ```

4. **Update handleGoogleLogin functions** in LoginPage.jsx and RegisterPage.jsx

5. **Backend Google Auth Endpoint**:
   - Validate Google token with Google's API
   - Extract user info (email, name)
   - Create user if new, or find existing
   - Return JWT token

## Security Notes

- Passwords are hashed before storage (backend implementation)
- JWT tokens are used for authentication
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Always use HTTPS in production
- Implement token refresh mechanism for production
- Add password strength requirements
- Consider rate limiting on auth endpoints

## UI/UX Features

- Clean modern design with Google-style forms
- Form validation with error messages
- Loading states during authentication
- Password confirmation on registration
- Automatic login after registration
- Persistent sessions with localStorage
- Responsive design for all devices
