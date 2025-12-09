# Deployment Guide for AWS Lightsail (Plesk)

## Pre-deployment Checklist

### 1. Prepare Environment Variables
Create `.env` file on the server with:
```env
DATABASE_URL=mysql://onewaytaxi110_user:kL93ul3Nore@localhost:3306/onewaytaxi110_
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
NEXTAUTH_URL=https://onewaytaxicabs.com
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. Required Files on Server
Ensure these files/folders are uploaded:
- ✅ `prisma/schema.prisma` (CRITICAL!)
- ✅ `src/` folder
- ✅ `public/` folder
- ✅ `package.json`
- ✅ `next.config.ts`
- ✅ `tsconfig.json`
- ✅ `.env` (create on server)

### 3. SSH Deployment Commands

```bash
# Navigate to your application directory
cd /var/www/vhosts/onewaytaxicabs.com/httpdocs

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Build the application
npm run build

# Start the application (or use PM2)
npm start
```

### 4. Plesk Configuration

1. **Go to**: Plesk → Domains → onewaytaxicabs.com → Node.js
2. **Set**:
   - Application Mode: `Production`
   - Application Root: `/httpdocs` (or your path)
   - Application Startup File: Use PM2 or custom startup
   - Node.js Version: 18.x or higher

3. **Environment Variables**: Add in Plesk Node.js settings
4. **Click**: NPM Install → Restart App

### 5. Database Setup

Ensure MySQL database exists:
```bash
# Check database exists
mysql -u onewaytaxi110_user -p
USE onewaytaxi110_;
SHOW TABLES;
```

If tables don't exist:
```bash
npx prisma db push
npx prisma db seed
```

### 6. PM2 Setup (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start npm --name "onewaytaxicabs" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 7. Verify Deployment

Check if APIs work:
- https://onewaytaxicabs.com/api/cities
- https://onewaytaxicabs.com/api/cabs

### Troubleshooting

**Issue**: "Could not find Prisma Schema"
- **Fix**: Upload `prisma/schema.prisma` file
- **Fix**: Run `npx prisma generate` on server

**Issue**: "Failed to fetch cities"
- **Fix**: Check `.env` file exists with correct DATABASE_URL
- **Fix**: Verify MySQL is running: `systemctl status mysql`
- **Fix**: Check database credentials are correct

**Issue**: 500 Internal Server Error
- **Fix**: Check server logs: `pm2 logs` or Plesk logs
- **Fix**: Ensure all environment variables are set
- **Fix**: Run `npm run build` again

**Issue**: Database connection failed
- **Fix**: Verify DATABASE_URL in `.env`
- **Fix**: Check MySQL is accessible: `mysql -u onewaytaxi110_user -p`
- **Fix**: Ensure database `onewaytaxi110_` exists

## Quick Deploy Script

Save this as `deploy.sh` on your server:

```bash
#!/bin/bash
echo "🚀 Starting deployment..."

# Pull latest code (if using git)
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Build application
echo "🏗️ Building application..."
npm run build

# Restart with PM2
echo "♻️ Restarting application..."
pm2 restart onewaytaxicabs

echo "✅ Deployment complete!"
```

Make executable: `chmod +x deploy.sh`
Run: `./deploy.sh`
