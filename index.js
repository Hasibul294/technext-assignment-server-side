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
  database: "testdb",
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
  const info = req.body;
  const fastName = info.fastName;
  const lastName = info.lastName;
  const sqlInsert =
    "INSERT INTO employee_info (fastName, lastName) VALUES (?,?);";
  db.query(sqlInsert, [fastName, lastName], (err, result) => {
    res.json(result);
  });
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
