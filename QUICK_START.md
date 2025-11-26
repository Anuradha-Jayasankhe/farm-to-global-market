# 🚀 Quick Start Guide - Farm2Global Market

## ⚡ Start Everything in 60 Seconds

### **Step 1: Start Backend** (Terminal 1)
```powershell
cd d:\projects\farm-to-global-market\server
npm run dev
```
✅ **Backend running at**: http://localhost:5000

### **Step 2: Start Frontend** (Terminal 2)
```powershell
cd d:\projects\farm-to-global-market\client
npm run dev
```
✅ **Frontend running at**: http://localhost:3000

### **Step 3: Test**
Open browser: http://localhost:3000

---

## 🧪 Quick API Tests

### **Health Check**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

### **Register User**
```powershell
$user = @{ email="test@farm.com"; password="Test123!"; firstName="John"; lastName="Doe"; role="farmer" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/register" -Method POST -Body $user -ContentType "application/json"
```

### **Login**
```powershell
$login = @{ email="test@farm.com"; password="Test123!" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/login" -Method POST -Body $login -ContentType "application/json"
$token = $response.data.token
Write-Host "Token: $token"
```

### **Get Products (Authenticated)**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/v1/products" -Headers @{ Authorization="Bearer $token" }
```

---

## 📁 Key Files

### **Frontend**
- **API Client**: `client/src/lib/api-client.ts`
- **API Examples**: `client/src/lib/api-examples.tsx`
- **Custom Hooks**: `client/src/hooks/useApi.ts`
- **Auth Context**: `client/src/context/AuthContext.tsx`

### **Backend**
- **Server Entry**: `server/src/server.ts`
- **Routes**: `server/src/routes/*`
- **Controllers**: `server/src/controllers/*`
- **Models**: `server/src/models/*`

### **Configuration**
- **Frontend Env**: `client/.env.local`
- **Backend Env**: `server/.env`

---

## 🔥 Common Commands

### **Backend**
```powershell
cd server
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Run production server
npm run lint     # Lint code
```

### **Frontend**
```powershell
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Lint code
```

---

## 🛠️ MongoDB Setup

### **Option 1: Local MongoDB**
```powershell
.\setup-mongodb.ps1
# Follow instructions to install
```

### **Option 2: MongoDB Atlas (Cloud)**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/farm-to-global-market
   ```

---

## 🎯 Feature Checklist

### **Frontend Pages** (18)
- ✅ Landing Page
- ✅ Login / Register
- ✅ Marketplace
- ✅ Product Details
- ✅ Dashboard
- ✅ AI Tools (4 features)
- ✅ Community
- ✅ Profile
- ✅ Orders
- ✅ Checkout
- ✅ Settings

### **Backend APIs** (10 Route Groups)
- ✅ Authentication
- ✅ Products
- ✅ Orders
- ✅ AI Services
- ✅ Community
- ✅ Notifications
- ✅ Analytics
- ✅ Payments
- ✅ Upload
- ✅ User Management

---

## 🐛 Troubleshooting

### **Backend crashed?**
```powershell
# Check logs
Get-Content server\logs\error-*.log -Tail 20

# Restart
cd server
npm run dev
```

### **Frontend error?**
```powershell
# Clear cache and restart
cd client
rm -r .next
npm run dev
```

### **API not connecting?**
1. Check backend is running: http://localhost:5000/health
2. Check CORS in `server/src/server.ts`
3. Check `client/.env.local` has correct API URL

---

## 📊 Project Status

| Component | Status | URL |
|-----------|--------|-----|
| Backend | ✅ Running | http://localhost:5000 |
| Frontend | ✅ Running | http://localhost:3000 |
| MongoDB | ✅ Connected | localhost:27017 |
| API Client | ✅ Integrated | - |
| TypeScript | ✅ No Errors | - |

---

## 🎓 Learning Resources

### **API Usage Examples**
See: `client/src/lib/api-examples.tsx`
- 10+ complete examples
- All API endpoints covered
- Best practices included

### **Hook Usage**
See: `client/src/hooks/useApi.ts`
- `useApi` - Fetch data
- `useMutation` - Create/Update/Delete
- `useFormSubmit` - Form handling
- `usePagination` - Paginated lists

### **Full Documentation**
- `README.md` - Complete project overview
- `SETUP.md` - Detailed setup guide
- API Docs: http://localhost:5000/api/v1

---

## 🚀 Next Steps

1. **Test the flow**:
   - Register → Login → Browse Products → Add to Cart → Checkout
   
2. **Try AI Features**:
   - Crop Planner: http://localhost:3000/ai/crop-planner
   - Pest Detection: http://localhost:3000/ai/pest-detection
   
3. **Explore Community**:
   - Create posts
   - Like and comment
   - View farming tips

4. **Customize**:
   - Add your branding
   - Modify colors in `client/src/app/globals.css`
   - Update content

---

## 💡 Pro Tips

1. **Use the API Client**: Don't write fetch calls manually
   ```typescript
   import { apiClient } from '@/lib/api-client';
   const products = await apiClient.products.getAll();
   ```

2. **Use Custom Hooks**: Simplify state management
   ```typescript
   const { data, loading, error } = useApi(apiClient.products.getAll);
   ```

3. **Check Examples**: See `api-examples.tsx` for patterns

4. **Monitor Logs**: Backend logs everything to `server/logs/`

---

## ✅ You're All Set!

Your full-stack platform is ready. Start building amazing features! 🎉

**Questions?** Check the docs:
- `README.md` - Full documentation
- `SETUP.md` - Setup instructions
- `api-examples.tsx` - Code examples

**Happy Coding! 🌾**
