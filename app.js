const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/authenticate-token', (req, res) => {
  res.json({ token: 'abc' });
});

app.get('/authenticate-cookie', (req, res) => {
  res.cookie('token', 'abc', { httpOnly: true });
  res.json({ message: 'Token cookie set!' });
});

app.get('/user-data', (req, res) => {
  // Parse token from headers
  const authHeader = req.headers.authorization;
  let token = authHeader.split(' ')[1]; // For "Bearer TOKEN" => get TOKEN
  if (!token || token === 'undefined') { // If token can't be found in "authorization" header, check cookies
    token = req.headers.cookie
      .split('; ')
      .find((c) => c.startsWith('token'))
      .split('=')[1];
  }
  console.log('Token: ' + token);
  if (token === 'abc') {
    // dummy validation, would verify JWT here in reality
    res.json({ message: 'Success!', data: 'Some super secret data!' });
  } else {
    res.status(401).json({ message: 'Error! Unauthorized!' });
  }
});

app.listen(3000);
