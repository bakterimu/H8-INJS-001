const express = require("express");
const jwt = require("jsonwebtoken");
const port = 8000;
const app = express();
const db = require("./db.js");
const route = require('./routes/index.js');

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
    let decoded = jwt.verify(req.headers.token, "rahasia");
    db.query('select * from "User" where owner_id = ', (err, result) => {
      if (err) {
        res.status(401).json({ msg: "User belum mendaftar!" });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Token tidak ditemukan" });
  }
});

// Routes
app.use(route);

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
