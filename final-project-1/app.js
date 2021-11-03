const express = require('express');
const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid');
const port = 8000;
const app = express();
const db = require('./db.js');

/*
create table User (
	id varchar primary key,
	title varchar,
	success boolean,
  targetMonth integer,
  targetYear integer,
	createdAt varchar,
	updatedAt varchar,
	owner_id varchar
)
*/
app.use((req, res, next) => {
  try {
    let decoded = jwt.verify(req.headers.token, 'rahasia');
    db.query('select * from "User" where owner_id = ', (err, result) => {
      if(err) {
        res.status(401).json({msg: 'User belum mendaftar!'});
      } else {
        next();
      };
    });
  } catch (err) {
    res.status(500).json({msg: 'Token tidak ditemukan'});
  };
});

app.post('/api/v1/reflections', (req, res) => {
  let id = nanoid(8);
  let {title, success, targetMonth, targetYear} = req.body;
  let createdAt = new Date().toLocaleDateString();
  let updatedAt = new Date().toLocaleDateString();
  success = (success.toLowerCase() === 'true');
  targetMonth = Number(targetMonth);
  targetYear = Number(targetYear);
  // Belum menambahkan owner id untuk relasi tabel one to many
  db.query(`insert into "User" (id, title, success, targetMonth, targetYear, createdAt, updatedAt) 
    values ('${id}', '${title}', ${success}, ${targetMonth}, ${targetYear}, '${createdAt}', '${updatedAt}')`, 
    (err, result) => {
    if(err) {
      res.status(500).json(err)
    } else {
      res.status(201).json({msg: 'Done', data: result.rows});
    };
  });
});

app.get('/api/v1/reflections', (req, res) => {
  // belum menambahkan owner_id
  db.query(`select * from "User" where owner_id = `, (err, result) => {
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({msg: 'Done', data: result.rows})
    };
  });
});

app.put('/api/v1/reflections/:id', (req, res) => {
  const {body} = req;
  const id = Number(req.params.id);
  // belum menambahkan owner_id
  db.query(`select * from "User" where owner_id = and id = ${id}`, (err, result) => {
    if(err) {
      res.status(500).json(err);
    } else {
      let prevData =  result.rows[0];
      const user = {
        ...prevData,
        title: body.title ?? prevData.title,
        success: body.success ?? prevData.success,
        targetMonth: body.targetMonth ?? prevData.targetMonth,
        targetYear: body.targetYear ?? prevData.targetYear,
        updatedAt: new Date().toLocaleDateString(),
      };
      // Owner id belum
      db.query(`update "User"
        set id='${user.id}', title='${user.title}', success = '${user.success}', targetMonth=${user.targetMonth}, targetYear=${user.targetYear}, updatedAt='${user.updatedAt}}'
        where id = '${user.id}'`,
        (error, hasil) => {
          if(error) {
            res.status(500).json(error);
          } else {
            res.status(200).json({msg: 'Done', data: hasil.rows});
          };
        });
      };
  });
});

app.delete('/api/v1/reflections/:id', (req, res) => {
  const id = Number(req.params.id);
  db.query(`delete from "User" where id = ${id} and owner id = `, (err, result) => {
    if(err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({msg: 'Berhasil di hapus', data: result.rows});
    }
  });
})

app.listen(port, () => {
  console.log('Listening on port: ', port);
});