const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return category.dataValues;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  console.log(categories);
  return categories.map((category) => category.dataValues);
};

module.exports = {
  createCategory,
  getAllCategories,
};