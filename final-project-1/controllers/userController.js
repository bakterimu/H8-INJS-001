const db = require("../db.js");
const passwordHash = require("password-hash");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const RegistrasiUser = (request, response) => {
  let owner_id = uuidv4();
  let email = request.body.email;
  let password = passwordHash.generate(request.body.password);
  db.query(
    `INSERT INTO users (owner_id,email,password) VALUES ('${owner_id}','${email}','${password}')`,
    (error, result) => {
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
  db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, result) => {
    if (error) {
      throw error;
    }
    if (result.rowCount > 0) {
      let data = {
        owner_id: result.rows[0].owner_id,
        email: result.rows[0].email,
      };
      if (passwordHash.verify(pass, result.rows[0].password)) {
        let token = jwt.sign(data, "rahasia");
        response.status(200).json({
          status: true,
          message: "login success !",
          data: data,
          token: token,
        });
      } else {
        response.status(401).json({
          status: false,
          message: "email atau password tidak valid !",
        });
      }
    } else {
      response.status(401).json("email atau password tidak valid !");
    }
  });
};

const authenticateToken = (req, res, next) => {
  try {
    let decoded = jwt.verify(req.headers.token, "rahasia");
    req.user = decoded;
    db.query(
      `select * from "users" where owner_id = '${decoded.owner_id}'`,
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: "Kesalahan database!" });
        } else {
          if (result.rows[0] !== null) {
            next();
          } else {
            res.status(401).json({ msg: "User belum mendaftar!" });
          }
        }
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "Token tidak ditemukan" });
  }
};

const createData = (req, res) => {
  let id = uuidv4();
  let { title, success, targetMonth, targetYear } = req.body;
  let createdAt = new Date().toLocaleString({hour12: false});
  let updatedAt = new Date().toLocaleString({hour12: false});
  success = success === "true";
  targetMonth = Number(targetMonth);
  targetYear = Number(targetYear);
  db.query(
    `insert into "data_user" ("id", "owner_id", "title", "success", "targetMonth", "targetYear", "createdAt", "updatedAt") 
      values ('${id}', '${req.user.owner_id}', '${title}', ${success}, ${targetMonth}, ${targetYear}, '${createdAt}', '${updatedAt}')`,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json({ msg: "Data created!" });
      }
    }
  );
};

const getAllData = (req, res) => {
  // belum menambahkan owner_id
  db.query(
    `select * from "data_user" where owner_id = '${req.user.owner_id}'`,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({ msg: "Done", data: result.rows });
      }
    }
  );
};

const editData = (req, res) => {
  const { body } = req;
  const id = req.params.id;
  db.query(
    `select * from "data_user" where owner_id = '${req.user.owner_id}' and id = '${id}'`,
    (err, result) => {
      if (err) {
        res.status(500).json({ msg: "error select" });
      } else {
        let prevData = result.rows[0];
        const success = body.success === "true";
        const user = {
          ...prevData,
          title: body.title ?? prevData.title,
          success: success ?? prevData.success,
          targetMonth: body.targetMonth ?? prevData.targetMonth,
          targetYear: body.targetYear ?? prevData.targetYear,
          updatedAt: new Date().toLocaleString({hour12: false}),
        };
        db.query(
          `update "data_user"
        set "title"='${user.title}', "success" = ${user.success}, "targetMonth"=${user.targetMonth}, "targetYear"=${user.targetYear}, "updatedAt"='${user.updatedAt}}'
        where id = '${user.id}'`,
          (error, hasil) => {
            if (error) {
              res.status(500).json({ msg: "error update" });
            } else {
              res.status(200).json({ msg: "Done", data: user });
            }
          }
        );
      }
    }
  );
};

const deleteData = (req, res) => {
  const id = req.params.id;
  db.query(
    `delete from "data_user" where id = '${id}' and owner_id = '${req.user.owner_id}' `,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({ msg: "Berhasil di hapus" });
      }
    }
  );
};

module.exports = {
  LoginUser,
  RegistrasiUser,
  authenticateToken,
  createData,
  getAllData,
  editData,
  deleteData,
};
