//Dependencies/Variables
var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 
var PORT = 8080; 

//To parse different types of JSON
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

//server routes
require("./app/routing/apiRoutes.js") (app); 
require("./app/routing/htmlRoutes.js")(app); 

app.listen(PORT, function(){
    console.log("Server is listening on PORT#: " + PORT); 
}); 