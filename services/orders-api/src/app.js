const express = require('express');
const cors = require('cors');
const ordersRouter = require('./routes/orders');

const allowedOrigins = [
  'https://app.acme.com',
  'https://admin.acme.com',
  'https://acme.com',
  'https://www.acme.com',
  'https://checkout.acme.com',
  'https://partner.example.com'
];

const app = express();

app.use(express.json());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('origin denied'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
}));

app.use('/api/orders', ordersRouter);

module.exports = app;

if (require.main === module) {
  app.listen(process.env.PORT || 3001);
}
