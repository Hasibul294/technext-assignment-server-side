const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const port = 5000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "technextdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/addEmployee", (req, res) => {
  const page = req.query.page;
  const size = parseInt(req.query.size);
  const sqlSelect = "SELECT * FROM employee_info;";
  db.query(sqlSelect, (err, result) => {
    const dataCount = result.length;
    let employee_info;
    if (page) {
      employee_info = `SELECT * FROM employee_info LIMIT 5 OFFSET ${
        page * size
      }`;
      db.query(employee_info, (err, result) => {
        res.send({
          dataCount,
          result,
        });
      });
    } else {
      res.send({
        dataCount,
        result,
      });
    }
  });
});

app.post("/addEmployee", (req, res) => {
  const fastName = req.body.fastName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const companyName = req.body.companyName;
  const sqlInsert =
    "INSERT INTO employee_info (firstName, lastName, email, companyName) VALUES (?,?,?,?);";
  db.query(
    sqlInsert,
    [fastName, lastName, email, companyName],
    (err, result) => {
      res.json(result);
    }
  );
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
