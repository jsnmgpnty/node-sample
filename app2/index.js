'use strict';

const express = require('express');
const mongodb = require('mongodb');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';
let db;
let connString = process.env.MONGODB_CONN_STRING;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World from App2');
});
app.get('/jobs', (req, res) => {
  db.collection('Jobs').find({}).toArray(function (err, jobs) {
    res.json(jobs);
  });
});

mongodb.connect(
  connString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db();
    app.listen(PORT, HOST, () => {
      console.log(`Running on http://${HOST}:${PORT}`);
    });
  }
);

