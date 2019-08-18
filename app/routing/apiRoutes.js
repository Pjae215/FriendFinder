var friends = require("../data/friends");


module.exports = function(app){
	app.get("api/friends", function(req, res){
		 return res.json(friends);
	});

// Create New Characters - takes in JSON input
app.post("/api/friends", function(req, res) {
	// var newFriend = req.body;
	var newScore = 0;
	var total = 0;
	var match = {
		name: "",
		photo: "",
		difference: 10000
	}

	// Calculating totals 
	for (var i = 0; i < friends.length; i++) {
		total = 0;

		for (var j = 0; j < friends[i].preferences.length; j++) {
			total += Math.abs(friends[i].preferences[j] - newFriend.preferences[j]);

			if (total <= match.difference) {
				match.name = friends[i].name,
				match.photo = friends[i].photo,
				match.difference = total
			}
    	}
    }
    friends.push(newFriend);
    res.json(match);
    console.log(match);
});
}
   

    
    