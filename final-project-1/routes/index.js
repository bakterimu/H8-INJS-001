const route = require('express').Router();
const user = require('./../controllers/userController.js');

route.get('/', (req, res) => {
  res.send('reflections aplication final project hacktiv8')
})

route.post('/register', user.RegistrasiUser);

route.post('/login', user.LoginUser);

route.use(user.authenticateToken);

route.post("/api/v1/reflections", user.createData);

route.get("/api/v1/reflections", user.getAllData);

route.put("/api/v1/reflections/:id", user.editData);

route.delete("/api/v1/reflections/:id", user.deleteData);

module.exports = route
