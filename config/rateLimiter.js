const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 1 hour window
  max: 100, // limit each IP to 100 requests per windowMs
});

module.exports = { limiter };
