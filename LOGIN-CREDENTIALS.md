# 🔐 Quick Login Reference

## Default Test Accounts

### 1️⃣ Admin Account
```
Email:    admin@farm2global.com
Password: Admin@123
Role:     Administrator (Full Access)
```

### 2️⃣ Farmer Account #1
```
Email:    farmer@test.com
Password: Farmer@123
Role:     Farmer
Farm:     Green Valley Farm (50 acres)
```

### 3️⃣ Farmer Account #2
```
Email:    farmer2@test.com
Password: Farmer@123
Role:     Farmer
Farm:     Sunshine Organic Farm (75 acres)
```

### 4️⃣ Buyer Account
```
Email:    buyer@test.com
Password: Buyer@123
Role:     Buyer
```

### 5️⃣ Processor Account
```
Email:    processor@test.com
Password: Processor@123
Role:     Processor
```

### 6️⃣ Accessories Seller Account
```
Email:    seller@test.com
Password: Seller@123
Role:     Accessories Seller
Business: Farm Tools & Equipment Store
```

---

## Quick Start

1. **Start Backend** (if not running):
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend** (in new terminal):
   ```bash
   cd client
   npm run dev
   ```

3. **Login**: Navigate to `http://localhost:3000/login` and use any credentials above

---

## Features by Role

### 🛡️ Admin
- View all users and products
- Manage orders and transactions
- Access analytics dashboard
- Approve/reject products
- Manage platform settings

### 🌾 Farmer
- Create and manage products
- View and manage orders
- Access AI consultations
- Post in community
- Track sales analytics

### 🛒 Buyer
- Browse and purchase products
- View order history
- Rate and review products
- Message sellers
- Track shipments

### 🏭 Processor
- Browse crops for processing
- Place bulk orders
- Manage processing requests
- Track inventory
- Connect with farmers

### 🛠️ Accessories Seller
- List farming tools and equipment
- Manage product inventory
- Process customer orders
- Track sales and revenue
- Manage discounts and promotions

---

## Sample Data Included

✅ 6 User accounts (all verified and active)  
✅ 5 Products (organic vegetables and fruits)  
✅ All accounts have active subscriptions  
✅ Ready to test all features immediately

---

## Need More Accounts?

Run the seed script again to reset database:
```bash
cd server
npm run seed
```

⚠️ **Warning**: This will clear all existing data and create fresh test accounts.

---

For detailed information, see [server/CREDENTIALS.md](./server/CREDENTIALS.md)
