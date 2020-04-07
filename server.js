const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.use('/', express.static(path.join(__dirname, 'build')));

app.listen(port, () =>
  console.log(`Fitness app listening at http://localhost:${port}`)
);
