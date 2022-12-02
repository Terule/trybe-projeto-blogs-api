const { verifyToken } = require('../auth/jwtFunctions');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ message: 'Token not found' });
  const payload = verifyToken(authorization);
  if (payload.isError) return res.status(401).send({ message: 'Expired or invalid token' });
  req.user = payload.data;
  next();
};

module.exports = {
  tokenValidation,
};