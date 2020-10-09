'use strict';
const express = require('express');
const { uuid } = require('uuidv4');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// fake data trick
const data = require('./book.json');

app.get('/book', function (req, res) {
  readBooks(req, res);
});
app.post('/book', urlencodedParser, function (req, res) {
  console.log(req.body);
  creatBooks(req, res);
});
app.put('/book/:id', function (req, res) {
  updateBooks(req, res);
});
app.delete('/book/:id', urlencodedParser, function (req, res) {
  deleteBooks(req, res);
});

function readBooks(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}
function creatBooks(req, res) {
  if (isInvalid(req)) {
    res.status(400);
    res.send('invalid request');
    return;
  }
  const id = uuid();
  let newBook = {
    id: id,
    title: req.body.title,
    author: req.body.author,
  };
  data.push(newBook);
  res.status(201);
  res.send(id);
}
function updateBooks(req, res) {
  if (isInvalid(req)) {
    res.status(400);
    res.send('invalid request');
    return;
  }
  const bookToUpdate = data.find((book) => book.id == req.params.id);
  if (typeof bookToUpdate == 'undefined') {
    res.status(404);
    res.send('no such book');
    return;
  }

  bookToUpdate.title = req.body.title;
  bookToUpdate.author = req.body.author;
  res.send('ok');
}
function deleteBooks(req, res) {
  const bookToDelete = data.find((book) => book.id == req.params.id);
  if (typeof bookToDelete == 'undefined') {
    res.status(404);
    res.send('no such book');
    return;
  }
  data.splice(data.indexOf(bookToDelete), 1);
  res.send('ok');
}

function isInvalid(req) {
  if (
    typeof req.body.title == 'undefined' ||
    typeof req.body.author == 'undefined'
  ) {
    return true;
  } else {
    return false;
  }
}
const PORT = process.env.PORT || 3000;
app.listen(PORT);
