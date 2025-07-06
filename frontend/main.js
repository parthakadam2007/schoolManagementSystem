import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// This is needed when using ES modules instead of CommonJS (__dirname isn’t defined)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from dist
app.use(express.static('dist'));

// For SPA: always send index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('Running on http://localhost:3000');
});
