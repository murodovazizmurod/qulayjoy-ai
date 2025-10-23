#!/bin/bash

# QulayJoy Local Build Script
# Builds the project locally and prepares for deployment

echo "🔨 QulayJoy Local Build Script"
echo "=============================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Project directory found"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
else
    echo "✅ Dependencies already installed"
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully"

# Verify build output
echo "📁 Build output:"
ls -la dist/

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf qulayjoy-frontend.tar.gz -C dist .

if [ $? -ne 0 ]; then
    echo "❌ Failed to create deployment package"
    exit 1
fi

echo "✅ Deployment package created: qulayjoy-frontend.tar.gz"

# Show package size
echo "📊 Package size:"
ls -lh qulayjoy-frontend.tar.gz

echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Upload to server:"
echo "   scp qulayjoy-frontend.tar.gz root@66.42.57.79:/root/"
echo "   scp deploy-qulayjoy.sh root@66.42.57.79:/root/"
echo ""
echo "2. Deploy on server:"
echo "   ssh root@66.42.57.79"
echo "   chmod +x deploy-qulayjoy.sh"
echo "   ./deploy-qulayjoy.sh"
echo ""
echo "3. Test your website:"
echo "   http://qulayjoy.uz"

