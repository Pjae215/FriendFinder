//Dependencies/Variables
var friends = require("../data/friends");

//Linking JS
module.exports = function(app){

//Getting json from stock friends
app.get("/api/friends", function(req, res){
res.json(friends);
});

//Posting json from user
app.post("/api/friends", function(req, res) {
friends.push(req.body);

//variables to create totals and matches
var newfriendScore = req.body.totals;
var bestofFriends = 0;
var minScore = 50;
	
//Looping through stock friends and user data
for (var i = 0; i < (friends.length - 1); i++) {
var compScore = friends[i].totals;
var totalDifference = 0;

for (var j = 0; j < (newfriendScore.length-1); j++) {
var matchDifference = Math.abs(parseInt(newfriendScore[j]) - parseInt(compScore[j]));
 
//Defining to totals difference
totalDifference = totalDifference + matchDifference;
    }
// Finding a match
if (totalDifference < minScore) {
minScore = totalDifference;
bestofFriends = i;
  }}
res.send(friends[bestofFriends]);
});
};