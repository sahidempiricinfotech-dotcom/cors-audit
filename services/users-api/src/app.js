const express = require('express');
const cors = require('cors');
const roleRouter = require('./routes/role');
const sessionsRouter = require('./routes/sessions');
const loginRouter = require('./routes/login');

const userOrigins = [
  'https://app.acme.com',
  'https://admin.acme.com',
  'https://acme.com',
  'https://www.acme.com',
  'https://staging-old.acme.com'
];

const users = new Map([
  ['u_100', { id: 'u_100', email: 'ada@acme.com', role: 'buyer', accountId: 'acct_100' }],
  ['u_200', { id: 'u_200', email: 'grace@acme.com', role: 'admin', accountId: 'acct_200' }]
]);

const app = express();

app.use(express.json());
app.use('/api/sessions', sessionsRouter);
app.use('/api', loginRouter);

app.use(cors({
  origin(origin, callback) {
    if (!origin || userOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('origin denied'));
  },
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
}));

app.get('/api/users/:id', (req, res) => {
  const user = users.get(req.params.id) || {
    id: req.params.id,
    email: `${req.params.id}@acme.com`,
    role: 'buyer',
    accountId: 'acct_unknown'
  };

  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    accountId: user.accountId
  });
});

app.use('/api', roleRouter);

module.exports = app;

if (require.main === module) {
  app.listen(process.env.PORT || 3003);
}
