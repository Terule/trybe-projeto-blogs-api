const { User } = require('../models');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const findUserById = async (id) => {
  const user = await User.findByPk(id);
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

const getAllUsers = async () => {
  const all = await User.findAll();
  return all.map((user) => {
    const { password: _, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  });
};

const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    return user;
  }
  const { password: _, ...userWithoutPassword } = user.dataValues;
  return userWithoutPassword;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  findUserByEmail,
  makeUserLogin,
  createUser,
  getAllUsers,
  getUserById,
  findUserById,
  deleteUser,
};