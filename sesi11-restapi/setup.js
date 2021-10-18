const db = require('./db.js');
// db.query(`select now()`, (err, res) => {
//   if (err) {
//     console.log(err.stack)
//   } else {
//     console.log(res.rows[0])
//   }
// });

db.query(`
  create table if not exists "Customer" (
    id serial primary key,
    nama varchar,
    barang varchar,
    harga int,
    sudah_bayar boolean
  );`, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
});
