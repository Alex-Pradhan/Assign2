var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", function(req,res){
    res.sendFile(path.join(directoryname, "/views/home.html"));
});


app.get("/about", function(req,res){
    res.sendFile(path.join(directoryname, "/views/about.html"));
});


app.listen(HTTP_PORT, onHttpStart);