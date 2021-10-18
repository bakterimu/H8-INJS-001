const db = require('./../db');

class Customer {
  // Create
  static create (req, res) {
    let {nama, barang, harga_s, bayar}  = req.body;
    let harga = Number(harga_s);
    let sudah_bayar = (bayar.toLowerCase() === 'true');
    db.query(`insert into "Customer" (nama, barang, harga, sudah_bayar) values ('${nama}', '${barang}', ${harga}, ${sudah_bayar})`, (err, result) => {
      if(err) {
        res.status(500).json(err)
      } else {
        res.status(201).json({msg: 'Done', data: result.rows});
      }
    })
  }
  // Read
  static read (req, res) {
    db.query(`select * from "Customer"`, (err, result) => {
      if(err) {
        res.status(500).json(err);
      } else {
        res.status(200)
        res.render('view', result.rows[0]);
      }
    });
  }
  // Delete
  static delete (req, res) {
    let id = req.body.id;
    id = Number(id);
    db.query(`delete from "Customer" where id = ${id}`, (err, result) => {
      if(err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({msg: 'Berhasil di hapus', data: result.rows});
      }
    });
  }
}
module.exports = Customer