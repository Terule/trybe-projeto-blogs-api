const { Op } = require('sequelize');
const { Category, BlogPost, sequelize, PostCategory, User } = require('../models');

const postOptions = {
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
};

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
  const posts = await BlogPost.findAll(postOptions);
  return posts.map((post) => post.dataValues);
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, postOptions);
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

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const searchPosts = async (query) => {
  if (!query) {
    const posts = await BlogPost.findAll(postOptions);
    return posts;
  }
  const posts = await BlogPost.findAll({
    include: postOptions.include,
    where: {
      [Op.or]: {
        title: { [Op.like]: query },
        content: { [Op.like]: query },
      },
    },
  });
  return posts;
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