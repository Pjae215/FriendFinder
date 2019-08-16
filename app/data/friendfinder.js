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

// // Function to valid user input
// function completed(callback){
//   // Check through all the questions (i.e. iterate through all of class "radio-inline")
//         var selectionvalid;
//  $(".radio-inline").each(function(){ 
//     if ( $(this).val() == "" ){
//       selectionvalid = false;
//     }
//   })
//   // This counters the async behavior of $.each()
//   .promise().done(function(){
//     // Check if any questions are incomplete
//     if(selectionvalid == false){
//       AnswerValid = false;
//     }
// //     // Determine if Name is entered
//     else if( $('#formName').val().trim() == "" ){
//       AnswerValid = false;
//     }
//     // Determine if Link is entered
//     else if( $('#formImage').val().trim() == "" ){
//       AnswerValid = false;
//     }
// //     // Otherwise, the all fields are completed
//      else{
//        AnswerValid = true;
//      }
//      // Fire Off Callback (to counter async behavior of $.each)
//      callback();       
//    });
//  }

//  function storedata(){
//     // Make new friend object
//    var newfriends = {
//           name: $("#name").val().trim(),
//           photo: $("#photo").val().trim(),
//           totals: []
//         };
//    // Loop through Questions to get totals
//         var totalsArray = [];
//         $('.radio-inline').each(function(){
//           totalsArray.push( parseInt( $(this).val() ) ); // Parse Input Value as integer
//         })
//   // This counters the async behavior of $.each()
//        .promise().done(function(){
          
//         // Push the array of totals to the new friend object
//       newfriends.totals = totalsArray;
//         // POST the newfriends to the friends.js file and get back the best match
//           var currentURL = window.location.origin;
//           $.post(currentURL + "/api/friends", newfriends, function(data){
//        // Add Best Match attributes to Modal
//           $('#matchName').text(data.name);
//           $('#matchImg').attr('src', data.photo);
//             // Show the modal with the best match 
//            $("#resultsModal").modal('toggle');
//           }); // end AJAX POST
//         });
//        }