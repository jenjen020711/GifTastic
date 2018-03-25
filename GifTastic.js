$(document).ready(function() {

// Initial array of animals
  var animals = ["lion", "tiger", "bear", "horse"];

  // Function for dumping the JSON content for each button into the div
  function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=mNlLpk8XyC8QxmHpPQ14lcFg7yX6rH3G&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {
      console.log(queryURL);
      console.log(response);
      var results = response.data;
      var imgArray = [];
      for(var i = 0; i < results.length; i++){
        var rating = results[i].rating;
        
        var newImg3 = $("<img>");
        newImg3.attr("src", results[i].images.original_still.url);
        newImg3.attr("data-still", results[i].images.original_still.url);
        newImg3.attr("data-animate", results[i].images.downsized_medium.url);
        newImg3.attr("data-state", "still");
        newImg3.addClass("gifs");
        imgArray.push(newImg3);
        $("#giphy-view").append("<br><br><p>Rated: " + rating + "</p>");
        $("#giphy-view").append(newImg3);


      }
    });
  }
  $("#giphy-view").on("click",".gifs",function(event){
    var state = $(this).attr("data-state");
    var animateGif = $(this).attr("data-animate");
    var stillGif = $(this).attr("still");
    if(state == 'still'){
      $(this).attr("src", animateGif);
      $(this).attr("data-state", "animate");
    }else{
      $(this).attr("src", stillGif);
      $(this).attr("data-state", "still");
    }

  })
 // Function for displaying animal data
 function renderButtons() {  

// Deleting the animals buttons prior to adding new animal buttons
// (this is necessary otherwise we will have repeat buttons)
  $("#animals-view").empty();

// Looping through the array of animals
   for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          // Adding a data-attribute with a value of the animal at index i
          a.attr("data-name", animals[i]);
          // Providing the button's text with a value of the animal at index i
          a.text(animals[i]);
          // Adding the button to the HTML
          $("#animals-view").append(a);
        }
      }

    // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

      // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();

      // The animal from the textbox is then added to our array
        animals.push(animal);
        

    // calling renderButtons which handles the processing of our animal array
      renderButtons();
    });

     // Function for displaying the movie info
      // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
      $(document).on("click", ".animal", displayAnimalInfo);

    // Calling the renderButtons function at least once to display the initial list of animals
      renderButtons();

});

