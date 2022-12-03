const postService = require('../services/postService');

const categoryNameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).send({ message: '"name" is required' });
  next();
};

const categoryExistsValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400)
      .send({ message: 'Some required fields are missing' }); 
  }
  const categories = await postService.getAllCategories();
  const check = categories.map((category) => categoryIds.includes(category.id));

  if (!check.every((item) => item)) {
    return res.status(400)
      .send({ message: 'one or more "categoryIds" not found' }); 
  }
  
  next();
};

module.exports = {
  categoryNameValidation,
  categoryExistsValidation,
};