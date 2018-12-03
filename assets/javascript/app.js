var topics = ["Cat", "Dog", "Hamster", "Bird", "Turtle"];
var categoryButtons = $('.categoryButtons');
var gifContainer = $('.gifContainer');
var submitButton = $('#newButtonText');
var textField = $('input');

function init() {
    submitButton.click(function() {
        addButton();
    });
    createButtons();
}

function addButton() {
    topics.push(textField.val());
    categoryButtons.empty();
    createButtons();
}

function createButtons() {
    for(var i=0; i < topics.length; i++) {
        var newButton = $('<button>');
        newButton.addClass("btn btn-secondary mx-1 my-1");
        newButton.text(topics[i]);
        newButton.click(function() {
            gifContainer.empty();
            getGif($(this).text());
        });
        categoryButtons.append(newButton);
    }
}

function getGif(search) {
    search = search.replace(/ /g,"+");
    var hotdog = $.get("http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=JvCSxxvKPyChJ9V1dVDFvmYmGlm6UuEn&limit=10");
    hotdog.done(function(data) { 
        var results = data["data"];
        for(var i=0; i<10; i++) {
            var newSpan = $('<span>');
            var newImage = $('<img>');
            var imageRating = $('<p>');
            imageRating.text("Rating: " + results[i]["rating"]);
            newImage.attr('src', results[i]["images"]["fixed_height_still"]["url"]);
            newImage.attr('data-still', results[i]["images"]["fixed_height_still"]["url"]);
            newImage.attr('data-animated', results[i]["images"]["fixed_height"]["url"]);
            newImage.attr('data-moving', false);
            newImage.click(function() {
                if($(this).attr('data-moving') === "true") {
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-moving', false);
                }
                else {
                    $(this).attr('src', $(this).attr('data-animated'));
                    $(this).attr('data-moving', true);
                }
            });
            newSpan.append(newImage);
            newSpan.append(imageRating);
            gifContainer.append(newSpan);
        }
    });
}

init();
