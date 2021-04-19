'use strict';

const express = require('express');
const axios = require('axios');
const mongodb = require('mongodb');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
let db;
const APP_NAME = process.env.APP_NAME ?? 'APP1';
let CONN_STRING = process.env.MONGODB_CONN_STRING ?? 'mongodb://localhost:27017/xccelerate_jobs';

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
  db.collection('JobPosts').find({}).toArray(function (err, jobs) {
    res.json(jobs);
  });
});

mongodb.connect(
  CONN_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    if (err) {
      app.listen(PORT, HOST, () => {
        console.log(`${APP_NAME} Running on http://${HOST}:${PORT}`);
      });
    } else {
      db = client.db();
      app.listen(PORT, HOST, () => {
        console.log(`${APP_NAME} Running on http://${HOST}:${PORT}`);
      });
    }
  }
);
