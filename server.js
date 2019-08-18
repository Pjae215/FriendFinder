//set up dependencies
var express = require("express");
var mysql = require("mysql");

//creates express server and sets up a port
var app = express(); 
var port = process.env.PORT || 8080; 

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "paula",
  database: "task_saver_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

//api and html routes to files
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

//Listening to the port that was set up
app.listen(port, function(){ console.log("Listening on port #s", port)});