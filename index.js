'use strict';

const express = require('express');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
let db;
const APP_NAME = process.env.APP_NAME;
let CONN_STRING = process.env.MONGODB_CONN_STRING;

// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Hello World from ${APP_NAME}`);
});
app.get('/app2', (req, res) => {
  axios.get('https://node-app2')
    .then(resp => {
      res.send(resp.data);
    })
    .catch(err => {
      res.send(err);
    });
});
app.get('/jobs', (req, res) => {
  db.collection('Jobs').find({}).toArray(function (err, jobs) {
    res.json(jobs);
  });
});

mongodb.connect(
  CONN_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db();
    app.listen(PORT, HOST, () => {
      console.log(`${APP_NAME} Running on http://${HOST}:${PORT}`);
    });
  }
);
