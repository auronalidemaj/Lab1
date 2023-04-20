const express = require("express")
const mysql = require("mysql")
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
            return res.status(500).send(err);
        }
        res.send("User registered successfully!");
    });
});

app.listen(3001,() => {
    console.log("running server");
});
