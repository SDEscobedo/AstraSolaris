import { resolve } from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5176,
    strictPort: true,
    host: true,
    open: false,
    cors: true,
  },
  preview: {
    port: 5176,
    strictPort: true,
    host: true,
    open: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@astra-solaris/shared': resolve(__dirname, '../../packages/shared/src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          three: ['three'],
          tween: ['@tweenjs/tween.js'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name ?? '';
          if (/\.(woff2?|ttf|eot|otf)$/.test(info)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(info)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(info)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
  },
  esbuild: {
    target: 'es2022',
    legalComments: 'none',
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  optimizeDeps: {
    include: ['three', '@tweenjs/tween.js'],
    exclude: [],
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? '2.0.0'),
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
});