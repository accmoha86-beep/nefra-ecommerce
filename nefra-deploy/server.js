// NEFRA Build v8 - Image contain fix + Lightbox modal
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

// Cache static assets for 1 year
app.use('/assets', express.static(join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  immutable: true
}));

// Serve built files
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: '1h'
}));

// SPA fallback — all routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 NEFRA running on port ${PORT}`);
});
