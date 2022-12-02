const { findUserByEmail } = require('../services/userService');

const check = (password, user) => {
  if (user.password !== password) return false;
  return true;
};

const validateEmailFormat = (email) => {
  const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return validator.test(email);
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!email || !password) {
    return res.status(400)
      .send({ message: 'Some required fields are missing' });
  }
  if (!user || !check(password, user)) return res.status(400).send({ message: 'Invalid fields' });
  req.payload = user;
  next();
};

const nameValidation = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length < 8) {
    return res.status(400)
      .send({ message: '"displayName" length must be at least 8 characters long' }); 
  }
  next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  if (!email || !validateEmailFormat(email)) {
    return res.status(400)
      .send({ message: '"email" must be a valid email' }); 
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400)
      .send({ message: '"password" length must be at least 6 characters long' }); 
  }
  next();
};

module.exports = {
  loginValidation,
  nameValidation,
  emailValidation,
  passwordValidation,
};