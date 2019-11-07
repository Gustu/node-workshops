const Jwt = require('../Jwt');

const jwtAuthentication = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    const decoded = Jwt.decode(token);
    req.user = decoded.accountId;
    next();
  } else {
    next();
  }
};

module.exports = jwtAuthentication;
