# Quick Fix for Production - PowerShell Script
# Run this on Windows before uploading to server

Write-Host "🔧 Pre-deployment Check" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Check if prisma folder exists
if (-Not (Test-Path "prisma")) {
    Write-Host "❌ ERROR: prisma folder not found!" -ForegroundColor Red
    exit 1
}

# Check if schema.prisma exists
if (-Not (Test-Path "prisma\schema.prisma")) {
    Write-Host "❌ ERROR: prisma\schema.prisma not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prisma schema found" -ForegroundColor Green

# Create deployment package
Write-Host ""
Write-Host "📦 Creating deployment package..." -ForegroundColor Yellow

$deployFiles = @(
    "prisma",
    "src",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.mjs"
)

Write-Host ""
Write-Host "Files to upload to server:" -ForegroundColor Cyan
foreach ($file in $deployFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (missing)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "⚠️  IMPORTANT: Upload these files to your server!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then run on the server:" -ForegroundColor Cyan
Write-Host "  npm install" -ForegroundColor White
Write-Host "  npx prisma generate" -ForegroundColor White
Write-Host "  npm run build" -ForegroundColor White
Write-Host "  npm start (or pm2 restart)" -ForegroundColor White
