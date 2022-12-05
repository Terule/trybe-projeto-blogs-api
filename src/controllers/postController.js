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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  if (!post) return res.status(404).send({ message: 'Post does not exist' });
  res.status(200).json(post.dataValues);
};

const updatePost = async (req, res) => {
  const { body: { title, content }, params: { id } } = req;
  const post = await postService.updatePost({ id, title, content });
  res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postService.deletePost(id);
  res.status(204).end();
};

const searchPosts = async (req, res) => {
  const { q } = req.query;
  const posts = await postService.searchPosts(q || '');

  res.status(200).json(posts);
};

module.exports = {
  createCategory,
  getAllCategories,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};