const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

/* Middleware */

/* const myLogger = (req, res, next) => {
  console.log('LOGGED');
  next();
};

const requestTime = (req, res, next) => {
  req.reqTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime); */

/* Serving static files in Express */

const publicPath = path.resolve(__dirname, 'public');

app.use(publicPath, express.static('static'));

//<img src="public/img_girl.jpg"></img>;
const data = {
  id: 1,
  name: 'India',
};

app.get('/', (req, res) => {
  res.send(`Welcome to my HomePage`);
});

app.get('/weather', (req, res) => {
  res.json(data);
  res.sendFile('/static/index.html');
});

app.get('/about', (req, res) => {
  res.send(`Welcome to my About Page`);
});

app.set('view engine', 'pug');
app.get('/views', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('App Started on PORT 3000'));
