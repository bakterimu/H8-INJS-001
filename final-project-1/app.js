const express = require("express");
const port = 8000;
const app = express();
const route = require('./routes/index.js');

/*
SQL
create table users (
	owner_id uuid primary key,
	email varchar,
	password varchar
);

create table data_user (
	id uuid primary key,
	title varchar,
	success boolean,
  targetMonth integer,
  targetYear integer,
	createdAt varchar,
	updatedAt varchar,
	owner_id uuid references users(owner_id)
);
*/

app.use(express.urlencoded({extended:true}));
// Routes
app.use(route);

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
