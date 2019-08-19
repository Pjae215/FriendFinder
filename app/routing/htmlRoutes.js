//Dependencies/Variables
var path = require("path");

//Linking JS
module.exports = function(app) {

//Get/send paths for res 
app.get("/survey", function(req,res){
res.sendFile(path.join(__dirname + "/../public/survey.html"));
});

//Use/send paths for json res
app.use(function(req,res){
res.sendFile(path.join(__dirname + "/../public/home.html")); 
});
}