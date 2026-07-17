const express = require('express');
const cors = require('cors');

const router = express.Router();

const orders = new Map();
const cancelCors = cors({
  origin: 'https://admin.acme.com',
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
});

router.post('/', (req, res) => {
  const order = {
    id: req.body.id || `ord_${Date.now()}`,
    accountId: req.body.accountId,
    items: Array.isArray(req.body.items) ? req.body.items : [],
    paymentToken: req.body.paymentToken,
    createdAt: new Date().toISOString()
  };

  orders.set(order.id, order);
  res.status(201).json({ id: order.id, itemCount: order.items.length, accountId: order.accountId });
});

router.post('/:id/cancel', cancelCors, (req, res) => {
  const existing = orders.get(req.params.id) || {
    id: req.params.id,
    accountId: req.body.accountId,
    items: []
  };

  const canceled = {
    ...existing,
    status: 'canceled',
    canceledBy: req.body.adminUser,
    cancelReason: req.body.reason || 'unspecified',
    canceledAt: new Date().toISOString()
  };

  orders.set(req.params.id, canceled);
  res.json({ id: canceled.id, status: canceled.status, canceledBy: canceled.canceledBy });
});

module.exports = router;
