const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mohana@1234",
    database:"e_mart_data",
    port:3306
});

db.connect(err=>{
    if(err) {console.log('err');}
    console.log('database connected...');
})

//get all data
app.get('/login_credentials',(req,res)=>{
    let qr = `select * from login_credentials`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
});

//get username
app.get('/login_credentials/findUsername/:username',(req,res)=>{
    let gUsername = req.params.username;
    let qr = `select * from login_credentials where username=${gUsername}`;
    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}
        if(result.length>0){
            res.send({
                message:'got username',
                data:result
            });
        }
        else{
            res.send({
                message:'username not found'
            });
        }
    });
});


app.get('/login_credentials/validateUsernamePassword',(req,res)=>{
    let gUsername = req.params.username;
    let gPassword = req.params.password;
    let qr = `select * from login_credentials where username=${gUsername} and password=${gPassword}`;
    db.query(qr,(err,result)=>{
        if(err) {console.log(err);}
        if(result.length>0){
            res.send({
                message:'got username',
                data:result
            });
        }
        else{
            res.send({
                message:'username not found'
            });
        }
    });
});

// create username and password
app.post('/login_credentials',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    let qr = `insert into login_credentials(username,password) values('${username}','${password}')`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err)};
        res.send({
            message:'data inserted'
        });
    });
});

app.listen(3001,()=>{
    console.log('server running');
})
    
