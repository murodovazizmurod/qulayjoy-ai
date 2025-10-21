import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function asyncCssPlugin() {
  return {
    name: 'async-css',
    transformIndexHtml(html: string) {
      // Replace CSS links with async loading
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
        (_match, href) => `
          <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">
          <noscript><link rel="stylesheet" href="${href}"></noscript>
        `
      );
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), asyncCssPlugin()],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://api.qulayjoy.uz/'),
    __HMR_CONFIG_NAME__: JSON.stringify('vite')
  },
  build: {
    minify: 'terser',
    cssCodeSplit: true,
    target: 'esnext',
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core';
          }
          // Router
          if (id.includes('react-router')) {
            return 'router';
          }
          // Mantine UI
          if (id.includes('@mantine/core') || id.includes('@mantine/hooks') || id.includes('@mantine/notifications')) {
            return 'mantine';
          }
          if (id.includes('@mantine/dates') || id.includes('@mantine/modals') || id.includes('@mantine/nprogress') || id.includes('@mantine/spotlight')) {
            return 'mantine-extra';
          }
          // Icons
          if (id.includes('@tabler/icons')) {
            return 'icons';
          }
          // Maps
          if (id.includes('react-yandex-maps')) {
            return 'maps';
          }
          // Forms
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers') || id.includes('yup')) {
            return 'forms';
          }
          // Data fetching
          if (id.includes('@tanstack/react-query') || id.includes('axios')) {
            return 'data';
          }
          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          // Utils
          if (id.includes('dayjs') || id.includes('clsx') || id.includes('currency.js') || 
              id.includes('query-string') || id.includes('radash') || id.includes('store2') ||
              id.includes('use-query-params') || id.includes('react-scroll') || id.includes('react-error-boundary')) {
            return 'utils';
          }
          // Node modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk names
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name || 'unknown';
          const info = fileName.split('.');
          const ext = info[info.length - 1] || 'unknown';
          if (/\.(css)$/.test(fileName)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(fileName)) {
            return `images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    }
  },
  optimizeDeps: { 
    include: [
      'react', 
      'react-dom', 
      '@mantine/core', 
      '@mantine/hooks', 
      '@mantine/dates',
      'react-yandex-maps',
      'dayjs',
      'dayjs/locale/uz-latn',
      'dayjs/locale/ru',
      'dayjs/plugin/isoWeek',
      'dayjs/plugin/relativeTime',
      'dayjs/plugin/utc'
    ],
    exclude: [
      '@mantine/modals', 
      '@mantine/spotlight', 
      '@tanstack/react-virtual',
      'react-window',
      'react-window-infinite-loader'
    ],
    force: true
  },
  server: {
    port: 4002,
    hmr: {
      overlay: true
    },
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
