// NEFRA Build v9 - Fixed cache headers for index.html
import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Gzip compression
app.use(compression());

// Cache static assets for 1 year (filenames are hashed, safe to cache)
app.use('/assets', express.static(join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  immutable: true
}));

// Product images — cache for 1 week
app.use('/products', express.static(join(__dirname, 'dist/products'), {
  maxAge: '7d'
}));

// Serve built files BUT not index.html (handle separately)
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1h',
  index: false  // Don't serve index.html from here
}));

// SPA fallback — all routes serve index.html with NO CACHE
app.get('*', (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 NEFRA running on port ${PORT}`);
});
