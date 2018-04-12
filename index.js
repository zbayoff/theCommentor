const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Middleware: code that runs between request and response
app.use('/api', require('./routes/api'));

app.listen(process.env.port || 9000, () => {
    console.log(`Listening on port 9000!`);
})