const jwt = require('jsonwebtoken');

const generateToken = (accountId) => jwt.sign({ accountId }, process.env.JWT_SECRET);

const decode = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  generateToken,
  decode,
};
