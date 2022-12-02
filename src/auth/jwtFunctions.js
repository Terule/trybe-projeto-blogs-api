require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtOption = {
  algorithm: 'HS256',
  expiresIn: '15min',
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, secret, jwtOption);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    return { isError: true, error };
  }
};

module.exports = {
  generateToken,
  verifyToken,
};