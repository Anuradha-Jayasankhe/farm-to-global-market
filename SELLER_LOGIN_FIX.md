# 🔐 Accessories Seller Login - Complete Fix Guide

**Issue:** Cannot login as accessories seller  
**Status:** ✅ **FIXED**  
**Date:** November 25, 2025

---

## 🐛 Root Cause

The accessories seller test account (`seller@test.com`) was **not created in the database seed script**. The seed file only had 5 test accounts (admin, 2 farmers, 1 buyer, 1 processor) but was missing the accessories seller account.

---

## ✅ What Was Fixed

### 1. **Updated Seed Script** (`server/src/scripts/seed.ts`)

Added the accessories seller account:

```typescript
{
  email: 'seller@test.com',
  password: 'Seller@123',
  firstName: 'David',
  lastName: 'Seller',
  phone: '+1234567895',
  role: 'accessories_seller',
  isEmailVerified: true,
  isActive: true,
  location: {
    address: '555 Commerce Drive',
    city: 'Dallas',
    state: 'TX',
    country: 'USA',
  },
  subscription: {
    plan: 'pro',
    startDate: new Date(),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
}
```

### 2. **Verified Complete Authentication Chain**

✅ Backend User Model - Has `accessories_seller` role  
✅ Auth Controller - Accepts any valid role  
✅ Login Endpoint - Works for all roles  
✅ Dashboard Router - Routes to `/dashboard/accessories-seller`  
✅ Authorization - Allows product creation  

---

## 🚀 How to Apply the Fix

### **Option 1: Run the Fix Script (EASIEST)**

**Windows:**
```bash
cd d:\projects\farm-to-global-market
.\fix-seller-login.bat
```

**Mac/Linux:**
```bash
cd /path/to/farm-to-global-market
chmod +x fix-seller-login.sh
./fix-seller-login.sh
```

### **Option 2: Manual Steps**

#### Step 1: Run Database Seed
```bash
cd server
npm run seed
```

**Expected Output:**
```
🌱 Seeding database...
✅ Cleared existing data
✅ Created 6 users (including accessories seller)
✅ Created 5 products
✅ Database seeded successfully!
```

#### Step 2: Restart Backend Server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

#### Step 3: Test Login
1. Go to `http://localhost:3000/login`
2. Enter credentials:
   - **Email:** `seller@test.com`
   - **Password:** `Seller@123`
3. Click "Login"
4. Should redirect to `/dashboard/accessories-seller`

---

## 🧪 Verification Steps

### 1. Check Database
```bash
# Connect to MongoDB (if using MongoDB Compass)
# Look for user with email: seller@test.com
# Verify role: accessories_seller
```

### 2. Check Server Logs
After running seed, you should see:
```
✓ User created: seller@test.com (accessories_seller)
```

### 3. Test Login API
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@test.com",
    "password": "Seller@123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "jwt_token_here...",
  "data": {
    "user": {
      "id": "...",
      "email": "seller@test.com",
      "firstName": "David",
      "lastName": "Seller",
      "role": "accessories_seller",
      "isActive": true
    }
  }
}
```

### 4. Test Frontend Login
- Navigate to login page
- Use credentials
- Check browser console for errors
- Verify redirect to accessories seller dashboard

---

## 🔍 Troubleshooting

### Issue 1: "Invalid credentials" error

**Possible Causes:**
- Database not seeded
- Wrong password
- Account doesn't exist

**Solution:**
```bash
cd server
npm run seed  # Re-seed the database
```

### Issue 2: "User account is deactivated"

**Cause:** `isActive` flag is false

**Solution:**
Check the seed script has `isActive: true`

### Issue 3: Login succeeds but redirects to wrong dashboard

**Possible Causes:**
- Role mismatch in database
- Dashboard routing issue

**Solution:**
```bash
# Check user role in database
# Should be: accessories_seller (not seller or accessoriesSeller)
```

### Issue 4: "Cannot find dashboard page"

**Cause:** Dashboard file missing

**Verify:**
```bash
# Check file exists
ls client/src/app/dashboard/accessories-seller/page.tsx
```

### Issue 5: Network error during login

**Solutions:**
1. Check backend is running: `http://localhost:5000/health`
2. Check CORS settings in server
3. Clear browser cache
4. Check rate limiting (should be disabled in dev)

---

## 📊 Complete Test Account List

After seeding, you should have **6 test accounts:**

| # | Email | Password | Role | Status |
|---|-------|----------|------|--------|
| 1 | admin@farm2global.com | Admin@123 | admin | ✅ Active |
| 2 | farmer@test.com | Farmer@123 | farmer | ✅ Active |
| 3 | farmer2@test.com | Farmer@123 | farmer | ✅ Active |
| 4 | buyer@test.com | Buyer@123 | buyer | ✅ Active |
| 5 | processor@test.com | Processor@123 | processor | ✅ Active |
| 6 | **seller@test.com** | **Seller@123** | **accessories_seller** | ✅ **Active** |

---

## 🔐 Complete Authentication Flow

### 1. User enters credentials
```
Email: seller@test.com
Password: Seller@123
```

### 2. Frontend sends POST request
```
POST /api/v1/auth/login
{
  "email": "seller@test.com",
  "password": "Seller@123"
}
```

### 3. Backend validates
- ✅ Finds user in database
- ✅ Verifies password hash
- ✅ Checks `isActive: true`
- ✅ Checks `isEmailVerified: true`
- ✅ Generates JWT token

### 4. Backend responds
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "user": {
      "role": "accessories_seller",
      ...
    }
  }
}
```

### 5. Frontend stores token
- Saves JWT to localStorage
- Updates AuthContext user state
- Marks as authenticated

### 6. Dashboard router checks role
```typescript
case 'accessories_seller':
  router.push('/dashboard/accessories-seller');
  break;
```

### 7. Dashboard loads
- Accessories seller dashboard renders
- User sees their dashboard with:
  - Overview stats
  - Product management
  - Order tracking
  - Analytics

---

## 📝 Database Schema Verification

### User Document Structure
```javascript
{
  _id: ObjectId("..."),
  email: "seller@test.com",
  password: "$2a$10$...", // hashed
  firstName: "David",
  lastName: "Seller",
  phone: "+1234567895",
  role: "accessories_seller", // MUST match exactly
  isEmailVerified: true,
  isActive: true,
  location: {
    address: "555 Commerce Drive",
    city: "Dallas",
    state: "TX",
    country: "USA"
  },
  subscription: {
    plan: "pro",
    startDate: ISODate("2025-11-25..."),
    endDate: ISODate("2026-11-25..."),
    isActive: true
  },
  createdAt: ISODate("2025-11-25..."),
  updatedAt: ISODate("2025-11-25...")
}
```

---

## 🎯 Testing Checklist

After applying the fix, test these scenarios:

### Login Tests
- [ ] Can login with seller@test.com
- [ ] Correct password accepted
- [ ] Wrong password rejected
- [ ] JWT token generated
- [ ] Token stored in localStorage
- [ ] User object in AuthContext

### Dashboard Tests
- [ ] Redirects to /dashboard/accessories-seller
- [ ] Dashboard renders without errors
- [ ] All 4 tabs visible
- [ ] Stats cards display
- [ ] Can navigate between tabs

### Authorization Tests
- [ ] Can access /sell-accessories page
- [ ] Can create products
- [ ] Can view own products
- [ ] Cannot access admin routes
- [ ] Cannot access farmer routes

### Logout Tests
- [ ] Can logout successfully
- [ ] Token removed from localStorage
- [ ] Redirected to login page
- [ ] Cannot access dashboard after logout

---

## 🚨 Common Errors & Solutions

### Error: "MongoServerError: E11000 duplicate key error"

**Meaning:** User already exists in database

**Solution:**
```bash
# Delete existing user first
cd server
npm run seed  # This clears all data and re-seeds
```

### Error: "Cannot read property 'role' of null"

**Meaning:** User object not loaded in AuthContext

**Solution:**
```javascript
// Check localStorage
console.log(localStorage.getItem('token'));

// If token exists but user is null, token might be invalid
localStorage.clear();
// Try logging in again
```

### Error: "Network Error" during login

**Meaning:** Cannot reach backend server

**Solution:**
```bash
# Check if server is running
curl http://localhost:5000/health

# If not responding, restart server
cd server
npm run dev
```

---

## 💡 Best Practices

### For Development
1. Always run `npm run seed` after schema changes
2. Clear browser cache when testing auth
3. Check browser console for errors
4. Monitor server logs for issues

### For Testing
1. Test all user roles
2. Verify dashboard routing
3. Test authorization on protected routes
4. Verify logout clears session

### For Production
1. Never use seed script in production
2. Use strong passwords
3. Enable email verification
4. Add rate limiting
5. Use environment-specific configs

---

## 📞 Still Having Issues?

### Check These Files:

1. **Seed Script:** `server/src/scripts/seed.ts`
   - Verify accessories_seller is in defaultUsers array

2. **User Model:** `server/src/models/User.model.ts`
   - Verify 'accessories_seller' in role enum

3. **Auth Controller:** `server/src/controllers/auth.controller.ts`
   - Verify login function works

4. **Dashboard Router:** `client/src/app/dashboard/page.tsx`
   - Verify accessories_seller case exists

5. **Dashboard Page:** `client/src/app/dashboard/accessories-seller/page.tsx`
   - Verify file exists and exports correctly

### Debug Commands:

```bash
# Check database connection
npm run seed

# Check server is running
curl http://localhost:5000/health

# Check user in database (MongoDB)
use farm2global
db.users.findOne({ email: "seller@test.com" })

# Check frontend build
cd client
npm run build

# Clear all caches
rm -rf node_modules/.cache
rm -rf .next
npm run dev
```

---

## ✅ Success Criteria

You'll know the fix worked when:

1. ✅ Seed script runs without errors
2. ✅ Login with seller@test.com succeeds
3. ✅ JWT token generated and stored
4. ✅ Redirects to /dashboard/accessories-seller
5. ✅ Dashboard loads with all features
6. ✅ Can create and manage products
7. ✅ Can logout successfully

---

## 🎉 Conclusion

**The issue was simple:** The accessories seller account didn't exist in the database!

**The fix was easy:** Add it to the seed script and run `npm run seed`

**Now it works:** Login with `seller@test.com` / `Seller@123` and you're ready to sell farming accessories!

**Happy selling! 🛠️✨**
