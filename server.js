const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint (used by BitChord to verify addon is active)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    name: 'GitHub BitChord Addon',
    version: '1.0.0'
  });
});

// Stream resolver endpoint
app.get('/resolve', async (req, res) => {
  const { title, artist } = req.query;

  // 404 tells BitChord to fall back to YouTube Music playback
  return res.status(404).json({ error: 'Stream not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
