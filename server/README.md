# Farm-to-Global-Market Backend API

## 🚀 Overview
Backend API for the Farm-to-Global-Market platform - An AI-powered agricultural ecosystem connecting farmers, processors, and buyers globally.

## 📋 Features

### Core Functionality
- ✅ **Authentication & Authorization**: JWT-based auth with role-based access control
- ✅ **User Management**: Profile management, subscriptions, email verification
- ✅ **Product Marketplace**: CRUD operations for local, global, and accessories marketplaces
- ✅ **Order Management**: Complete order lifecycle with status tracking
- ✅ **AI Services**:
  - Crop Planning & Recommendations
  - Pest Detection & Treatment
  - Value-Added Product Converter
  - Packaging Design Generator
- ✅ **Community Features**: Posts, comments, likes, user interactions
- ✅ **Payment Integration**: Stripe integration ready
- ✅ **File Uploads**: Image upload and processing
- ✅ **Notifications**: Real-time notification system
- ✅ **Analytics**: Dashboard statistics and insights
- ✅ **Comprehensive Logging**: Winston logger with file rotation

### Security Features
- ✅ Helmet.js security headers
- ✅ Rate limiting (general, auth, AI, upload)
- ✅ CORS configuration
- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ Input validation
- ✅ Error handling middleware

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, bcrypt, express-rate-limit
- **Logging**: Winston with daily rotation
- **File Upload**: Multer
- **Image Processing**: Sharp
- **Cloud Storage**: Cloudinary (optional)
- **Payment**: Stripe
- **Email**: Nodemailer
- **Validation**: Joi, express-validator

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   └── logger.ts             # Winston logger configuration
│   ├── controllers/
│   │   └── auth.controller.ts    # Authentication logic
│   ├── middleware/
│   │   ├── auth.middleware.ts    # JWT verification
│   │   ├── errorHandler.ts       # Global error handler
│   │   └── rateLimiter.ts        # Rate limiting configs
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── Product.model.ts
│   │   ├── Order.model.ts
│   │   ├── CommunityPost.model.ts
│   │   ├── AIConsultation.model.ts
│   │   └── Notification.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── product.routes.ts
│   │   ├── order.routes.ts
│   │   ├── ai.routes.ts
│   │   ├── community.routes.ts
│   │   ├── upload.routes.ts
│   │   ├── analytics.routes.ts
│   │   ├── payment.routes.ts
│   │   └── notification.routes.ts
│   ├── services/              # AI and business logic services
│   ├── utils/                 # Helper functions
│   ├── types/                 # TypeScript type definitions
│   └── server.ts              # Main application file
├── logs/                      # Winston log files
├── uploads/                   # Uploaded files (local dev)
├── .env                       # Environment variables
├── .env.example               # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to server directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configurations:
- MongoDB connection string
- JWT secrets
- Email credentials (for production)
- Stripe keys (for payments)
- Cloudinary credentials (for image storage)

4. **Start MongoDB**

Make sure MongoDB is running locally:
```bash
# Windows
net start MongoDB

# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud database).

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Start production server:**
```bash
npm start
```

**Run tests:**
```bash
npm test
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/auth/me` | Get current user | Yes |
| GET | `/auth/verify-email/:token` | Verify email | No |
| POST | `/auth/forgot-password` | Request password reset | No |
| POST | `/auth/reset-password/:token` | Reset password | No |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users/profile` | Get user profile | Yes |
| PUT | `/users/profile` | Update profile | Yes |
| PUT | `/users/password` | Change password | Yes |
| POST | `/users/avatar` | Upload avatar | Yes |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get single product | No |
| POST | `/products` | Create product | Yes |
| PUT | `/products/:id` | Update product | Yes |
| DELETE | `/products/:id` | Delete product | Yes |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/orders` | Get user orders | Yes |
| GET | `/orders/:id` | Get single order | Yes |
| POST | `/orders` | Create order | Yes |
| PUT | `/orders/:id/status` | Update order status | Yes |

### AI Services
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/ai/crop-planner` | Get crop recommendations | Yes |
| POST | `/ai/pest-detection` | Detect pest from image | Yes |
| POST | `/ai/value-booster` | Get value-added products | Yes |
| POST | `/ai/packaging-generator` | Generate packaging design | Yes |
| GET | `/ai/history` | Get AI consultation history | Yes |

### Community
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/community/posts` | Get all posts | No |
| GET | `/community/posts/:id` | Get single post | No |
| POST | `/community/posts` | Create post | Yes |
| PUT | `/community/posts/:id` | Update post | Yes |
| DELETE | `/community/posts/:id` | Delete post | Yes |
| POST | `/community/posts/:id/like` | Like/unlike post | Yes |
| POST | `/community/posts/:id/comment` | Add comment | Yes |

### Upload
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/upload/image` | Upload single image | Yes |
| POST | `/upload/images` | Upload multiple images | Yes |
| DELETE | `/upload/image/:id` | Delete image | Yes |

### Analytics
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/analytics/dashboard` | Dashboard stats | Yes |
| GET | `/analytics/sales` | Sales analytics | Yes |
| GET | `/analytics/products` | Product analytics | Yes |
| GET | `/analytics/platform` | Platform analytics | Admin |

### Payments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/payments/create-payment-intent` | Create payment | Yes |
| POST | `/payments/webhook` | Stripe webhook | No |
| GET | `/payments/transactions` | Get transactions | Yes |

### Notifications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/notifications` | Get all notifications | Yes |
| GET | `/notifications/unread` | Get unread notifications | Yes |
| PUT | `/notifications/:id/read` | Mark as read | Yes |
| PUT | `/notifications/read-all` | Mark all as read | Yes |
| DELETE | `/notifications/:id` | Delete notification | Yes |

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Include the token in requests:**
```
Authorization: Bearer <your_jwt_token>
```

Or the token can be sent via cookies (automatically handled).

## 📝 Logging

Logs are stored in the `logs/` directory:
- `application-YYYY-MM-DD.log` - All logs
- `error-YYYY-MM-DD.log` - Error logs only
- `http-YYYY-MM-DD.log` - HTTP request logs
- `exceptions-YYYY-MM-DD.log` - Uncaught exceptions
- `rejections-YYYY-MM-DD.log` - Unhandled promise rejections

Logs are automatically rotated daily and compressed.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test --watch

# Generate coverage report
npm test --coverage
```

## 🌐 Environment Variables

See `.env.example` for all available environment variables.

**Essential variables:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `CLIENT_URL` - Frontend URL for CORS

## 📊 Database Models

### User
- Authentication & profile information
- Role-based access (farmer/buyer/processor/admin)
- Subscription management
- Farm details (for farmers)

### Product
- Product information
- Seller details
- Pricing & inventory
- Location & shipping
- Categories: crops, processed, accessories

### Order
- Order items
- Buyer & seller information
- Payment details
- Shipping address
- Status tracking
- Commission calculations

### CommunityPost
- Post content
- Comments & likes
- Categories & tags
- User interactions

### AIConsultation
- Consultation type
- Input data
- AI responses
- User feedback
- Processing metrics

### Notification
- Recipient & sender
- Notification type
- Message content
- Read status

## 🚢 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Configure MongoDB Atlas
- [ ] Set up Cloudinary for images
- [ ] Configure email service
- [ ] Add Stripe production keys
- [ ] Enable HTTPS
- [ ] Configure domain CORS
- [ ] Set up monitoring
- [ ] Configure backup strategy

### Hosting Recommendations
- **API**: Render, Railway, DigitalOcean, AWS, Heroku
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary, AWS S3

## 🤝 Contributing

This is a proprietary project. For contributions, please contact the development team.

## 📄 License

MIT License - See LICENSE file for details

## 👥 Support

For support, email support@farm2global.com or create an issue in the repository.

---

**Built with ❤️ for Farmers Worldwide**
