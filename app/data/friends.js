//Onload/Onclick items

var AnswerValid; //global

$(document).ready(function() {
  $("#start").on('click', function() {

//Make items visible/hidden
  $("#start").hide();
  $("#reset").show();
  $(".form").show();

  
// Validate Answers
     completed(function(){
// Proceed with AJAX call if all questions are answered
       if(AnswerValid){
         storedata();
      }
      else{
        alert("All fields are required to find your match!");
      }
    }); // end completed() callback
  }); // end submit listener
}); // document ready

// Function to valid user input
function completed(callback){
  // Check through all the questions (i.e. iterate through all of class "radio-inline")
        var selectionvalid;
 $(".radio-inline").each(function(){ 
    if ( $(this).val() == "" ){
      selectionvalid = false;
    }
  })
  // This counters the async behavior of $.each()
  .promise().done(function(){
    // Check if any questions are incomplete
    if(selectionvalid == false){
      AnswerValid = false;
    }
//     // Determine if Name is entered
    else if( $('#formName').val().trim() == "" ){
      AnswerValid = false;
    }
    // Determine if Link is entered
    else if( $('#formImage').val().trim() == "" ){
      AnswerValid = false;
    }
//     // Otherwise, the all fields are completed
     else{
       AnswerValid = true;
     }
     // Fire Off Callback (to counter async behavior of $.each)
     callback();       
   });
 }

 function storedata(){
    // Make new friend object
   var newfriends = {
          name: $("#name").val().trim(),
          photo: $("#photo").val().trim(),
          totals: []
        };
   // Loop through Questions to get totals
        var totalsArray = [];
        $('.radio-inline').each(function(){
          totalsArray.push( parseInt( $(this).val() ) ); // Parse Input Value as integer
        })
  // This counters the async behavior of $.each()
       .promise().done(function(){
          
        // Push the array of totals to the new friend object
      newfriends.totals = totalsArray;
        // POST the newfriends to the friends.js file and get back the best match
          var currentURL = window.location.origin;
          $.post(currentURL + "/api/friends", newfriends, function(data){
       // Add Best Match attributes to Modal
          $('#matchName').text(data.name);
          $('#matchImg').attr('src', data.photo);
            // Show the modal with the best match 
           $("#resultsModal").modal('toggle');
          }); // end AJAX POST
        });
       }
// Baselist of Friends Data
var stockfriends = [
    {
      name: "Mike D Jordan",
      photo: "https://m.media-amazon.com/images/M/MV5BMjExOTY3NzExM15BMl5BanBnXkFtZTgwOTg1OTAzMTE@._V1_.jpg",
      totals: [5, 4, 2, 3, 4, 1, 4, 1, 5, 1]
    },
    {
      name: "Kandi Burntness",
      photo:"https://cdnph.upi.com/svc/sv/upi/5611552925961/2019/1/36f32d85c6deca0cb9e28a6b5b76f1cb/Kandi-Burruss-says-shes-moved-forward-with-surrogacy.jpg",
      totals: [1, 2, 3, 4, 5, 5, 4, 3, 2, 1]
    },
    {
      name: "Keanu Leaves",
      photo:"https://i.redd.it/5w8w4ln4sin21.png",
      totals: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
      name: "Kylie Bender",
      photo:"https://hips.hearstapps.com/hbz.h-cdn.co/assets/15/25/hbz-kylie-jenner-transformation-2012-gettyimages-138511592.jpg",
      totals: [3, 2, 3, 4, 3, 1, 3, 5, 3, 4]
    },
    {
      name: "Meek Hill",
      photo:"https://images.complex.com/complex/images/c_limit,dpr_auto,q_90,w_720/fl_lossy,pg_1/gpd9pezystldeizeswhc/meek-mill-nyu",
      totals: [5, 4, 2, 2, 3, 3, 2, 1, 5, 5]
    },
    {
      name: "Chip Jonas",
      photo:"https://assets.teenvogue.com/photos/5c829092fa0b8705b1120e08/master/pass/00-tout-nick-jonas.jpg",
      totals: [5, 5, 2, 4, 2, 5, 5, 5, 5, 3]
    },
    {
      name: "Cloud Jackson",
      photo:"http://www.naturalhaircarenews.com/wp-content/uploads/2017/10/Skai.png",
      totals: [2, 2, 2, 3, 3, 3, 1, 5, 2, 4]
    },
    {
        name: " Scarlett Letter",
        photo:"https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg",
        totals: [5, 5, 5, 5, 5, 5, 5, 1, 1, 1]
      }
  ];
  
  
// Export to API Route
 module.exports = stockfriends;

