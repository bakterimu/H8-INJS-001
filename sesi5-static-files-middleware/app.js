const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));
app.use((req, res, next) => {
  console.log('Req type:', req.method, req.url);
  next();
});

// Get
app.get('/', (req, res, next) => {
  console.log('Masuk Home');
  next();
},(req, res) => {
    res.send('<link rel = "stylesheet" href = "http://localhost:8000/assets/style.css"><h1>Hello Ngab!</h1>');
});
app.get('/gambar', (req, res) => {
  console.log('Masuk gambar');
  next();
}, (req, res) => {
    res.sendFile('./public/gambar.html', {root: __dirname});
});
app.get('/about', (req, res) => {
  console.log('Masuk about');
  next();
}, (req, res) => {
    res.sendFile('./public/about.html', {root: __dirname});
});
// Route khusus Middleware
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  else next()
},  (req, res, next) => {
  res.send('selain 0')
})
app.get('/user/:id', function (req, res, next) {
  res.send('pasti id nya 0')
})

app.get('/link', (req, res) => {
  console.log('Masuk Home');
  next();
}, (req, res) => {
  res.sendFile('./public/link.html', {root: __dirname});
});


// listen port
app.listen(8000, () => {
  console.log("Listen on port 8000");
});