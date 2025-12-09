#!/bin/bash
# Quick fix script for production deployment

echo "🔧 Quick Fix for Production Server"
echo "===================================="
echo ""

# Check if prisma folder exists
if [ ! -d "prisma" ]; then
    echo "❌ ERROR: prisma folder not found!"
    echo "   Please upload the prisma folder from your local machine"
    exit 1
fi

# Check if schema.prisma exists
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ ERROR: prisma/schema.prisma not found!"
    echo "   Please upload prisma/schema.prisma file"
    exit 1
fi

echo "✅ Prisma schema found"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ ERROR: .env file not found!"
    echo "   Creating .env file..."
    cat > .env << 'EOF'
DATABASE_URL="mysql://onewaytaxi110_user:kL93ul3Nore@localhost:3306/onewaytaxi110_"
JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
NEXTAUTH_URL="https://onewaytaxicabs.com"
NEXTAUTH_SECRET="your-secret-key-here"
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Build the application
echo ""
echo "🏗️ Building application..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart your Node.js application in Plesk"
echo "2. Or run: pm2 restart onewaytaxicabs"
echo "3. Or run: npm start"
