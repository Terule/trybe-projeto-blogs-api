const { Category, BlogPost, sequelize, PostCategory, User } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return category.dataValues;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories.map((category) => category.dataValues);
};

const createPost = async ({
  title,
  content,
  userId,
  categories,
}) => {
  const result = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({ title, content, userId }, { transaction: t });
    await Promise.all(categories.map(async (categoryId) => PostCategory
    .create({ postId: post.dataValues.id, categoryId }, { transaction: t })));

    return post;
  });
  return result;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts.map((post) => post.dataValues);
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePost = async ({ id, content, title }) => {
  await BlogPost.update({
    title,
    content,
    updated: Date.now(),
  },
  {
    where: { id },
  });
  const post = await getPostById(id);
  return post;
};

module.exports = {
  createCategory,
  getAllCategories,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};