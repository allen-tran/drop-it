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
  connectionLimit: Config.CONNECTION_LIMIT,
  host: Config.HOST, // ip address of server running mysql
  user: Config.USER, // user name to your mysql database
  password: Config.PASSWORD, // corresponding password
  port: Config.PORT, // db port
  database: Config.DATABASE, // use the specified database
});

// make to connection to the database
pool.getConnection(function (err) {
  if (err) throw err;
  // if connection is successful
  console.log("connection successful");
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/users", (req, res) => {
  const { id } = req.query;
  pool.getConnection(function (err, con) {
    con.query(
      `select * from Users where id='${id}' and is_admin=1`,
      (err, results) => {
        if (err) {
          res.send(err);
        } else if (results.length === 1) {
          res.send({ isAdmin: true, exists: true });
        } else {
          con.query(`select * from users where id='${id}'`, (err, results) => {
            if (results.length === 1) {
              res.send({ isAdmin: false, exists: true });
            } else {
              res.send({ isAdmin: false, exists: false });
            }
          });
        }
      }
    );
    con.release();
  });
});
app.get("/users/add", (req, res) => {
  const { id, firstName, lastName, admin } = req.query;
  pool.getConnection(function (err, con) {
    con.query(
      `insert into Users (id, first_name, last_name, is_admin)` +
        ` values('${id.trim()}', '${firstName}', '${lastName}', ` +
        `${admin !== undefined ? 1 : 0})`,
      (err, results) => {
        if (err) res.send(err);
        else res.send(`Successfully added ${id} into the table`);
      }
    );
    con.release();
  });
});

app.get("/users/remove", (req, res) => {
  const { id } = req.query;
  pool.getConnection(function (err, con) {
    con.query(
      `select * from Users where id='${id}' and is_admin=1`,
      (err, results) => {
        if (err) res.send(err);
        else if (results.length) {
          con.query(`delete from users where id='${id}'`, (err, results) => {
            if (err) res.send(err);
            else res.send(`Successfully deleted entry ${id} from the table`);
          });
        } else {
          res.send(`Could not complete remove operation on ${id}`);
        }
      }
    );
    con.release();
  });
});

app.get("/files", (req, res) => {
  pool.getConnection(function (err, con) {
    const { id } = req.query;
    if (!id) return res.json({});
    let isAdmin = false;
    con.query(
      `select * from Users where id='${id}' and is_admin=1`,
      (err, results) => {
        if (err) res.send(err);
        else {
          isAdmin = results.length === 1;
        }
        let query = `select * from files where user_id='${id}'`;
        if (isAdmin) {
          query =
            "select a.first_name, a.last_name, a.id, b.* from users a, files b where a.id = b.user_id";
        }
        con.query(query, (err, results) => {
          if (err) res.send(err);
          else {
            return res.json({
              data: results,
            });
          }
        });
      }
    );
    con.release();
  });
});

app.get("/files/update", (req, res) => {
  let currentTime = new Date().toUTCString();
  const { entryId, userId, fileId, title, description, size } = req.query;
  pool.getConnection(function (err, con) {
    con.query(
      `select * from Users where id='${userId}' and is_admin=1`,
      (err, results) => {
        if (err) res.send(err);
        let query = `update files set `;
        query += fileId ? `file_id = '${fileId}', ` : "";
        query += title ? `title = '${title}', ` : "";
        query += size ? `size = ${size}, ` : "";
        query += description ? `description = '${description}', ` : "";
        query += `updated_time = '${currentTime}' `;
        query += `where entry_id = ${entryId}`;

        if (results.length === 1) {
          con.query(query, (err, results) => {
            if (err) res.send(err);
            else res.send(`Successfully updated ${entryId} into the table`);
          });
        } else {
          con.query(
            `select * from Files where entry_id=${entryId} ` +
              `and user_id='${userId}'`,
            (err, results) => {
              if (err) res.send(err);
              if (results.length === 1) {
                con.query(query, (err, results) => {
                  if (err) res.send(err);
                  else
                    res.send(`Successfully updated ${entryId} into the table`);
                });
              } else {
                res.send(
                  `Could not update ${entryId}. The file could not be` +
                    ` found with your account .`
                );
              }
            }
          );
        }
      }
    );
    con.release();
  });
});

app.get("/files/add", (req, res) => {
  var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  pool.getConnection(function (err, con) {
    const { userId, fileId, title, description, size } = req.query;
    con.query(
      `insert into Files (file_user_id, file_id, title, size, file_description, time_uploaded) values('${userId}', '${fileId}', '${title}',` +
        `${size}, '${description}', '${time}')`,
      (err, results) => {
        if (err) res.send(err);
        else res.send(`Successfully added ${fileId} into the table`);
      }
    );
    con.release();
  });
});

app.get("/files/remove", (req, res) => {
  const { id, userId } = req.query;
  pool.getConnection(function (err, con) {
    con.query(
      `select * from Users where id='${userId}' and is_admin=1`,
      (err, results) => {
        if (err) res.send(err);
        if (results.length === 1) {
          con.query(
            `delete from Files where entry_id='${id}'`,
            (err, results) => {
              if (err) res.send(err);
              else res.send(`Successfully deleted entry ${id} from the table`);
            }
          );
        } else {
          con.query(
            `select * from Files where entry_id=${id} ` +
              `and user_id='${userId}'`,
            (err, results) => {
              if (err) res.send(err);
              if (results.length === 1) {
                con.query(
                  `delete from Files where entry_id='${id}'`,
                  (err, results) => {
                    if (err) res.send(err);
                    else
                      res.send(
                        `Successfully deleted entry ${id} from the table`
                      );
                  }
                );
              } else {
                res.send(
                  `Could not delete ${id}. The file could not be` +
                    ` found with your account .`
                );
              }
            }
          );
        }
      }
    );
    con.release();
  });
});
app.listen(3001, () => {
  console.log("Port 3001");
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
