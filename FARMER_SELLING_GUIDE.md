# 🌾 Farmer Product Selling Guide

## How Farmers Can Sell Products

### Step 1: Access the Sell Page
Farmers have **3 ways** to access the product selling page:

1. **From Dashboard Header**
   - Click the green **"Sell Product"** button in the top-right corner
   - Located next to the "Value Booster" button

2. **From Quick Actions Card**
   - Click on **"Sell Raw Products"** card
   - First card in the quick actions grid (blue icon)

3. **From Empty Products Section**
   - If no products are listed, click **"Sell Product"** button
   - Appears in the "My Products" section

---

## Step 2: Fill Product Information

### Basic Information
- **Product Name*** (required)
  - Example: "Fresh Organic Tomatoes"
  
- **Category*** (required)
  - Options: Vegetables, Fruits, Grains, Pulses, Spices, Dairy, Poultry, Other
  
- **Harvest Date*** (required)
  - Select the date when the product was harvested
  
- **Description*** (required)
  - Describe growing methods, quality, freshness, etc.
  - Minimum 50 characters recommended
  
- **Organic Certification** (optional)
  - Check if product is certified organic
  - Increases buyer trust and pricing

### Pricing & Quantity
- **Price*** (required)
  - Enter price in Indian Rupees (₹)
  - Example: 50.00
  
- **Unit*** (required)
  - Options: kg, gram, ton, litre, piece, dozen, bag
  - Default: kg
  
- **Available Quantity*** (required)
  - Total amount available for sale
  - Example: 1000 (for 1000 kg)

### Location
- **Farm Location*** (required)
  - Format: "Village Name, District, State"
  - Example: "Pune, Maharashtra"
  - Used for shipping calculations

### Product Images (Optional but Recommended)
- Upload up to **5 images**
- Supported formats: JPG, PNG, WebP
- First image becomes the main product photo
- Good photos increase sales by 300%!

---

## Step 3: Submit & Publish

1. Review all information
2. Click **"List Product"** button
3. Wait for confirmation
4. Product goes live immediately! ✅

---

## After Listing

### Your product will appear in:
- ✅ Your Farmer Dashboard ("My Products" section)
- ✅ Marketplace (visible to all buyers)
- ✅ Search results
- ✅ Category pages

### You can:
- 📊 Track views and orders
- 📝 Edit product details
- 📦 Manage inventory
- 💰 See earnings
- ⭐ View buyer ratings

---

## Tips for Better Sales

### 1. **High-Quality Photos**
   - Use natural lighting
   - Show product from multiple angles
   - Include close-ups for quality
   - Clean background

### 2. **Competitive Pricing**
   - Research market rates
   - Consider quality and freshness
   - Organic products can charge 20-30% more

### 3. **Detailed Description**
   - Mention growing methods
   - Highlight unique features
   - Include freshness details
   - Add certifications

### 4. **Accurate Quantity**
   - Update when stock changes
   - Don't oversell
   - Mark "Out of Stock" when needed

### 5. **Fast Response**
   - Reply to buyer queries quickly
   - Accept/reject orders within 24 hours
   - Maintain good ratings

---

## Common Issues & Solutions

### ❌ "Failed to create product"
**Solution:** Check internet connection and try again

### ❌ Images not uploading
**Solution:** 
- Ensure images are under 5MB each
- Use JPG or PNG format
- Maximum 5 images allowed

### ❌ Product not showing in marketplace
**Solution:** 
- Refresh the page
- Wait 1-2 minutes for indexing
- Check if all required fields are filled

### ❌ Can't see "Sell Product" button
**Solution:** 
- Ensure you're logged in as Farmer
- Check your account role
- Try logging out and back in

---

## API Integration

### Backend Endpoint
```
POST http://localhost:5000/api/products
```

### Required Headers
```
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

### Request Body (FormData)
```javascript
{
  name: string,
  category: string,
  description: string,
  price: number,
  unit: string,
  quantity: number,
  location: string,
  harvestDate: date,
  organic: boolean,
  images: File[] // Optional, max 5
}
```

### Success Response
```json
{
  "success": true,
  "product": {
    "_id": "...",
    "name": "Fresh Organic Tomatoes",
    "price": 50,
    "seller": "farmer_id",
    // ... other fields
  }
}
```

---

## Product Management Features

### View All Your Products
- Dashboard → "My Products" section
- Shows: Name, Category, Price, Stock, Status

### Edit Product
- Click product card
- Update any field
- Save changes

### Delete Product
- Click product → Delete button
- Confirm deletion
- Product removed from marketplace

### Track Performance
- View count (how many people viewed)
- Order count (how many orders)
- Revenue generated
- Average rating

---

## Best Practices

### ✅ DO:
- Update stock regularly
- Respond to queries fast
- Ship orders on time
- Maintain quality
- Keep prices competitive
- Upload multiple photos

### ❌ DON'T:
- List expired products
- Oversell inventory
- Use fake photos
- Ignore buyer messages
- Cancel orders frequently
- Set unrealistic prices

---

## Quick Reference

| Feature | Location | Action |
|---------|----------|--------|
| Sell Product | Dashboard Header | Click "Sell Product" button |
| View Products | Dashboard | Scroll to "My Products" |
| Edit Product | Product Card | Click "Edit" icon |
| Track Orders | Dashboard | "Recent Orders" section |
| View Earnings | Finance Page | Click "Finance Dashboard" |

---

## Support

Need help? Contact:
- 📧 Email: support@farm2global.com
- 📞 Phone: +91-XXXX-XXXXXX
- 💬 Live Chat: Available on dashboard
- 📚 Help Center: [Link]

---

**Happy Selling! 🌾✨**
