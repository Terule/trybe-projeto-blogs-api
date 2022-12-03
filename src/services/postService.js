const { Category, BlogPost, sequelize, PostCategory } = require('../models');

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

module.exports = {
  createCategory,
  getAllCategories,
  createPost,
};