# 🔐 Default Login Credentials

## Test Accounts

After running the seed script (`npm run seed`), you can use these credentials to login:

### 1. Admin Account
- **Email**: `admin@farm2global.com`
- **Password**: `Admin@123`
- **Role**: Administrator
- **Subscription**: Premium
- **Access**: Full system access, can manage all users and content

---

### 2. Farmer Account #1
- **Email**: `farmer@test.com`
- **Password**: `Farmer@123`
- **Role**: Farmer
- **Farm**: Green Valley Farm (50 acres)
- **Subscription**: Pro
- **Crops**: Tomatoes, Lettuce, Carrots, Potatoes

---

### 3. Farmer Account #2
- **Email**: `farmer2@test.com`
- **Password**: `Farmer@123`
- **Role**: Farmer
- **Farm**: Sunshine Organic Farm (75 acres)
- **Subscription**: Basic
- **Crops**: Strawberries, Blueberries, Corn, Wheat

---

### 4. Buyer Account
- **Email**: `buyer@test.com`
- **Password**: `Buyer@123`
- **Role**: Buyer
- **Subscription**: Basic
- **Location**: Chicago, IL, USA

---

### 5. Processor Account
- **Email**: `processor@test.com`
- **Password**: `Processor@123`
- **Role**: Processor
- **Subscription**: Pro
- **Location**: Detroit, MI, USA

---

## How to Seed the Database

### Development Mode
```bash
cd server
npm run seed
```

### Production Mode
```bash
cd server
npm run build
npm run seed:prod
```

---

## Quick Start

1. **Seed the database** with test accounts:
   ```bash
   npm run seed
   ```

2. **Start the server**:
   ```bash
   npm run dev
   ```

3. **Start the client**:
   ```bash
   cd ../client
   npm run dev
   ```

4. **Login** at `http://localhost:3000/login` with any of the credentials above

---

## Sample Data Included

After seeding, the database will contain:
- ✅ 5 test user accounts (1 admin, 2 farmers, 1 buyer, 1 processor)
- ✅ 4 sample products (tomatoes, lettuce, carrots, strawberries)
- ✅ All accounts are email-verified and active
- ✅ All accounts have active subscriptions

---

## Security Notes

⚠️ **Important**: These are TEST credentials only!

- Change all passwords in production
- Use strong passwords for admin accounts
- Enable 2FA for admin accounts in production
- Never commit real credentials to git
- Use environment variables for sensitive data

---

## API Endpoints

### Authentication
```bash
# Register new user
POST http://localhost:5000/api/v1/auth/register

# Login
POST http://localhost:5000/api/v1/auth/login

# Logout
POST http://localhost:5000/api/v1/auth/logout
```

### Test Login via cURL
```bash
# Login as admin
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@farm2global.com","password":"Admin@123"}'

# Login as farmer
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@test.com","password":"Farmer@123"}'
```

---

## Troubleshooting

### "User already exists" error
The database already has these users. Either:
1. Clear the database first: Drop the `users` collection in MongoDB
2. Use the existing credentials to login
3. Modify the seed script to use different emails

### "Cannot connect to MongoDB"
Make sure MongoDB is running:
```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or check if running
mongod --version
```

### Reset Database
```bash
# Drop database and reseed
mongo farm-to-global-market --eval "db.dropDatabase()"
npm run seed
```

---

For more information, see the main [README.md](./README.md) file.
