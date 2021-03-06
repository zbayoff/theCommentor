'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var _require = require('express-validator/check'),
    check = _require.check,
    validationResult = _require.validationResult;

var _require2 = require('express-validator/filter'),
    matchedData = _require2.matchedData,
    sanitize = _require2.sanitize;

var app = express();
var port = 9000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static('public'));

// to connect to database
MongoClient.connect('mongodb://zrbayoff:theroad12345@ds239359.mlab.com:39359/thecommentor', function (err, database) {
  if (err) return console.log(err);
  db = database;
  app.listen(port, function () {
    console.log('Listening on port ' + port + '!');
  });
});

// Post request
app.post('/comments', [
// check name and message fields for values
check('name', 'Please enter your name.').isLength({ min: 1 }), check('message', 'Please write a message.').isLength({ min: 1 })], function (req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('there were errors');
  } else {
    db.collection('comments').save(req.body, function (err, result) {
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

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });

//# sourceMappingURL=app-compiled.js.map