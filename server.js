/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Amogh Pradhan Student ID: 143542199 Date: October 1st 2021
*
* Online (Heroku) Link: https://assign-222.herokuapp.com/about
*
********************************************************************************/ 


var express = require("express");
var app = express();
var path = require("path");
var data = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});


app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});



app.get("/employees", function(req,res){
    data.getAllEmployees()
        .then((data) => {
            console.log ("getting AllEmployees");
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});

app.get("/managers", function(req,res){
    data.getManagers()
        .then((data) => {
            console.log ("getting Managers");
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});

app.get("/departments", function(req,res){
    data.getDepartments()
        .then((data) => {
            console.log ("getting Departments");
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
})
console.log ("Ready for initialization");
data.initialize()
    .then(() => {
        console.log ("Server has initialized");
        app.listen(HTTP_PORT, onHttpStart);  
    })
    .catch(err => {
        console.log(err);
    })

