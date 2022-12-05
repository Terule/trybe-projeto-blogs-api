require('dotenv').config();
const app = require('./app');

const { 
  makeUserLogin,
  createUser, 
  getAllUsers,
  getUserById,
} = require('./controllers/userController');

const {
  loginValidation,
  userNameValidation,
  emailValidation,
  passwordValidation,
} = require('./middlewares/userValidation');

const { tokenValidation } = require('./middlewares/tokenValidation');
const {
  categoryNameValidation,
  categoryExistsValidation,
} = require('./middlewares/postValidation');
const { 
  createCategory,
  getAllCategories,
  createPost,
  getAllPosts,
  getPostById,
} = require('./controllers/postController');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginValidation, makeUserLogin);

app.post('/user',
  userNameValidation,
  emailValidation,
  passwordValidation,
  createUser);

app.get('/user', tokenValidation, getAllUsers);
app.get('/user/:id', tokenValidation, getUserById);

app.get('/categories', tokenValidation, getAllCategories);
app.post('/categories', tokenValidation, categoryNameValidation, createCategory);

app.post('/post',
tokenValidation,
categoryExistsValidation,
createPost);

app.get('/post', tokenValidation, getAllPosts);
app.get('/post/:id', tokenValidation, getPostById);

app.listen(port, () => console.log('ouvindo porta', port));
