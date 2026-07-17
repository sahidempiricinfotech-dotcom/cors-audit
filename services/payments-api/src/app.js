const express = require('express');
const chargeRouter = require('./routes/charge');

const app = express();

app.use(express.json());
app.use('/api/payments', chargeRouter);

module.exports = app;

if (require.main === module) {
  app.listen(process.env.PORT || 3002);
}
