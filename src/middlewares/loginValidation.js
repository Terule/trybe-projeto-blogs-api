const { findUserByEmail } = require('../services/loginService');

const check = (password, user) => {
  if (user.password !== password) return false;
  return true;
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!email || !password) {
    return res.status(400)
      .send({ message: 'Some required fields are missing' });
  }
  if (!user || !check(password, user)) return res.status(400).send({ message: 'Invalid fields' });
  next();
};

module.exports = {
  loginValidation,
};