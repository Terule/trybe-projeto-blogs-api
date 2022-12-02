require('dotenv').config();

const { generateToken } = require('../auth/jwtFunctions');
const userService = require('../services/userService');

const makeUserLogin = async (req, res) => {
  const { payload } = req;
  const data = await userService.makeUserLogin(payload);
  const token = generateToken(data);
  res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const userData = req.body;
  const newUser = await userService.createUser(userData);
  if (!newUser.created) return res.status(409).send({ message: 'User already registered' });
  const token = generateToken(newUser.data);
  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const all = await userService.getAllUsers();
  res.status(200).json(all);
};

module.exports = {
  makeUserLogin,
  createUser,
  getAllUsers,
};