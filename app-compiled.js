'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var port = 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log('Listening on port ' + port);
});

//# sourceMappingURL=app-compiled.js.map