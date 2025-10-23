#!/bin/bash

# Quick React Fix for QulayJoy
# Fixes the React useLayoutEffect error by updating the HTML file

echo "🔧 Quick React Fix for QulayJoy"
echo "==============================="

# Check if we're running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (use sudo)"
    exit 1
fi

echo "📁 Current directory: $(pwd)"

# Backup current index.html
echo "💾 Backing up current index.html..."
cp /var/www/qulayjoy.uz/index.html /var/www/qulayjoy.uz/index.html.backup.$(date +%Y%m%d_%H%M%S)

# Create the fixed index.html
echo "🔧 Creating React-first index.html..."
cat > /var/www/qulayjoy.uz/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    
    <!-- Critical resource hints -->
    <link rel="preconnect" href="https://api.qulayjoy.uz" crossorigin />
    <link rel="dns-prefetch" href="https://api.qulayjoy.uz" crossorigin />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Preload critical fonts -->
    <link
      rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      media="print"
      onload="this.media='all'"
    />
    <noscript
      ><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    /></noscript>
    
    <!-- Meta tags for performance -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Qulay Joy - Toshkent shahridan qulay turar joy topish" />
    <meta name="keywords" content="qulay joy, qulay turar joy, qulay turar joy topish, kvartira, kvartira topish" />
    
    <!-- Performance hints -->
    <meta name="theme-color" content="#3b82f6" />
    <meta name="color-scheme" content="light" />
    
    <title>Qulay Joy</title>
    
    <!-- Load CSS first -->
    <link rel="stylesheet" href="/css/mantine-62a376d6.css">
    <link rel="stylesheet" href="/css/index-07205371.css">
    
    <!-- CRITICAL: Load React FIRST as a regular script (not module) -->
    <script src="/js/react-core-8f9897d8.js"></script>
    
    <!-- Then preload other modules -->
    <link rel="modulepreload" crossorigin href="/js/vendor-62d4360a.js">
    <link rel="modulepreload" crossorigin href="/js/utils-6bf35f5c.js">
    <link rel="modulepreload" crossorigin href="/js/i18n-4a8b3c80.js">
    <link rel="modulepreload" crossorigin href="/js/data-8ef649b9.js">
    <link rel="modulepreload" crossorigin href="/js/mantine-c5bde370.js">
    <link rel="modulepreload" crossorigin href="/js/forms-9e7ff37b.js">
    <link rel="modulepreload" crossorigin href="/js/mantine-extra-ee45a79a.js">
    
    <!-- Load main application script as ES module -->
    <script type="module" crossorigin src="/js/index-eed17995.js"></script>
    
    <!-- Fallback for older browsers -->
    <script>
      // Check if modules are supported
      if (!('noModule' in HTMLScriptElement.prototype)) {
        console.warn('ES modules not supported, loading fallback...');
        // Fallback for browsers that don't support ES modules
        document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Inter, sans-serif;"><div style="text-align: center;"><h2 style="color: #ef4444; margin-bottom: 16px;">Browser not supported</h2><p style="color: #6b7280;">Please use a modern browser that supports ES modules.</p></div></div>';
      }
    </script>
  </head>
  <body>
    <div id="root">
      <!-- Loading fallback -->
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Inter, sans-serif;">
        <div style="text-align: center;">
          <div style="width: 40px; height: 40px; border: 4px solid #e5e7eb; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
          <p style="color: #6b7280; font-size: 16px;">Qulay Joy yuklanmoqda...</p>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    
    <!-- Error handling script -->
    <script>
      window.addEventListener('error', function(e) {
        console.error('Application error:', e.error);
        // Hide loading spinner on error
        const root = document.getElementById('root');
        if (root && root.children.length > 0) {
          root.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Inter, sans-serif;"><div style="text-align: center;"><h2 style="color: #ef4444; margin-bottom: 16px;">Xatolik yuz berdi</h2><p style="color: #6b7280;">Sahifa yuklanmadi. Sahifani yangilang.</p><button onclick="location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Qayta urinish</button></div></div>';
        }
      });
      
      // Check if React loaded properly after a delay
      window.addEventListener('load', function() {
        setTimeout(function() {
          // Check if the loading spinner is still there (indicating React didn't load)
          const root = document.getElementById('root');
          const loadingDiv = root.querySelector('div[style*="animation: spin"]');
          if (loadingDiv) {
            console.error('React application failed to load');
            root.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Inter, sans-serif;"><div style="text-align: center;"><h2 style="color: #ef4444; margin-bottom: 16px;">React yuklanmadi</h2><p style="color: #6b7280;">JavaScript fayllari to\'g\'ri yuklanmadi.</p><button onclick="location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">Qayta urinish</button></div></div>';
          }
        }, 5000);
      });
    </script>
  </body>
</html>
EOF

# Set proper permissions
echo "🔐 Setting permissions..."
chown www-data:www-data /var/www/qulayjoy.uz/index.html
chmod 644 /var/www/qulayjoy.uz/index.html

# Reload Nginx
echo "🔄 Reloading Nginx..."
systemctl reload nginx

echo ""
echo "✅ React fix applied successfully!"
echo ""
echo "🔧 What was fixed:"
echo "   - React loads FIRST as regular script (not module)"
echo "   - Vendor bundle loads AFTER React is available"
echo "   - Proper loading order prevents useLayoutEffect errors"
echo "   - Added loading state and error handling"
echo ""
echo "🌐 Test your website:"
echo "   http://qulayjoy.uz"
echo ""
echo "🔍 Check browser console - the React error should be gone!"
echo ""
echo "📁 Backup created:"
echo "   /var/www/qulayjoy.uz/index.html.backup.$(date +%Y%m%d_%H%M%S)"
echo ""
echo "🎯 The 'useLayoutEffect' error should now be resolved!"

