require('dotenv').config();

const app = require('./app');
const { makeUserLogin, createUser } = require('./controllers/userController');
const {
  loginValidation,
  nameValidation,
  emailValidation,
  passwordValidation,
} = require('./middlewares/userValidation');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginValidation, makeUserLogin);

app.post('/user',
  nameValidation,
  emailValidation,
  passwordValidation,
  createUser);

app.listen(port, () => console.log('ouvindo porta', port));
