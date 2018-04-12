const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
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

moment().format();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static('public'));

// Global vars
app.use(function (req, res, next) {
  res.locals.errors = null;
  res.locals.success = null;
  next();
});

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://zrbayoff:theroad12345@ds239359.mlab.com:39359/thecommentor', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/comments', (req, res) => {
  db
    .collection('comments')
    .find()
    .sort({
      dateAdded: -1
    })
    .toArray((err, result) => {
      if (err) {
        return console.log(err)
      } else {

        let name = result.map(result => result.name);
        let message = result.map(result => result.message);
        let dateAdded = result.map(result => result.dateAdded);

        const comments = [{
          name: name
        }, {
          message: message
        }, {
          dateAdded: dateAdded
        }];
        res.render('comments', {
          comments: {
            name: name,
            message: message,
            dateAdded: dateAdded
          }
        });
      }
    });
});

app.post('/', [
  check('name', 'Please enter your name.').isLength({min: 1}),
  check('message', 'Please write a message.').isLength({min: 1})
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('index', {
      errors: errors.array()
    })
  } else {
    let time = new Date()
    let newComment = req.body;
    newComment['dateAdded'] = time;

    db.collection('comments').save(newComment, (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        res.redirect('/comments');
      }
    });
  }
});

app.delete('/comments/:id', (req,res)=>{
  console.log(req.params.id);
  res.send({type: 'Delete'});
});