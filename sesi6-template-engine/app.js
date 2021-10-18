const { urlencoded } = require('body-parser');
const fs = require('fs');
const express = require('express');
const data = require('./data.json');
const app = express();


app.use(express.urlencoded({extended:true}));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('view', data[0]);
});
app.post('/', (req, res) => {
  const {
    nama,
    kelas,
    universitas,
    email
  } = req.body;
  const orang = {nama, kelas, universitas, email}
  data.push(orang);
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), () => {
    console.log('Data berhasil ditambahkan');
  });
});
app.listen(8000, () => {
  console.log('Listen on port 8000');
});
