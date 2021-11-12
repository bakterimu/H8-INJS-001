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


// Routes
app.use(route);

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
