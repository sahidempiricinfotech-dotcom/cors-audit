const express = require('express');
const cors = require('cors');

const router = express.Router();

const loginCors = cors({
  origin: ['https://app.acme.com', 'https://admin.acme.com', 'https://acme.com'],
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
});

const sessions = new Map();

router.options('/login', loginCors);

router.post('/login', loginCors, (req, res) => {
  const session = {
    id: `sess_${Date.now()}`,
    email: req.body.email,
    accountId: req.body.accountId,
    createdAt: new Date().toISOString()
  };

  sessions.set(session.id, session);
  res.cookie('sid', session.id, { httpOnly: true, sameSite: 'none', secure: true });
  res.status(201).json({ id: session.id, email: session.email, accountId: session.accountId });
});

module.exports = router;
