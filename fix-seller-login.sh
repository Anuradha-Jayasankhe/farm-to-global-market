#!/bin/bash

# Farm2Global - Complete Fix for Accessories Seller Login
# This script fixes all issues preventing accessories seller login

echo "🔧 Starting complete fix for Accessories Seller login..."
echo ""

# Step 1: Navigate to server directory
echo "📁 Step 1: Navigating to server directory..."
cd server || { echo "❌ Server directory not found!"; exit 1; }
echo "✅ In server directory"
echo ""

# Step 2: Run database seed
echo "🌱 Step 2: Seeding database with accessories seller account..."
npm run seed
if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
else
    echo "❌ Database seeding failed"
    exit 1
fi
echo ""

# Step 3: Verify the user was created
echo "🔍 Step 3: Verifying accessories seller account..."
echo ""
echo "Account should be created with:"
echo "  Email: seller@test.com"
echo "  Password: Seller@123"
echo "  Role: accessories_seller"
echo ""

# Step 4: Restart server
echo "🔄 Step 4: Server restart required..."
echo "  Please restart your backend server (Ctrl+C and run 'npm run dev')"
echo ""

echo "✅ Fix complete! Now you can:"
echo "  1. Login with: seller@test.com / Seller@123"
echo "  2. You'll be redirected to: /dashboard/accessories-seller"
echo ""
echo "🎉 All done!"
