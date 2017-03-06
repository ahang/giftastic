$(document).ready(function() {
    //Create an array of strings
    //Loop through the array and appends a button for each string
    //When user clicks on a button, the page should grab 10 static, non-animated gif images form GIPHY and places them on the page
    //When User clicks one of the still GIPHY images, the gif should animate and if clicked on again the gif should stop playing again.
    //Every Gif shoulld display its rating

    //Add a form that allows user to input their text and add it to the array
    //Working link - http://api.giphy.com/v1/gifs/search?q=iron+man&limit=10&api_key=dc6zaTOxFJmzC

    /////////////////////////////
    var marvelCharacters = ["Iron Man", "Spiderman", "Starlord", "Captain America", "Bruce Banner", "Thor", "Deadpool", "Wolverine", "Thanos", "Daredevil", "Doctor Strange", "Black Widow"];

    //displayMarvelInfo function will dispays the appropriate content in the character div
    function displayMarvelInfo() {
        //console.log("Clicked");
        reset(); //emptys out the character div for each character button pressed
        var display = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=marvel+" + display + "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

        //Creating AJAX call for each of the character buttons being click
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            //Checking to see JSON
            //$(".characters").html(JSON.stringify(response));

            var results = response.data; //storing an array of results
            //looping through every result item
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    console.log("loop check");
                    var marvelDiv = $("<div class='chars'>"); //creating a div to hold the chars

                    var rating = results[i].rating; // storing the rating data
                    var pRate = $("<p>").text("Rating: " + rating); //creating an element with the result of the rating

                    var marvelImage = $("<img>"); //creating a img div
                    marvelImage.addClass("gif");

                    marvelImage.attr({
                        "src": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url,
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-state": "still" });
                    //marvelImage.attr("src", results[i].images.fixed_height.url);

                    marvelDiv.append(pRate); //appends the rating
                    marvelDiv.append(marvelImage); //appends the image

                    $(".characters").prepend(marvelDiv); //Adding the gifs to the characters div
                }
            }
        });
    };

    //Creating a function to render the buttons
    function renderButtons() {

        //Deleting existing buttons prior to adding new buttons to avoid duplication
        $(".marvel-view").empty();

        //Looping through the characters and generating buttons for each character of the array
        for (var i = 0; i < marvelCharacters.length; i++) {
            var charButton = $("<button>"); //creating a button
            charButton.addClass("mCharacters"); //adding character class
            charButton.attr("data-name", marvelCharacters[i]); //adding an attr of the data-name
            console.log(charButton);
            charButton.text(marvelCharacters[i]); //adding the text to the button
            $(".marvel-view").append(charButton); //appending it to the div
        }
    }
    //emptys our the characters div
    function reset() {
        $(".characters").empty();
    }

    //adding on click to handle the submission of a new character
    $(".add-marvel").on("click", function(event) {

        event.preventDefault(); //stops the page from refreshing on click

        var marvelChar = $(".marvel-input").val().trim(); //grabbing the input and trimming out any extra whitespace
        marvelCharacters.push(marvelChar); //adds the input to the array
        renderButtons(); //re-renders the button with the newly added character
    });

    $(document).on("click", "button", displayMarvelInfo);

    $(document).on("click", ".gif", function() {
        console.log("Clicked");
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
             $(this).attr("src", $(this).attr("data-still"));
             $(this).attr("data-state", "still");
        }
    });

    //Rendering the button
    renderButtons();

});