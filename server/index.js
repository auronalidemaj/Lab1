// import express from "express"
const mysql = require('mysql')

// const app = express()

// app.listen(3000, ()=>{})

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bookstore"
});

db.connect((err)=>{
    if(err) throw err;
    console.log("Connected to mysql database");
});