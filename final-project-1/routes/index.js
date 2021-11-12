const route = require('express').Router();
const user = require('./../controllers/userController.js');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

route.post("/api/v1/reflections", user.createData);

route.get("/api/v1/reflections", user.getAllData);

route.put("/api/v1/reflections/:id", user.editData);

route.delete("/api/v1/reflections/:id", user.deleteData);

module.exports = route
