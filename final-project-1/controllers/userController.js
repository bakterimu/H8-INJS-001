const db = require("../db.js");
const passwordHash = require("password-hash");
const { v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");

const RegistrasiUser = (request, response) => {
  let owner_id = uuidv4();
  let email = request.body.email;
  let password = passwordHash.generate(request.body.password);
  db.query(
    `INSERT INTO users (owner_id,username,email,password) VALUES ('${owner_id}','${email}','${password}')`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send({
        message: "Registrasi sukses!",
        status: true,
      });
    }
  );
};

const LoginUser = (request, response) => {
  let email = request.body.email;
  let pass = request.body.password;
  db.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount > 0) {
        let data = {
          owner_id: results.rows[0].owner_id,
          email: results.rows[0].email
        };
        if (passwordHash.verify(pass, results.rows[0].password)) {
          let token = jwt.sign(data, "rahasia");
          response.status(200).json({
            status: true,
            message: "login success !",
            data: data,
            token: token
          });
        } else {
          response.status().json({
            status: false,
            message: "email & password not valid !",
          });
        }
      } else {
        response.status(401).json("email atau password tidak valid !");
      }
    }
  );
};

const authenticateToken = (req, res, next) => {
  try {
    let decoded = jwt.verify(req.headers.token, "rahasia");
    db.query(`select * from "User" where owner_id = '${decoded.owner_id}'`, (err, result) => {
      if (err) {
        res.status(401).json({ msg: "User belum mendaftar!" });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Token tidak ditemukan" });
  };
};

const createData = (req, res) => {
  let id = uuidv4();
  let { title, success, targetMonth, targetYear } = req.body;
  let createdAt = new Date().toLocaleDateString();
  let updatedAt = new Date().toLocaleDateString();
  success = success.toLowerCase() === "true";
  targetMonth = Number(targetMonth);
  targetYear = Number(targetYear);
  // Belum menambahkan owner id untuk relasi tabel one to many
  db.query(
    `insert into "User" (id, title, success, targetMonth, targetYear, createdAt, updatedAt) 
      values ('${id}', '${title}', ${success}, ${targetMonth}, ${targetYear}, '${createdAt}', '${updatedAt}')`,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json({ msg: "Done", data: result.rows });
      }
    }
  );
};

const getAllData = (req, res) => {
   // belum menambahkan owner_id
   db.query(`select * from "User" where owner_id = `, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ msg: "Done", data: result.rows });
    }
  });
};

const editData = (req, res) => {
  const { body } = req;
  const id = Number(req.params.id);
  // belum menambahkan owner_id
  db.query(
    `select * from "User" where owner_id = and id = ${id}`,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        let prevData = result.rows[0];
        const user = {
          ...prevData,
          title: body.title ?? prevData.title,
          success: body.success ?? prevData.success,
          targetMonth: body.targetMonth ?? prevData.targetMonth,
          targetYear: body.targetYear ?? prevData.targetYear,
          updatedAt: new Date().toLocaleDateString(),
        };
        // Owner id belum
        db.query(
          `update "User"
        set id='${user.id}', title='${user.title}', success = '${user.success}', targetMonth=${user.targetMonth}, targetYear=${user.targetYear}, updatedAt='${user.updatedAt}}'
        where id = '${user.id}'`,
          (error, hasil) => {
            if (error) {
              res.status(500).json(error);
            } else {
              res.status(200).json({ msg: "Done", data: hasil.rows });
            }
          }
        );
      }
    }
  );
}

const deleteData = (req, res) => {
  const id = Number(req.params.id);
  db.query(
    `delete from "User" where id = ${id} and owner id = `,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({ msg: "Berhasil di hapus", data: result.rows });
      }
    }
  );
}

module.exports = {
  LoginUser,
  RegistrasiUser,
  authenticateToken,
  createData,
  getAllData,
  editData,
  deleteData
};
