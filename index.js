const express = require("express");
const cors=require("cors")
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: "b8jjojqgedpye0j1dccm-mysql.services.clever-cloud.com",
  database: "b8jjojqgedpye0j1dccm",
  user: "untvw3bbcjxev3rr",
  password: "lBuD8HLxTKFSVrPJn0AZ",
  port:3306
});


connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
    
  }
});


app.use(cors())
app.use(express.json({}));

app.get("/user", (req, res, next) => {
  const query = `SELECT * FROM task1`;
  connection.execute(query, (err, result, fields) => {
    if (err) {
      return res.json({ messege: "query error", err });
    }
    return res.json({ messege: "done", result });
  });
});

app.post("/user", (req, res, next) => {
  const { email,age,heartbeat, motion,patientName } = req.body;
  
  const query = `insert into task1 (patientName,email,heartbeat,motion,age) values('${patientName}','${email}','${heartbeat}','${motion}','${age}')`;
  connection.execute(query, (err, result, fields) => {
    
    
      
    
    if (err) {
      if (err.errno == 1062) {
          return res.json({ message: "Email already exist", err });
      }
      return res.json({ messege: "Query user error", err });
  }
  
    return res.json({ messege: "done", result });
  });
});
app.get("/",(req, res, next) => {
  return res.send("hello world");
})

