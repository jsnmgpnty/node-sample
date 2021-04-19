'use strict';

const express = require('express');
const axios = require('axios');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/app2', (req, res) => {
  axios.get('https://node-app2')
    .then(resp => {
      res.send(resp.data);
    })
    .catch(err => {
      res.send(err);
    });
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
