const User = require('./models/user');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// app.get('/', (req,res) => {
//   res.json({
//     project: 'Belajar'
//   });
// });

// Create
app.post('/users', User.create);
// Read
app.get('/users', User.read);
// Delete
app.delete('/users', User.delete);


app.listen(port, () => {
  console.log('Listen on port 8000');
});