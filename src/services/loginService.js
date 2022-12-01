const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

const jwtOption = {
  algorithm: 'HS256',
  expiresIn: '15min',
};

const generateToken = (userData, secret, options) => {
  const token = jwt.sign({ data: userData }, secret, options);
  return token;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const makeUserLogin = async (email, _password) => {
  const user = await findUserByEmail(email);
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = generateToken(userWithoutPassword, process.env.JWT_SECRET, jwtOption);

  return { token };
};

module.exports = {
  findUserByEmail,
  makeUserLogin,
};