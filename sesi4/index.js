const express = require('express');
const fs = require('fs')
const axios = require('axios');
const data = require('./data.json');
const app = express();

// middleware built-in express 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Get /
app.get('/', (request, response) => {
  console.log('GET /');
  response.send('<h1>Hello Ngab!</h1>');
});

// Get /users
app.get('/users', (request,response) => {
  console.log('GET /users');
  response.send(data);
});

// Get /users/id:
app.get('/users/:id', (request, response) => {
  console.log('GET /users/ ' + request.params.id);
  response.send(data[request.params.id - 1]);
});

// Post /users
app.post('/users', (request, response) => {
  console.log('POST /users', request.body);
  const {email, first_name, last_name, avatar} = request.body;
  const newUser = {
    id: data.length + 1,
    email,
    first_name,
    last_name,
    avatar
  };
  data.push(newUser);
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), () => {
    console.log('Data berhasil ditambahkan');
  });
})

app.delete('/users/:id', (req, res, next) => {
  if (!req.params.id|| req.params.id > data.length) {
    res.send('Data tidak ada');
  };
  next();
}, (req, res) => {
  data.splice(req.params.id - 1, 1);
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), () => {
    console.log('Data berhasil dihapus');
  });
  res.send('Data berhasil dihapus')
})

app.patch('/users/:id', (req, res) => {
  const {body} = req;
  const prevData = data[req.params.id - 1];

  data[req.params.id - 1] = {
    ...prevData,
    email: body.email ?? prevData.email,
    first_name: body.first_name ?? prevData.first_name,
    last_name: body.last_name ?? prevData.last_name,
    avatar: body.avatar ?? prevData.avatar
  };

  fs.writeFile('./data.json', JSON.stringify(data, null, 2), () => { console.log('Data berhasil diupdate di json') });
})

app.listen(8000,() => {
  console.log("listen on port 8000")
})

