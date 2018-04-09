const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const {
  check,
  validationResult
} = require('express-validator/check');
const {
  matchedData,
  sanitize
} = require('express-validator/filter');
const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static('public'));

// to connect to database
MongoClient.connect('mongodb://zrbayoff:theroad12345@ds239359.mlab.com:39359/thecommentor', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});

// Post request
app.post('/comments', [
  // check name and message fields for values
  check('name', 'Please enter your name.').isLength({min:1}),
  check('message', 'Please write a message.').isLength({min:1})

], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('there were errors');
  } else {
    db.collection('comments').save(req.body, (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        console.log('saved to database');
        res.redirect('/');
      }
    });
  }
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });