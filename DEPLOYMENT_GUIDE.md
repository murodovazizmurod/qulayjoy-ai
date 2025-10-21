# QulayJoy Frontend Deployment Guide

## 🚀 Production Build Complete!

Your application has been successfully built and is ready for deployment to **qulayjoy.uz**.

## 📁 Build Output

The production build is located in the `dist/` directory with the following structure:
```
dist/
├── index.html          # Main HTML file
├── assets/             # Static assets
├── css/                # Compiled CSS files
├── js/                 # JavaScript bundles
├── images/             # Image assets
├── _redirects          # SPA routing configuration
├── robots.txt          # SEO robots file
└── sw.js              # Service worker for caching
```

## 🌐 Deployment Options

### Option 1: Apache2 Web Server (Recommended)

#### 1. Copy Files to Web Directory
```bash
# Copy the dist folder contents to your web server directory
sudo cp -r dist/* /var/www/html/qulayjoy.uz/
# OR if you have a specific directory for the domain
sudo cp -r dist/* /var/www/qulayjoy.uz/public_html/
```

#### 2. Configure Apache Virtual Host
Create a virtual host configuration file:
```bash
sudo nano /etc/apache2/sites-available/qulayjoy.uz.conf
```

Add the following configuration:
```apache
<VirtualHost *:80>
    ServerName qulayjoy.uz
    ServerAlias www.qulayjoy.uz
    DocumentRoot /var/www/qulayjoy.uz/public_html
    
    # Enable mod_rewrite for SPA routing
    RewriteEngine On
    
    # Handle SPA routing - redirect all requests to index.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    
    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    </IfModule>
    
    # Cache static assets
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
    </IfModule>
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
```

#### 3. Enable the Site and Restart Apache
```bash
# Enable the site
sudo a2ensite qulayjoy.uz.conf

# Enable required modules
sudo a2enmod rewrite
sudo a2enmod deflate
sudo a2enmod expires
sudo a2enmod headers

# Restart Apache
sudo systemctl restart apache2
```

### Option 2: Nginx Web Server

#### 1. Copy Files to Web Directory
```bash
sudo cp -r dist/* /var/www/qulayjoy.uz/
```

#### 2. Configure Nginx Virtual Host
Create a server block configuration:
```bash
sudo nano /etc/nginx/sites-available/qulayjoy.uz
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name qulayjoy.uz www.qulayjoy.uz;
    root /var/www/qulayjoy.uz;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

#### 3. Enable the Site and Restart Nginx
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/qulayjoy.uz /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Option 3: Simple HTTP Server (For Testing)

If you just want to test the deployment locally:
```bash
cd dist
python3 -m http.server 8080
# OR
npx serve -s . -l 8080
```

## 🔒 SSL Certificate (Recommended)

For production, you should enable HTTPS:

### Using Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-apache
# OR for Nginx
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --apache -d qulayjoy.uz -d www.qulayjoy.uz
# OR for Nginx
sudo certbot --nginx -d qulayjoy.uz -d www.qulayjoy.uz
```

## 📊 Performance Optimizations Included

Your build includes several performance optimizations:
- ✅ **Code splitting** - JavaScript bundles are split for faster loading
- ✅ **Asset optimization** - Images and CSS are optimized
- ✅ **Service worker** - Caching for offline support
- ✅ **Gzip compression** - Reduced file sizes
- ✅ **Cache headers** - Browser caching for static assets

## 🔍 Post-Deployment Checklist

1. **Test the website**: Visit `http://qulayjoy.uz` (or `https://qulayjoy.uz` with SSL)
2. **Check routing**: Navigate to different pages to ensure SPA routing works
3. **Test mobile**: Verify responsive design on mobile devices
4. **Check performance**: Use browser dev tools to verify fast loading
5. **Monitor errors**: Check browser console for any JavaScript errors

## 🚨 Troubleshooting

### Common Issues:

1. **404 errors on page refresh**: Ensure mod_rewrite is enabled and .htaccess rules are working
2. **Assets not loading**: Check file permissions and paths
3. **Slow loading**: Verify compression and caching are enabled
4. **CORS errors**: Ensure your API backend allows requests from qulayjoy.uz

### File Permissions:
```bash
# Set proper permissions
sudo chown -R www-data:www-data /var/www/qulayjoy.uz/
sudo chmod -R 755 /var/www/qulayjoy.uz/
```

## 📞 Support

If you encounter any issues during deployment, check:
- Apache/Nginx error logs: `/var/log/apache2/error.log` or `/var/log/nginx/error.log`
- Browser developer console for JavaScript errors
- Network tab for failed requests

---

**🎉 Congratulations! Your QulayJoy application is ready for production deployment!**
