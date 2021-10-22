const express = require('express');
const port = 8000;
const app = express();

app.get('/', (req, res) => {
  res.json({nama: 'Izhar', kelas: 'Intro to Nodejs', msg: 'helo'});
})

app.listen(port, () => {
  console.log('listening on port ', port);
});