//Add Variables Here
var buttons = ["DownHill Racing", "Deadpool", "Baja Racing", "Extreme Sports"];
var apiKey = "rda163IGyo50t6t4bTTnXgkSvmQCZfXb";
var addGifs = 0;
var giphy = "";
var giphyResult = []
var favGif = []
// var url = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

//Click Event



//Functions

function setUpPage() {

    renderButtons();

};

function addButton() {
    var input = $("#giphy-input").val().trim();
    console.log(input)
    if (buttons.indexOf(input) == -1) {
        buttons.push(input);
    };
    renderButtons();
};

function renderButtons() {
    $(".button-array").empty()
    console.log(buttons)
    for (let i = 0; i < buttons.length; i++) {
        //$("#movies-view").append("<button>" + movies[i] + "</button>");
        var a = $("<button>");
        a.attr("class", "btn btn-dark btn-sm");
        a.attr("id", "btn");
        a.attr("data-name", buttons[i]);
        // a.attr("value", buttons[i]);
        a.text(buttons[i]);
        $(".button-array").append(a);
    };
}

function getResults(category) {
    console.log($(this).attr("data-name"));
    $(".results-col").empty();
    addGifs = 0;
    rating = "r"
    giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=" + apiKey + "&limit=50";
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        giphyResult = response
        console.log(response);
        for (let i = 0; i < 9; i++) {
            // $("#movie-view").text(JSON.stringify(response));
            var imageUrl = response.data[i].images.original_still.url;
            // console.log(response.data[i].images.original.url)
            var card = $("<div>");
            card.attr("class", "card");
            card.attr("id", "card-" + i);
            //card.attr("data-index", response.index(this));
            card.attr("style", "width: 12rem;");
            //<img class="card-img-top" src="" alt="">
            var gifImage = $("<img>");
            gifImage.attr("class", "card-img-top");
            gifImage.attr("id", "gif");
            gifImage.attr("src", imageUrl);
            gifImage.attr("data-still", response.data[i].images.original_still.url);
            gifImage.attr("data-animate", response.data[i].images.original.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("alt", response.data[i].title);

            var cBody = $("<div>");
            cBody.attr("class", "card-body");
            cBody.attr("id", "card-body-" + i);

            var cP = $("<p>");
            cP.text("Title: " + response.data[i].title)

            var cP2 = $("<p>");
            cP2.text("Rating: " + response.data[i].rating);

            // var cButton = $("<a>");
            // cButton.attr("href", imageUrl);
            // cButton.attr("download", "giffy" + i + "." + response.data[i].type)
            // cButton.attr("class", "btn btn-dark");
            // cButton.text("Download");

            //prepend image to the images id
            $(".results-col").append(card);
            $("#card-" + i).append(gifImage);
            $("#card-" + i).append(cBody);
            $("#card-body-" + i).append(cP);
            $("#card-body-" + i).append(cP2);
            //$("#card-body-" + i).append(cButton);
            addGifs++
        };

    });

};

function addMore() {

    //var endingCount = addGifs += 10;
    console.log(giphyResult.data[addGifs].images.original.url);
    var j = addGifs;
    for (let i = 0; i < 9; i++) {
        // $("#movie-view").text(JSON.stringify(response));

        var imageUrl = giphyResult.data[j].images.original_still.url;
        console.log(giphyResult.data[j].images.original.url);
        var card = $("<div>");
        card.attr("class", "card");
        card.attr("id", "card-" + j);
        card.attr("style", "width: 12rem;")

        var gifImage = $("<img>");
        gifImage.attr("class", "card-img-top");
        gifImage.attr("id", "gif");
        gifImage.attr("src", imageUrl);
        gifImage.attr("data-still", giphyResult.data[j].images.original_still.url);
        gifImage.attr("data-animate", giphyResult.data[j].images.original.url);
        gifImage.attr("data-state", "still");
        gifImage.attr("alt", giphyResult.data[j].title);

        var cBody = $("<div>");
        cBody.attr("class", "card-body");
        cBody.attr("id", "card-body-" + j);

        var cP = $("<p>");
        cP.text("Title: " + giphyResult.data[j].title);

        var cP2 = $("<p>");
        cP2.text("Rating: " + giphyResult.data[j].rating)

        // var cButton = $("<a>");
        // cButton.attr("href", "#");
        // cButton.attr("class", "btn btn-dark");
        // cButton.text("Download");
        // console.log(card);

        //prepend image to the images id
        $(".results-col").append(card);
        $("#card-" + j).append(gifImage);
        $("#card-" + j).append(cBody);
        $("#card-body-" + j).append(cP);
        $("#card-body-" + j).append(cP2);
        //$("#card-body-" + j).append(cButton);

        j++;
        addGifs++
    };

    //addGifs = endingCount



};

function animateGif() {
    //console.log($(this).attr("id"));
    var state = $(this).attr("data-state");
    //console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        //$(this).data("state", "animate");
        console.log("True");
        //console.log($(this).attr("alt"))
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        //$(this).data("state", "still");
        console.log("False");
    }

};


$(document).on("click", "#btn", getResults);

$(document).on("click", "#add-gif-button", addButton);

$(document).on("click", "#add-more", addMore);

$(document).on("click", "#gif", animateGif);