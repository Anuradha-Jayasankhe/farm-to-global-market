# MongoDB Setup Script for Windows

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  MongoDB Setup for Farm2Global" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is installed
$mongoInstalled = Get-Command mongod -ErrorAction SilentlyContinue

if ($mongoInstalled) {
    Write-Host "✓ MongoDB is already installed!" -ForegroundColor Green
    Write-Host "  Location: $($mongoInstalled.Source)" -ForegroundColor Gray
    Write-Host ""
    
    # Check if MongoDB service is running
    $mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
    
    if ($mongoService) {
        if ($mongoService.Status -eq 'Running') {
            Write-Host "✓ MongoDB service is running!" -ForegroundColor Green
        } else {
            Write-Host "! MongoDB service is installed but not running" -ForegroundColor Yellow
            Write-Host "  Starting MongoDB service..." -ForegroundColor Gray
            Start-Service -Name MongoDB
            Write-Host "✓ MongoDB service started!" -ForegroundColor Green
        }
    } else {
        Write-Host "! MongoDB is installed but service not configured" -ForegroundColor Yellow
        Write-Host "  You can start MongoDB manually with: mongod --dbpath=C:\data\db" -ForegroundColor Gray
    }
} else {
    Write-Host "✗ MongoDB is not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Choose an option:" -ForegroundColor Yellow
    Write-Host "  1. Install MongoDB Community Server (Local)" -ForegroundColor White
    Write-Host "  2. Use MongoDB Atlas (Cloud - Free)" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1 or 2)"
    
    if ($choice -eq "1") {
        Write-Host ""
        Write-Host "Opening MongoDB download page..." -ForegroundColor Cyan
        Start-Process "https://www.mongodb.com/try/download/community"
        Write-Host ""
        Write-Host "After installation:" -ForegroundColor Yellow
        Write-Host "  1. Install with default settings" -ForegroundColor White
        Write-Host "  2. Start MongoDB service" -ForegroundColor White
        Write-Host "  3. Run this script again to verify" -ForegroundColor White
    } elseif ($choice -eq "2") {
        Write-Host ""
        Write-Host "Opening MongoDB Atlas..." -ForegroundColor Cyan
        Start-Process "https://www.mongodb.com/cloud/atlas/register"
        Write-Host ""
        Write-Host "Setup steps:" -ForegroundColor Yellow
        Write-Host "  1. Create free account" -ForegroundColor White
        Write-Host "  2. Create a cluster (M0 Free tier)" -ForegroundColor White
        Write-Host "  3. Create database user" -ForegroundColor White
        Write-Host "  4. Whitelist your IP (0.0.0.0/0 for development)" -ForegroundColor White
        Write-Host "  5. Get connection string" -ForegroundColor White
        Write-Host "  6. Update server/.env with:" -ForegroundColor White
        Write-Host "     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farm-to-global-market" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Backend Server Status" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if backend dependencies are installed
$serverPath = ".\server"
if (Test-Path "$serverPath\node_modules") {
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ Backend dependencies not installed" -ForegroundColor Red
    Write-Host "  Run: cd server; npm install" -ForegroundColor Gray
}

# Check if .env exists
if (Test-Path "$serverPath\.env") {
    Write-Host "✓ Environment variables configured" -ForegroundColor Green
} else {
    Write-Host "✗ .env file not found" -ForegroundColor Red
    Write-Host "  Copy .env.example to .env" -ForegroundColor Gray
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Ensure MongoDB is running" -ForegroundColor White
Write-Host "2. Start backend: cd server; npm run dev" -ForegroundColor White
Write-Host "3. Start frontend: cd client; npm run dev" -ForegroundColor White
Write-Host "4. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
