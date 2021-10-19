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
var path = require("path");
var data = require("./data-service.js");
const multer = require("multer");
const fs = require("fs");

var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));



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

app.get("/employees/add", function(req,res){
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.get("/images/add", function(req,res){
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

app.get("/employee/:value", function (req, res) {
    data.getEmployeeByNum(req.params.value)
    .then((data) => {
        console.log ("calling getEmployeeByNum");
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
});



app.get("/employees", function(req,res){
    if(req.query.status) {
        data.getEmployeesByStatus(req.query.status)
            .then((data) => {
                console.log ("calling getEmployeesByStatus()");
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            })

    }else if(req.query.department) {
        data.getEmployeesByDepartment(req.query.department)
            .then((data) => {
                console.log ("calling getEmployeesByDepartment()");
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            })

    }else if(req.query.manager) {
        data.getEmployeesByManager(req.query.manager)
            .then((data) => {
                console.log ("calling getEmployeesByManager()");
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            })
    }else {

        data.getAllEmployees()
            .then((data) => {
            console.log ("calling getAllEmployees()");
            res.json(data);
        })
            .catch((err) => {
            console.log(err);
            res.json(err);
        })
    }
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



const storage = multer.diskStorage({

    destination: "./public/images/uploaded",
    filename: function(req, file, cb){
        cb(null, Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});


app.post("/images/add", upload.single("imageFile"), (req, res) => {

    res.redirect("/images");
});


app.get("/images",  function(req, res){  

    fs.readdir("./public/images/uploaded", function(err, items){
        res.json( {"images": items});

    });
});



app.post("/employees/add", function(req,res){
    data.addEmployee(req.body)
    .then(() => {
      res.redirect("/employees");
    });
});

