#!/bin/bash

# QulayJoy Frontend Deployment Script
# This script helps deploy the application to qulayjoy.uz

set -e  # Exit on any error

echo "🚀 QulayJoy Frontend Deployment Script"
echo "======================================"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found. Please run 'npm run build' first."
    exit 1
fi

echo "✅ Build directory found"

# Get deployment method from user
echo ""
echo "Select deployment method:"
echo "1) Apache2 (Recommended)"
echo "2) Nginx"
echo "3) Copy files only (manual setup)"
echo "4) Test with local server"
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🔧 Deploying with Apache2..."
        
        # Create web directory
        sudo mkdir -p /var/www/qulayjoy.uz/public_html
        
        # Copy files
        echo "📁 Copying files to web directory..."
        sudo cp -r dist/* /var/www/qulayjoy.uz/public_html/
        
        # Set permissions
        echo "🔐 Setting permissions..."
        sudo chown -R www-data:www-data /var/www/qulayjoy.uz/
        sudo chmod -R 755 /var/www/qulayjoy.uz/
        
        # Create Apache virtual host
        echo "⚙️ Creating Apache virtual host..."
        sudo tee /etc/apache2/sites-available/qulayjoy.uz.conf > /dev/null <<EOF
<VirtualHost *:80>
    ServerName qulayjoy.uz
    ServerAlias www.qulayjoy.uz
    DocumentRoot /var/www/qulayjoy.uz/public_html
    
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/javascript
    </IfModule>
    
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
    </IfModule>
</VirtualHost>
EOF
        
        # Enable site and modules
        echo "🔌 Enabling Apache modules and site..."
        sudo a2ensite qulayjoy.uz.conf
        sudo a2enmod rewrite deflate expires headers
        
        # Restart Apache
        echo "🔄 Restarting Apache..."
        sudo systemctl restart apache2
        
        echo "✅ Apache2 deployment complete!"
        echo "🌐 Your site should be available at: http://qulayjoy.uz"
        ;;
        
    2)
        echo "🔧 Deploying with Nginx..."
        
        # Create web directory
        sudo mkdir -p /var/www/qulayjoy.uz
        
        # Copy files
        echo "📁 Copying files to web directory..."
        sudo cp -r dist/* /var/www/qulayjoy.uz/
        
        # Set permissions
        echo "🔐 Setting permissions..."
        sudo chown -R www-data:www-data /var/www/qulayjoy.uz/
        sudo chmod -R 755 /var/www/qulayjoy.uz/
        
        # Create Nginx server block
        echo "⚙️ Creating Nginx server block..."
        sudo tee /etc/nginx/sites-available/qulayjoy.uz > /dev/null <<EOF
server {
    listen 80;
    server_name qulayjoy.uz www.qulayjoy.uz;
    root /var/www/qulayjoy.uz;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
        
        # Enable site
        echo "🔌 Enabling Nginx site..."
        sudo ln -sf /etc/nginx/sites-available/qulayjoy.uz /etc/nginx/sites-enabled/
        
        # Test and restart Nginx
        echo "🔄 Testing Nginx configuration and restarting..."
        sudo nginx -t
        sudo systemctl restart nginx
        
        echo "✅ Nginx deployment complete!"
        echo "🌐 Your site should be available at: http://qulayjoy.uz"
        ;;
        
    3)
        echo "📁 Copy files only..."
        echo "Please specify the target directory:"
        read -p "Target directory: " target_dir
        
        if [ -d "$target_dir" ]; then
            cp -r dist/* "$target_dir/"
            echo "✅ Files copied to $target_dir"
            echo "⚠️ Remember to configure your web server for SPA routing!"
        else
            echo "❌ Error: Directory $target_dir does not exist"
            exit 1
        fi
        ;;
        
    4)
        echo "🧪 Starting local test server..."
        cd dist
        echo "🌐 Test server starting on http://localhost:8080"
        echo "Press Ctrl+C to stop the server"
        python3 -m http.server 8080
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your DNS to point qulayjoy.uz to this server"
echo "2. Set up SSL certificate with Let's Encrypt (recommended)"
echo "3. Test your website thoroughly"
echo "4. Monitor for any errors"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
