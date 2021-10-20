const { user } = require('./../models');
const bcrypt = require('bcryptjs');

class UserController {
  // POST User/registrasi
  static create = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let input = {
      name: req.body.name,
      age: req.body.age,
      password: hash
    };
    user.create(input)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      let errCode = 500;
      if(err.name.includes('DatabaseError')) {
        errCode = 400;
      }
      res.status(errCode).json(err)
    });
  }

  // GET All User
  static findAll = (req, res) => {
    user.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }

  // POST update User by ID
  static update = (req, res) => {
    user.update({
      name: req.body.name,
      age: req.body.age,
      password: req.body.password
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (data[0] > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({msg: 'User tidak ditemukan'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
  }
  
  // GET User by Id
  static findOne = (req, res) => {
    user.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if(data == null){
        res.status(404).json({msg: 'User tidak ditemukan'});
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
  }

  // POST Delete User by ID
  static delete = (req, res) => {
    user.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (data > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({msg: 'User tidak ditemukan'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
  }
}
module.exports = UserController;