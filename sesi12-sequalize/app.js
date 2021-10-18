const express = require('express');
const app = express();
const port = 8000;
const {User, barang} = require('./models');

app.get('/users', (req, res) => {
  User.findAll({
    include: [barang]
  })
    .then(data => {
      // console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
})
app.listen(port, () => {
  console.log('Listen on port: ', port);
});