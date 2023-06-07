const express = require('express');
const path = require('path');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const port = process.env.PORT || 3000;
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your secret key',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookies());

app.get('/', (req, res) => {
  //req.session.name = 'John';
  return res.send('Session Set');
  //res.render('index', { title: 'Form Handling' });
});

app.get('/setuser', (req, res) => {
  res.cookie('userData', { name: 'John', age: 28 });
  return res.send('user Data Added to Cookies');
});

app.get('/getuser', (req, res) => {
  return res.send(req.cookies);
});

app.get('/logout', (req, res) => {
  res.clearCookie('userData');
  return res.send('User logout successfully');
});

app.get('/session', (req, res) => {
  const name = req.session.name;
  return res.send(name);
});

app.get('/destroy', (req, res) => {
  req.session.destroy((err) => console.log('session destroyed'));
  return res.end();
});

app.post('/form_submit', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  res.send(`Your Username is:${username} and Email is ${email}`);
});

app.listen(port, () =>
  console.log(`Listening to requests on http://localhost:${port}`)
);
