const express = require('express');
const cors = require('cors');

const app = express();

const publicConfig = {
  release: '2026.07',
  assetsBaseUrl: 'https://cdn.acme.com/assets',
  checkoutHost: 'https://checkout.acme.com',
  featureFlags: {
    expressCheckout: true,
    profilePreview: true
  }
};

app.use(cors({ origin: '*' }));

app.get('/api/public/config', (req, res) => {
  res.json(publicConfig);
});

module.exports = app;

if (require.main === module) {
  app.listen(process.env.PORT || 3004);
}
