import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for CDN-like behavior
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Set appropriate cache headers for CDN-like serving
app.use((req, res, next) => {
  // Cache static assets for 1 year
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.url.match(/\.(html|json)$/)) {
    // Don't cache HTML and JSON files
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

// Serve static files from the dist directory with directory listing
app.use(express.static(path.join(__dirname, 'dist'), {
  dotfiles: 'allow',
  index: false,
  setHeaders: (res, filepath) => {
    // Set appropriate Content-Type headers
    if (filepath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filepath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Optional: List all available files at the root
app.get('/', async (req, res) => {
  try {
    const distPath = path.join(__dirname, 'dist');
    const files = await readdir(distPath, { recursive: true });
    
    const fileList = files
      .filter(file => !file.includes('node_modules'))
      .map(file => `<li><a href="/${file}">${file}</a></li>`)
      .join('');
    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Lit Component CDN</title>
          <style>
            body { font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px; }
            h1 { color: #324fff; }
            ul { line-height: 1.8; }
            a { color: #324fff; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>📦 Lit Component CDN</h1>
          <p>Available files:</p>
          <ul>${fileList}</ul>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error reading dist directory');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CDN Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'dist')}`);
  console.log(`💡 Access files at: http://localhost:${PORT}/<filename>`);
});
