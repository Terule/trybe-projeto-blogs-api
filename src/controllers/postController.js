const postService = require('../services/postService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await postService.createCategory(name);
  res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
  const categories = await postService.getAllCategories();
  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};