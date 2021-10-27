const express = require('express');
const jwt = require('jsonwebtoken');
const port = 8000;
const app = express();
const db = require('./data.json');
const { response } = require('express');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json({page: 'Home'});
});

app.post('/login', (req, res) => {
  user = db.find(element => element.email === req.body.email && element.password === req.body.password);
  if(user === undefined) {
    res.status(401).json({msg: 'Nama atau Password Salah'});
  } else {
    const token = jwt.sign(user, 'rahasia');
    res.status(200).send({token: token});
  }
});

app.get('/users', (req, res) => {
  try {
    let decoded = jwt.verify(req.headers.token, 'rahasia');
    user = db.find(element => element.email === decoded.email);
    if(user === undefined) {
      res.status(401).json({msg: 'User belum mendaftar!'})
    } else {
      res.send(db);
    }
  } catch {
    res.status(500).json({msg: 'Token tidak ditemukan'});
  }
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});