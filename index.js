'use strict';

const express = require('express');
const axios = require('axios');
const mongodb = require('mongodb');

// Constants
const HOST = '0.0.0.0';
let db;
const APP_NAME = process.env.APP_NAME ?? 'APP1';
const CONN_STRING = process.env.MONGODB_CONN_STRING ?? 'mongodb://localhost:27017/xccelerate_jobs';
const APP_PORT = process.env.APP_PORT ?? 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send(`Hello World from ${APP_NAME}`);
});
app.get('/other-app', (req, res) => {
  const url = APP_NAME === 'APP1' ? 'node-app2' : 'node-app';
  axios.get(`https://${url}`)
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
      app.listen(APP_PORT, HOST, () => {
        console.log(`${APP_NAME} Running on http://${HOST}:${APP_PORT}`);
      });
    } else {
      db = client.db();
      app.listen(APP_PORT, HOST, () => {
        console.log(`${APP_NAME} Running on http://${HOST}:${APP_PORT}`);
      });
    }
  }
);
