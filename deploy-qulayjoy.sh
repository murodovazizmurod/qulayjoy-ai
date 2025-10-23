#!/bin/bash

# QulayJoy Deployment Script
# Deploys React SPA to /var/www/qulayjoy.uz with Nginx configuration

echo "🚀 QulayJoy Frontend Deployment"
echo "==============================="

# Check if we're running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (use sudo)"
    exit 1
fi

# Check if tar.gz file exists
if [ ! -f "qulayjoy-frontend.tar.gz" ]; then
    echo "❌ qulayjoy-frontend.tar.gz not found"
    echo "Please upload the built project first:"
    echo "   scp qulayjoy-frontend.tar.gz root@66.42.57.79:/root/"
    exit 1
fi

echo "✅ qulayjoy-frontend.tar.gz found"

# Install Nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    apt update
    apt install -y nginx
fi

echo "✅ Nginx is installed"

# Create web directory
echo "📁 Creating web directory..."
mkdir -p /var/www/qulayjoy.uz

# Backup existing deployment if it exists
if [ -d "/var/www/qulayjoy.uz" ] && [ "$(ls -A /var/www/qulayjoy.uz)" ]; then
    echo "💾 Backing up existing deployment..."
    tar -czf /root/qulayjoy-backup-$(date +%Y%m%d_%H%M%S).tar.gz -C /var/www qulayjoy.uz/
fi

# Extract new deployment
echo "📦 Extracting new deployment..."
rm -rf /var/www/qulayjoy.uz/*
tar -xzf qulayjoy-frontend.tar.gz -C /var/www/qulayjoy.uz/

# Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/qulayjoy.uz/
chmod -R 644 /var/www/qulayjoy.uz/
find /var/www/qulayjoy.uz/ -type d -exec chmod 755 {} \;

# Create Nginx configuration
echo "⚙️ Creating Nginx configuration..."
cat > /etc/nginx/sites-available/qulayjoy.uz << 'EOF'
server {
    listen 80;
    server_name qulayjoy.uz www.qulayjoy.uz;
    root /var/www/qulayjoy.uz;
    index index.html;

    # Handle SPA routing - this is crucial for React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # JavaScript files - ensure proper MIME type
    location ~* \.js$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Content-Type "application/javascript; charset=utf-8";
        
        # Enable CORS for API calls
        add_header Access-Control-Allow-Origin "*";
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization";
    }

    # CSS files
    location ~* \.css$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Content-Type "text/css; charset=utf-8";
    }

    # Images and other static assets
    location ~* \.(png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Service worker - no cache
    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        add_header Content-Type "application/javascript; charset=utf-8";
    }

    # Handle preflight requests for CORS
    location ~* \.(js|css)$ {
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin "*";
            add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
            add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization";
            add_header Access-Control-Max-Age 86400;
            add_header Content-Length 0;
            add_header Content-Type text/plain;
            return 204;
        }
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.qulayjoy.uz https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.qulayjoy.uz;" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        application/xml
        image/svg+xml;

    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/qulayjoy.uz;
    }

    # Logging
    error_log /var/log/nginx/qulayjoy.uz_error.log;
    access_log /var/log/nginx/qulayjoy.uz_access.log;
}
EOF

# Enable the site
echo "🌐 Enabling qulayjoy.uz site..."
ln -sf /etc/nginx/sites-available/qulayjoy.uz /etc/nginx/sites-enabled/

# Remove default site if it exists
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    # Reload Nginx
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx
    
    # Enable Nginx to start on boot
    systemctl enable nginx
    
    # Check Nginx status
    echo "📊 Checking Nginx status..."
    systemctl status nginx --no-pager -l
else
    echo "❌ Nginx configuration test failed!"
    exit 1
fi

echo ""
echo "✅ QulayJoy deployment completed successfully!"
echo ""
echo "🌐 Your website is now available at:"
echo "   http://qulayjoy.uz"
echo "   http://www.qulayjoy.uz"
echo ""
echo "📁 Files deployed to:"
echo "   /var/www/qulayjoy.uz/"
echo ""
echo "⚙️ Nginx configuration:"
echo "   /etc/nginx/sites-available/qulayjoy.uz"
echo "   /etc/nginx/sites-enabled/qulayjoy.uz"
echo ""
echo "📊 Logs:"
echo "   Error: /var/log/nginx/qulayjoy.uz_error.log"
echo "   Access: /var/log/nginx/qulayjoy.uz_access.log"
echo ""
echo "🔒 To add SSL certificate (optional):"
echo "   apt install certbot python3-certbot-nginx"
echo "   certbot --nginx -d qulayjoy.uz -d www.qulayjoy.uz"
echo ""
echo "🎯 Deployment complete! Test your website now."

