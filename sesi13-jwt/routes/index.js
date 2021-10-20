const route = require('express').Router();
const UserController = require('./../controllers/userController.js');
const jwt = require('jsonwebtoken');
const { user } = require('./../models');
const bcrypt = require('bcryptjs');

route.get("/", (req, res) => {
  res.json({
    halaman: 'home'
  });
});

route.post('/user', UserController.create);

route.post('/login', (req,res) => {
  user.findOne({
    where: {
      name: req.body.name,
      // password: req.body.password
  }})
  .then(data => {
    if(data === null) {
      res.status(401).json({msg: 'Nama atau Password Salah'});
    } else {
      let compare = bcrypt.compareSync(req.body.password, data.password)
      if (compare === true) {
        const token = jwt.sign(data.toJSON(), 'rahasia');
        res.status(200).json({token: token});
      } else {
        res.status(401).json({msg: 'Nama atau Password Salah'});
      }
    }
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// autentifikasi
route.use((req, res, next) => {
  try {
    let decoded = jwt.verify(req.headers.token, 'rahasia');
    user.findOne({
      where: {
        name: decoded.name,
      }
    })
    .then(data => {
      if (data !== null) {
        next();
      } else {
        res.status(401).json({msg: 'User belum mendaftar!'})
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  } catch (err) {
    res.status(500).json({msg: 'Token tidak ditemukan'});
  }
})

route.get('/users', UserController.findAll);

route.get('/user/:id', UserController.findOne);

route.post('/users/:id/edit', UserController.update);

route.post('/users/:id/delete', UserController.delete);

module.exports = route;