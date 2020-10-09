const { default: Axios } = require('axios');
var express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var app = express();
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('puplic'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// the Routs

app.get('/', function (req, res) {
  Axios.get('http://localhost:3000/book')
    .then((response) => {
      const array = response.data;
      res.render('home', { array });
    })
    .catch((error) => console.error(error.response.status));
});
app.get('/form', function (req, res) {
  res.render('form');
});
app.post('/form', urlencodedParser, function (req, res) {
  Axios.post('http://localhost:3000/book', {
    title: req.body.title,
    author: req.body.author,
  })
    .then((response) => {
      console.log(response.status);
      res.redirect('/');
    })
    .catch((error) => {
      console.error(error.response.status);
    });
});

app.delete('/book/:id', function (req, res) {
  const id = req.params.id;
  Axios.delete(`http://localhost:3000/book/${id}`)
    .then(() => {
      res.json({ redirect: '/' });
    })
    .catch((error) => console.error(error.response.status));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT);
