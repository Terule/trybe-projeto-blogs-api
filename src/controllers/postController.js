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

const createPost = async (req, res) => {
  const {
    body: { title, content, categoryIds: categories },
    user: { id: userId } } = req;
  const post = await postService.createPost({ title, content, categories, userId });

  res.status(201).json(post);
};

const getAllPosts = async (_req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts);
};

module.exports = {
  createCategory,
  getAllCategories,
  createPost,
  getAllPosts,
};