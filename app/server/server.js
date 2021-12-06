const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var mysql = require("mysql");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const { Config } = require("../src/config/config.json");

// // create a connection variable with the required details
var pool = mysql.createPool({
  host: Config.HOST, // ip address of server running mysql
  user: Config.USER, // user name to your mysql database
  password: Config.PASSWORD, // corresponding password
  port: Config.PORT, // db port
  region: "us-west-1",
  database: Config.DATABASE, // use the specified database
});

// // make to connection to the database
pool.getConnection(function (err) {
  if (err) throw err;
  // if connection is successful
  console.log("connection successful");
});

app.get("/", (req, res) => {
  res.send("OK");
});

// app.post("/", (req, res) => {
//   var { name, rollno } = req.body;
//   var records = [[req.body.name, req.body.rollno]];
//   if (records[0][0] != null) {
//     con.query(
//       "INSERT into student (name,rollno) VALUES ?",
//       [records],
//       function (err, res, fields) {
//         if (err) throw err;

//         console.log(res);
//       }
//     );
//   }
//   res.json("Form recieved");
// });

app.listen(3001, () => {
  console.log("Port 3001");
});
