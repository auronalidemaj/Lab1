const express = require("express")
const mysql = require("mysql2")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"loginsystem"
});

// Open a MySQL connection
db.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + db.threadId);
});

app.post("/register", (req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    db.query("INSERT INTO users(username, password) VALUES (?,?)", [username,password], (err,result) => {
        if (err) {
            console.log(err);
        }
    });
});

app.post("/login", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username,password], (err,result) => {
        if (err) {
            res.send({err: err})
        }
        if(result.length > 0) {
            res.send(result)
        } else {
            res.send({message: "Wrong user details."});
            } 
        }
    );
});

app.listen(3001,() => {
    console.log("running server");
});
