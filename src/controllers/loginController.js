const loginService = require('../services/loginService');

const makeUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService.makeUserLogin(email, password);
  res.status(200).json(user);
};

module.exports = {
  makeUserLogin,
};