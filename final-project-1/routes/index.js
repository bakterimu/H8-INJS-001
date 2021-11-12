const route = require('express').Router();
const user = require('./../controllers/userController.js');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

app.get('/', (req, res) => {
  res.send('reflections aplication final project hacktiv8')
})

app.post('/login', user.LoginUser);
app.post('/register', user.RegistrasiUser);

route.use(user.authenticateToken);

route.post("/api/v1/reflections", user.createData);

route.get("/api/v1/reflections", user.getAllData);

route.put("/api/v1/reflections/:id", user.editData);

route.delete("/api/v1/reflections/:id", user.deleteData);

module.exports = route
