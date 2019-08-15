console.log('API Route Connected Successfully');


// Link in Friends Data
var friendsData = require('../data/friends.js');


// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/friends', function (req, res) {

    // Parse new friend input to get integers (AJAX post seemed to make the numbers strings)
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArray;


    // Cross check the new friend entry with the existing ones
    var scoreComparisionArray = [];
    for(var i=0; i < friendsData.length; i++){

      // Check each friend's scores and sum difference in points
      var currentComparison = 0;
      for(var j=0; j < newFriend.scores.length; j++){
        currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
      }

      // Push each comparison between friends to array
      scoreComparisionArray.push(currentComparison);
    }

    // Determine the best match using the postion of best match in the friendsData array
    var bestMatchPosition = 0; // assume its the first person to start
    for(var i=1; i < scoreComparisionArray.length; i++){
      
      // Lower number in comparison difference means better match
      if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    // ***NOTE*** If the 2 friends have the same comparison, then the NEWEST entry in the friendsData array is chosen
    var bestFriendMatch = friendsData[bestMatchPosition];



    // Reply with a JSON object of the best match
    res.json(bestFriendMatch);



    // Push the new friend to the friends data array for storage
    friendsData.push(newFriend);

  });

}


// Export for use in main server.js file
module.exports = apiRoutes;

console.log('HTML Route Connected Successfully');


// Node Dependencies
var path = require('path');


// Includes Two Routes
function htmlRoutes(app) {

  // A GET Route to /survey which should display the survey page.
  app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/survey.html'));
  });

  // A default USE route that leads to home.html which displays the home page.
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });

}


// Export for use in main server.js file
module.exports = htmlRoutes;

// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');



// Link in html and api routes
var apiRoutes = require('./app/routing/api-routes.js');
var htmlRoutes = require('./app/routing/html-routes.js');



// Set up Express App
var app = express();
var PORT = process.env.PORT || 8080;



// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));



// Server Routing Map 
apiRoutes(app); // API route - Must be listed first due to the HTML default catch all "use" route
htmlRoutes(app); // HTML route 


// Listener - Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

