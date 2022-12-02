const { User } = require('../models');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const makeUserLogin = async (user) => {
  const { password: _, ...userWithoutPassword } = user.dataValues;
  
  return userWithoutPassword;
};

const createUser = async ({ displayName, email, password, image }) => {
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      displayName,
      email,
      password,
      image,
    },
  });
  const { password: _, ...newUserWithoutPassword } = newUser.dataValues;
  return { data: newUserWithoutPassword, created };
};

module.exports = {
  findUserByEmail,
  makeUserLogin,
  createUser,
};