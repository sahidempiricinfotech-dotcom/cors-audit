const express = require('express');
const cors = require('cors');

const router = express.Router();

const sessionCors = cors({
  origin: ['https://app.acme.com', 'https://admin.acme.com'],
  credentials: true,
  methods: ['DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
});

const revokedSessions = new Set();

router.delete('/:id', sessionCors, (req, res) => {
  revokedSessions.add(req.params.id);
  res.json({
    id: req.params.id,
    revoked: true,
    revokedBy: req.body.revokedBy || req.user?.id || 'system'
  });
});

module.exports = router;
