require('dotenv').config();

const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

const jwtOption = {
  algorithm: 'HS256',
  expiresIn: '15min',
};

const generateToken = (userData, secret, options) => {
  const token = jwt.sign({ data: userData }, secret, options);
  return token;
};

const makeUserLogin = async (req, res) => {
  const { payload } = req;
  const data = await userService.makeUserLogin(payload);
  const token = generateToken(data, process.env.JWT_SECRET, jwtOption);
  res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const userData = req.body;
  const newUser = await userService.createUser(userData);
  console.log(userData);
  if (!newUser.created) return res.status(409).send({ messagem: 'User already registered' });
  const token = generateToken(newUser.data, process.env.JWT_SECRET, jwtOption);
  res.status(201).json({ token });
};

module.exports = {
  makeUserLogin,
  createUser,
};