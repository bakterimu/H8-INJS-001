const express = require('express');
const port = 8000;
const app = express();
const route = require('./routes/index.js');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use(route);

app.listen(port, () => {
  console.log('Listening on port ', port);
});