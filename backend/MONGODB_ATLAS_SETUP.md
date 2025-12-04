# MongoDB Atlas Setup Guide

## Step-by-Step Instructions

### 1. Create MongoDB Atlas Account

1. Visit https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email or Google account
3. Complete the registration

### 2. Create a Free Cluster

1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (no credit card required)
3. Select cloud provider and region:
   - Provider: AWS, Google Cloud, or Azure (any is fine)
   - Region: Choose closest to you for better performance
4. Cluster Name: Leave default or name it "GenZshop"
5. Click **"Create Cluster"** (takes 3-5 minutes)

### 3. Configure Database User

1. While cluster is creating, you'll see a security quickstart
2. **Authentication Method**: Choose "Username and Password"
3. Create credentials:
   - Username: `genzshop` (or your choice)
   - Password: Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT**: Copy and save these credentials!
4. Click "Create User"

### 4. Configure Network Access

1. In the security quickstart, or go to "Network Access" tab
2. Click "Add IP Address"
3. **For Development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This adds 0.0.0.0/0 which allows all IPs
   - ⚠️ For production, restrict to specific IPs
4. Click "Confirm"

### 5. Get Your Connection String

1. Go to "Database" tab
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select:
   - Driver: **PHP**
   - Version: **1.13 or later**
5. Copy the connection string shown

Example connection string:
```
mongodb+srv://genzshop:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6. Update Your .env File

1. Open `backend\.env` file
2. Replace the `MONGODB_URI` with your Atlas connection string
3. Replace `<password>` with your actual password
4. Update other placeholders if needed

**Example:**
```env
MONGODB_URI=mongodb+srv://genzshop:MySecureP@ss123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
DB_NAME=genzshop
JWT_SECRET=your-random-secret-key-change-this-in-production
CORS_ORIGIN=http://localhost:3000
```

### 7. Test Connection

Run the seed script to test connection and add sample data:
```powershell
cd backend
php seed.php
```

If successful, you'll see:
```
Successfully inserted 8 products!
Product IDs:
- 674c...
```

### 8. View Data in MongoDB Atlas

1. Go to your Atlas dashboard
2. Click "Browse Collections"
3. You should see:
   - Database: `genzshop`
   - Collections: `products` (and later `users`, `orders`)

## Common Issues & Solutions

### Issue: "Authentication failed"
**Solution**: Double-check your username and password in the connection string. Make sure special characters in password are URL-encoded.

### Issue: "Connection timeout"
**Solution**: 
- Check Network Access settings - ensure 0.0.0.0/0 is whitelisted
- Check your internet connection
- Try a different cloud region

### Issue: "Database name not found"
**Solution**: The database will be created automatically when you insert the first document. Just run `seed.php`.

### Password Contains Special Characters
If your password has special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `:` → `%3A`

Example:
- Original password: `My@Pass#123`
- Encoded password: `My%40Pass%23123`

## Security Best Practices

### For Production:

1. **IP Whitelist**: Don't use 0.0.0.0/0
   - Add only your server's IP address

2. **Strong Password**: Use a complex password
   - Mix of uppercase, lowercase, numbers, symbols
   - Minimum 16 characters

3. **JWT Secret**: Change the default JWT_SECRET
   - Generate a random string: Use a password generator
   - Never commit to Git

4. **Environment Variables**: Never commit .env file
   - Already added to .gitignore
   - Use environment variables on production server

5. **Database User Privileges**: Use least privilege principle
   - Create separate users for different operations
   - Read-only user for analytics
   - Read-write user for application

## MongoDB Atlas Features

### Free Tier (M0) Includes:
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Shared vCPU
- ✅ No credit card required
- ✅ Perfect for development and small projects

### Useful Atlas Features:
- **MongoDB Compass**: GUI tool to view/edit data
- **Charts**: Create visualizations of your data
- **Triggers**: Run functions on data changes
- **Backup**: Automated backups (paid tiers)
- **Monitoring**: Performance metrics and alerts

## Next Steps

1. ✅ Connection string configured
2. ✅ Sample data seeded
3. 🔄 Start backend server: `php -S localhost:8080 -t api`
4. 🔄 Start frontend: `npm run dev`
5. 🔄 Test the application

## Support

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB University: https://university.mongodb.com/ (Free courses)
- Community Forums: https://www.mongodb.com/community/forums/

Happy Coding! 🚀
