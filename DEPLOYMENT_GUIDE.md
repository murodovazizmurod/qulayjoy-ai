# QulayJoy Deployment Guide
# Deploy to server 66.42.57.79 with domain qulayjoy.uz

## Prerequisites
- Local machine with built project
- Server access (SSH) to 66.42.57.79
- Domain qulayjoy.uz pointing to your server IP

## Step 1: Build Your Project Locally

```bash
# Navigate to your project directory
cd /home/azizmurod/Projects/qulayjoy-front/qulayjoy-front

# Install dependencies (if needed)
npm install --legacy-peer-deps

# Build the project
npm run build

# Verify build was successful
ls -la dist/
```

## Step 2: Create Deployment Package

```bash
# Create a compressed archive of your built project
tar -czf qulayjoy-frontend.tar.gz -C dist .

# Verify the archive was created
ls -la qulayjoy-frontend.tar.gz
```

## Step 3: Upload to Server

```bash
# Upload the built project to your server
scp qulayjoy-frontend.tar.gz root@66.42.57.79:/root/

# Upload deployment script
scp deploy-qulayjoy.sh root@66.42.57.79:/root/
```

## Step 4: Deploy on Server

```bash
# SSH to your server
ssh root@66.42.57.79

# Make deployment script executable
chmod +x deploy-qulayjoy.sh

# Run the deployment script
./deploy-qulayjoy.sh
```

## Step 5: Configure Domain and SSL (Optional)

```bash
# Install Certbot for SSL certificates
apt update
apt install -y certbot python3-certbot-nginx

# Get SSL certificate for your domain
certbot --nginx -d qulayjoy.uz -d www.qulayjoy.uz

# Test SSL renewal
certbot renew --dry-run
```

## Step 6: Verify Deployment

1. **Check Nginx status:**
   ```bash
   systemctl status nginx
   ```

2. **Test your website:**
   - Visit: http://qulayjoy.uz
   - Visit: https://qulayjoy.uz (if SSL is configured)

3. **Check logs if needed:**
   ```bash
   tail -f /var/log/nginx/qulayjoy.uz_error.log
   tail -f /var/log/nginx/qulayjoy.uz_access.log
   ```

## Troubleshooting

### If you see React errors:
1. Check browser console for JavaScript errors
2. Verify all JS files are loading correctly
3. Check Nginx configuration for proper MIME types

### If you see 404 errors:
1. Verify SPA routing is configured in Nginx
2. Check that `try_files` directive includes `/index.html`

### If you see permission errors:
1. Check file ownership: `ls -la /var/www/qulayjoy.uz/`
2. Fix permissions: `chown -R www-data:www-data /var/www/qulayjoy.uz/`

## File Structure After Deployment

```
/var/www/qulayjoy.uz/
├── index.html
├── css/
│   ├── mantine-*.css
│   └── index-*.css
├── js/
│   ├── react-core-*.js
│   ├── vendor-*.js
│   ├── index-*.js
│   └── other-*.js
└── assets/
    └── images/
```

## Nginx Configuration

The deployment script will create:
- `/etc/nginx/sites-available/qulayjoy.uz`
- `/etc/nginx/sites-enabled/qulayjoy.uz`

## Security Features Included

- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Content Security Policy
- Gzip compression
- CORS headers for API calls
- Proper MIME types

## Performance Features Included

- Static file caching (1 year)
- Gzip compression
- Resource preloading
- Optimized bundle splitting

## Maintenance

### Update Deployment:
1. Build locally: `npm run build`
2. Create new archive: `tar -czf qulayjoy-frontend.tar.gz -C dist .`
3. Upload: `scp qulayjoy-frontend.tar.gz root@66.42.57.79:/root/`
4. Deploy: `ssh root@66.42.57.79` then `./deploy-qulayjoy.sh`

### Backup:
```bash
# Backup current deployment
tar -czf /root/qulayjoy-backup-$(date +%Y%m%d).tar.gz -C /var/www qulayjoy.uz/
```

## Support

If you encounter issues:
1. Check Nginx error logs
2. Verify domain DNS settings
3. Check server resources (memory, disk space)
4. Ensure all required ports are open (80, 443)