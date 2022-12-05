const postService = require('../services/postService');

const updateValidation = async (req, res, next) => {
  const { body: { title, content }, params: { id }, user } = req;
  if (!title || !content) return res.status(400).send({ message: 'Some required fields are missing' });
  const post = await postService.getPostById(id);
  if (!post) return res.status(404).send({ message: 'Post does not exist' }); 
  if (user.id !== post.user.id) return res.status(401).send({ message: 'Unauthorized user' });
  next();
};

module.exports = { updateValidation };