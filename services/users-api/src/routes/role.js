const express = require('express');

const router = express.Router();

const roleChanges = [];

router.put('/users/:id/role', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const change = {
    userId: req.params.id,
    previousRole: req.body.previousRole || 'buyer',
    nextRole: req.body.role,
    changedBy: req.body.changedBy,
    changedAt: new Date().toISOString()
  };

  roleChanges.push(change);
  res.json({ userId: change.userId, role: change.nextRole, changedBy: change.changedBy });
});

module.exports = router;
