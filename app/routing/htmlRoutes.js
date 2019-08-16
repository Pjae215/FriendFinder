//Dependency
var path = require('path');
//route
module.exports = function(app){

//GET request 
	app.get('/survey', function(req, res){
		// res.sendFile(path.join(__dirname + "/..app/public/survey.html"));
		res.sendFile('survey.html/results', { root: path.join(__dirname, '../public') });
	});


}