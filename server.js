const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// BitChord manifest details
const manifest = {
  id: "com.custom.bitchord.addon",
  name: "Custom BitChord Addon",
  version: "1.0.0",
  description: "Custom audio module for BitChord",
  status: "ok"
};

// 1. Root route (BitChord tests this when adding the URL)
app.get('/', (req, res) => {
  res.status(200).json(manifest);
});

// 2. Health & Status checks
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok", ...manifest });
});

app.get('/status', (req, res) => {
  res.status(200).json({ status: "ok", ...manifest });
});

// 3. Manifest routes
app.get('/manifest.json', (req, res) => {
  res.status(200).json(manifest);
});

// 4. Resolve track endpoint
app.get('/resolve', async (req, res) => {
  const { title, artist } = req.query;
  console.log(`Resolving: ${title} - ${artist}`);

  // Default: returns 404 so BitChord seamlessly plays standard audio
  return res.status(404).json({ error: "Stream not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
