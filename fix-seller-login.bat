@echo off
REM Farm2Global - Complete Fix for Accessories Seller Login (Windows)
REM This script fixes all issues preventing accessories seller login

echo.
echo ========================================
echo Farm2Global - Accessories Seller Fix
echo ========================================
echo.

REM Step 1: Navigate to server directory
echo [1/4] Navigating to server directory...
cd server
if %errorlevel% neq 0 (
    echo ERROR: Could not find server directory
    pause
    exit /b 1
)
echo SUCCESS: In server directory
echo.

REM Step 2: Run database seed
echo [2/4] Seeding database with accessories seller account...
call npm run seed
if %errorlevel% neq 0 (
    echo ERROR: Database seeding failed
    pause
    exit /b 1
)
echo SUCCESS: Database seeded successfully
echo.

REM Step 3: Display account info
echo [3/4] Accessories Seller Account Created:
echo ----------------------------------------
echo Email:    seller@test.com
echo Password: Seller@123
echo Role:     accessories_seller
echo Status:   Active and Verified
echo.

REM Step 4: Instructions
echo [4/4] Next Steps:
echo ----------------------------------------
echo 1. Restart your backend server:
echo    - Press Ctrl+C in the server terminal
echo    - Run: npm run dev
echo.
echo 2. Login to the frontend:
echo    - Go to: http://localhost:3000/login
echo    - Email: seller@test.com
echo    - Password: Seller@123
echo.
echo 3. You'll be redirected to:
echo    - /dashboard/accessories-seller
echo.

echo.
echo ========================================
echo Fix Complete! Ready to test.
echo ========================================
echo.
pause
