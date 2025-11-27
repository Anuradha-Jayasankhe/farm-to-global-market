# Farm2Global - Complete Setup & Run Guide

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or connection string
- Git installed

### Step 1: Clone & Setup

```bash
# If not already cloned
git clone <repository-url>
cd farm-to-global-market
```

### Step 2: Setup Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
```

Create `server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/farm2global
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
COOKIE_SECRET=your-cookie-secret-key
```

```bash
# Start MongoDB (if running locally)
# Windows: mongod
# Mac/Linux: sudo systemctl start mongod

# Start the server
npm run dev
```

✅ Server should now be running on: **http://localhost:5000**

### Step 3: Setup Frontend Client

Open a new terminal:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env.local file
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

```bash
# Start the development server
npm run dev
```

✅ Client should now be running on: **http://localhost:3000**

## 📋 Test the Application

### 1. Register a New User
1. Go to http://localhost:3000
2. Click "Get Started" or navigate to /register
3. Choose a role (Farmer recommended for testing)
4. Fill in the registration form
5. Submit and you'll be redirected to the dashboard

### 2. Explore the Marketplace
1. Click "Marketplace" in navigation
2. Browse products with different tabs:
   - All Products
   - Farmed Products
   - Accessories
   - Export Quality
3. Add products to cart using the shopping cart button

### 3. Test Cart Functionality
1. Click cart icon in navigation (shows item count)
2. View cart at /cart
3. Update quantities
4. Remove items
5. Proceed to checkout

### 4. Try AI Features (Requires Login)
1. Navigate to /ai-consultation
2. Fill in farm details
3. Click "Analyze My Land"
4. View AI-generated crop recommendations

### 5. Community Features
1. Go to /community
2. View posts
3. Create a new post (requires login)
4. Like and comment on posts

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error:** Cannot connect to MongoDB

**Solution:**
```bash
# Check if MongoDB is running
# Windows:
net start MongoDB

# Mac/Linux:
sudo systemctl status mongod

# Or use MongoDB Atlas (cloud)
# Get connection string from https://cloud.mongodb.com
# Update MONGODB_URI in server/.env
```

### Port Already in Use

**Error:** Port 3000 or 5000 already in use

**Solution:**
```bash
# Find and kill process on port
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### CORS Errors

**Error:** CORS policy blocking requests

**Solution:**
1. Check `CLIENT_URL` in `server/.env` matches your frontend URL
2. Restart the server after changing .env

### JWT Authentication Issues

**Error:** Token expired or invalid

**Solution:**
1. Clear browser localStorage
2. Log in again
3. Check JWT_SECRET is set in server/.env

## 📁 Project Structure

```
farm-to-global-market/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # Pages (Next.js 13+ App Router)
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # API client & utilities
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Express.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration files
│   │   └── server.ts      # Main server file
│   └── package.json
│
└── docs/                  # Documentation
```

## 🎯 Key Features to Test

### ✅ Authentication
- Register new user
- Login with credentials
- Auto-redirect to role-based dashboard
- Logout functionality

### ✅ Marketplace
- Browse all products
- Filter by category
- Search products
- Tab navigation (All, Farmed, Accessories, Export)
- Add to cart

### ✅ Shopping Cart
- Add products
- Update quantities
- Remove items
- View totals
- Proceed to checkout

### ✅ Dashboard
- View analytics (revenue, orders, products)
- See recent orders
- Quick actions to all features
- Role-specific content

### ✅ AI Features
- Crop planning recommendations
- Pest detection (endpoint ready)
- Value booster suggestions (endpoint ready)
- Packaging generator (endpoint ready)

### ✅ Community
- View posts
- Create new post
- Like posts
- Add comments

## 🔑 Default Test Accounts

You can create these during testing or use existing ones if seeded:

**Farmer Account:**
- Role: Farmer
- Use to: List products, view sales dashboard, access AI features

**Buyer Account:**
- Role: Local Buyer
- Use to: Browse marketplace, place orders

**Accessories Seller:**
- Role: Accessories Seller
- Use to: List farming equipment and tools

## 📊 API Testing

### Using the API Directly

Health Check:
```bash
curl http://localhost:5000/health
```

Register User:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@farmer.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Farmer",
    "role": "farmer"
  }'
```

Login:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@farmer.com",
    "password": "password123"
  }'
```

Get Products:
```bash
curl http://localhost:5000/api/v1/products
```

## 🐛 Common Issues & Solutions

### 1. Blank Page / White Screen
- Check browser console for errors
- Verify both server and client are running
- Clear browser cache and localStorage

### 2. API Calls Failing
- Check NEXT_PUBLIC_API_URL in client/.env.local
- Verify server is running on port 5000
- Check browser Network tab for actual error

### 3. Authentication Not Working
- Clear localStorage
- Check JWT_SECRET is set in server/.env
- Verify token is being sent in requests

### 4. Products Not Showing
- Backend should return mock data even without database
- Check console for API errors
- Marketplace has fallback to mock data

## 🎨 UI Features

### Responsive Design
- Mobile-friendly navigation
- Responsive grids
- Touch-friendly buttons

### Dark Mode
- Toggle in navigation bar
- Persistent preference
- All pages support dark mode

### Animations
- Framer Motion animations
- Smooth transitions
- Loading states

## 📝 Next Steps

1. **Add More Products:** Use the "Sell Products" feature
2. **Test Orders:** Complete a full purchase flow
3. **Try AI Features:** Get crop recommendations
4. **Customize:** Modify colors, branding in components
5. **Deploy:** Set up production environment

## 🆘 Need Help?

1. Check `INTEGRATION_STATUS.md` for detailed integration info
2. Review error logs in terminal
3. Check browser console for frontend errors
4. Verify environment variables are set correctly

## 🎉 You're All Set!

Your Farm2Global application is now running with:
- ✅ Full authentication system
- ✅ Product marketplace with cart
- ✅ AI-powered features
- ✅ Community platform
- ✅ Analytics dashboard
- ✅ Order management

Happy farming! 🌾
