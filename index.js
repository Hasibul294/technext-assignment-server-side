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
  const sqlSelect = "SELECT * FROM employee_info;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
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
