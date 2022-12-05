const postService = require('../services/postService');

const deletePostValidation = async (req, res, next) => {
  const { params: { id }, user } = req;
  const post = await postService.getPostById(id);
  if (!post) return res.status(404).send({ message: 'Post does not exist' }); 
  if (user.id !== post.user.id) return res.status(401).send({ message: 'Unauthorized user' });
  next();
};

module.exports = { deletePostValidation };