const express = require('express');
const cors = require('cors');

const router = express.Router();

const paymentOrigins = [
  'https://app.acme.com',
  'https://checkout.acme.com'
];

const preflightCors = cors({
  origin: paymentOrigins,
  credentials: true,
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
});

const chargeCors = cors({
  origin: paymentOrigins,
  credentials: true,
  methods: ['POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
});

const charges = new Map();

router.options('/charge', preflightCors);

router.post('/charge', chargeCors, (req, res) => {
  const charge = {
    id: req.body.id || `ch_${Date.now()}`,
    accountId: req.body.accountId,
    orderId: req.body.orderId,
    amount: Number(req.body.amount || 0),
    currency: req.body.currency || 'USD',
    paymentInstrument: req.body.paymentInstrument,
    status: 'captured'
  };

  charges.set(charge.id, charge);
  res.status(201).json({ id: charge.id, status: charge.status, amount: charge.amount });
});

router.delete('/charge', chargeCors, (req, res) => {
  const charge = charges.get(req.body.id) || {
    id: req.body.id,
    accountId: req.body.accountId,
    amount: Number(req.body.amount || 0)
  };

  charges.set(charge.id, { ...charge, status: 'voided' });
  res.json({ id: charge.id, status: 'voided' });
});

module.exports = router;
