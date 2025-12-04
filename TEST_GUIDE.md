# Quick Test Guide - Authentication System

## What's Been Implemented

✅ **Profile Icon Redirect**
- When NOT logged in: Profile icon → `/login`
- When logged in: Profile icon → `/profile`

✅ **Registration Flow**
- New users can register with name, email, password
- **Automatically logs in** after successful registration
- Credentials stored in MongoDB Atlas
- User redirected to home page after registration

✅ **Login with Registered Credentials**
- Users can login with the email and password they registered with
- JWT token stored in localStorage
- User data stored in Zustand authStore
- Persistent sessions across page refreshes

✅ **Google Sign-In UI**
- Both Login and Register pages have Google sign-in button
- Currently shows placeholder alert (ready for OAuth integration)
- Professional UI with divider ("OR" separator)

✅ **Modern UI Design**
- Clean, professional forms with labels
- Google-style design with proper spacing
- Error message display
- Form validation
- Responsive design

## How to Test

### 1. Start the Application

**Terminal 1 - Backend:**
```powershell
cd "c:\Users\Manideep\Projects VS\NewWebsite\backend"
php -S localhost:8080
```

**Terminal 2 - Frontend:**
```powershell
cd "c:\Users\Manideep\Projects VS\NewWebsite\frontend"
npm run dev
```

### 2. Test Profile Icon (Not Logged In)

1. Open http://localhost:3000
2. Click the **profile icon** (user icon in top right)
3. ✅ Should redirect to `/login` page

### 3. Test Registration + Auto-Login

1. From login page, click **"Sign Up"** link
2. Fill in the registration form:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
3. Click **"Create Account"**
4. ✅ Should automatically log you in
5. ✅ Should redirect to home page
6. ✅ Profile icon should now work (links to /profile)

### 4. Test Login with Same Credentials

1. Open a new incognito/private window
2. Go to http://localhost:3000
3. Click profile icon → redirects to `/login`
4. Enter:
   - Email: "test@example.com"
   - Password: "password123"
5. Click **"Login"**
6. ✅ Should log you in successfully
7. ✅ Should redirect to home page
8. ✅ Should persist across page refreshes

### 5. Test Google Sign-In Button

1. Go to `/login` or `/register`
2. Click **"Sign in with Google"** or **"Sign up with Google"**
3. ✅ Should show alert: "Google Sign-In will be integrated with Firebase or Google OAuth"

## Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Click profile icon (logged out) | Redirect to `/login` |
| Click profile icon (logged in) | Redirect to `/profile` |
| Register new account | Auto-login + redirect to home |
| Login with registered email/password | Success + redirect to home |
| Wrong password | Error message displayed |
| Duplicate email registration | Error: "User already exists" |
| Password mismatch (registration) | Error: "Passwords do not match" |
| Refresh page (logged in) | Stay logged in (persistent session) |

## Troubleshooting

### Backend Not Running
- Make sure PHP server is running on port 8080
- Check MongoDB Atlas connection in `.env` file
- Verify `.env` has all required variables

### Frontend Not Running
- Make sure Vite dev server is running on port 3000
- Check `npm install` was run in frontend directory
- Verify axios is installed

### Login Not Working
- Check browser console for errors
- Verify backend API is responding (http://localhost:8080/auth/login)
- Check MongoDB Atlas connection
- Ensure user was created during registration

### Registration Not Auto-Login
- Check browser console for errors
- Verify both register and login API endpoints are working
- Check authStore is properly storing user data

## Next Steps (Optional)

### To Implement Real Google Sign-In:

1. **Get Google OAuth credentials from Google Cloud Console**
2. **Install library**: `npm install @react-oauth/google`
3. **Replace placeholder functions** with actual OAuth implementation
4. **Add backend Google auth endpoint** to validate tokens

### To Add Profile Page:

1. Create `frontend/src/pages/ProfilePage.jsx`
2. Show user info (name, email)
3. Add logout button
4. Add order history
5. Add account settings

### To Add Logout:

Add logout button in Navbar or ProfilePage:
```jsx
const handleLogout = () => {
  logout(); // From authStore
  navigate('/');
}
```

## Files Modified

1. **LoginPage.jsx** - Added Google button, improved UI, form groups
2. **LoginPage.css** - Modern styling, Google button, divider
3. **RegisterPage.jsx** - Auto-login after registration, Google button, improved UI
4. **RegisterPage.css** - Matching modern styling
5. **Navbar.jsx** - Already configured for auth-based routing
6. **AUTHENTICATION.md** - Complete documentation

All changes are complete and ready to test! 🎉
