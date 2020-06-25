// global default variables for genre and plaform, includes all genres&parent_platform IDs from rawg api
var genreSelected = '1,2,3,4,5,6,7,10,11,14,15,17,19,28,34,40,51,59,83';
var platformSelected = '1,2,3,4,5,6,7,8,9,10,11,12,13,14';
// var gameID = 3498;

//Ajax call to get all genres to append to <select> Genres
$.ajax({
    type: "GET",
    datatype: "json",
    url: "https://api.rawg.io/api/genres"
}).then(function (response) {
    console.log(response)
    for (var i = 0; i < response.results.length; i++) {
        var genreOptions = $("<option>").val(response.results[i].id).text(response.results[i].name);
        console.log(response.results[i].name + ' GENRES-ID is: ' + response.results[i].id);
        genreOptions.attr("id", response.results[i].name);
        $("#Genres").append(genreOptions);
    }
})

//Ajax call to get all parent_platforms to append to <select> platform
$.ajax({
    type: "GET",
    datatype: "json",
    url: "https://api.rawg.io/api/platforms/lists/parents"
}).then(function (response) {
    // console.log(response)
    for (var i = 0; i < response.results.length; i++) {
        // console.log(response.results[i].name);
        var platformOptions = $("<option>").val(response.results[i].id).text(response.results[i].name);
        console.log(response.results[i].name + ' PLATFORM-ID is ' + response.results[i].id);
        platformOptions.attr("id", response.results[i].name);
        $("#platform").append(platformOptions);
    }
})

//on change function to get genres' ID # from user 
$('#searchGame-btn').on('click', function (event) {
    event.preventDefault();
    var gameSearch = $('#game-search').val();
    console.log("SEARCH GAME " + gameSearch)
    getGameInfo(gameSearch);
    $('#gameRecContainer').removeClass('hidden').addClass('active');
    $("#topRatedContainer").empty();
    $("#randomContainer").empty();
});

//on change function to get genres' ID # from user 
$('#Genres').on('change', function () {
    genreSelected = $(this).val();
    // var genreClick = $(this).val();
    console.log('genreSelected ' + genreSelected);
});

//on change function to get platform' platform # from user
$('#platform').on('change', function () {
    platformSelected = $(this).val();
    console.log('platformSelected id: ' + platformSelected);
});

//Bigbutton to call getGamesRecommendation
$("#bigButton").on('click', function () {
    $('#middle').removeClass('hidden').addClass('active');
    console.log('click bigButton')
    getGamesRecommendation(genreSelected, platformSelected);
    $("#getRecContainer").addClass("hidden");
});
//FINISH button to call getGamesRecommendation
$("#finishBtn").on('click', function () {
    console.log('click finishBtn')
    getGamesRecommendation(genreSelected, platformSelected);
    $('#gameRecContainer').removeClass('hidden').addClass('active');
});



function getGameInfo(gameSearch) {
    // var urlESRBapi= "https://api.rawg.io/api/games/";
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api.rawg.io/api/games?&page_size=5&search=" + gameSearch
        // url: "https://api.rawg.io/api/games?ordering=-released&search=" + gameSearch
    }).then(function (response) {
        console.log('GETGAMEINFO api')
        console.log(response)
        $('#topRatedContainer').empty();
        for (var i = 0; i < response.results.length; i++) {
            var gameID = response.results[i].id;
            var gameName = response.results[i].name;
            var gameRating = response.results[i].rating;
            var gameReleased = response.results[i].released;
            var gameNameList = $('<div>').html('Title:' + " " + gameName).attr("id", "gameRec-text");
            var gameRatingList = $('<div>').html('Ratings:   ' + gameRating).attr("id", "gameRec-text");
            var gameReleasedList = $('<div>').html('Released Date:  ' + gameReleased).attr("id", "gameRec-text");
            var imgsURL = response.results[i].background_image;
            var gamePic = $('<img>').attr("src", imgsURL).width('400px').height('400px');
            // console.log('imgs in loop ' + imgsURL);
            $('#topRatedContainer').append(gameNameList, gameRatingList, gameReleasedList, gamePic);
            
        }
        
        var nextPage = response.next;
        if (nextPage !== null) {
            getNextPageGames(nextPage);
            // $('#topRatedContainer').prepend('<a href="'+nextPage + '">' + nextPage +'</a><br>');
        }

    })
}

//function if there's more games on response.next
function getNextPageGames(nextPage){
    $.ajax({
        type: "GET",
        datatype: "json",
        url: nextPage
    }).then(function (response){
        console.log('getNextPageGames Function! ' + nextPage)
        console.log(response)
    })
}

//Random generated recommendations  
function randomRecommendations(randomPage, genreSelected, platformSelected) {
    //delte previous results from bottom
    $('#randomContainer').empty();
    // https://api.rawg.io/api/games?genres=1&page=3&page_size=3&parent_platforms=1
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://rawg.io/api/games?genres=" + genreSelected + "&page=" + randomPage + "&page_size=3&parent_platforms=" + platformSelected
    }).then(function (response) {
        console.log('randomPage number!!!! ' + randomPage)
        console.log(response)
        $('#randomContainer').html('<h2>RANDOM GAMES!')

        for (var i = 0; i < 3; i++) {
            var gameID = response.results[i].id;
            var gameName = response.results[i].name;
            var gameRating = response.results[i].rating;
            var gameReleased = response.results[i].released;
            var gameNameList = $('<div>').html('Title:' + " " + gameName).attr("id", "gameRec-text");
            var gameRatingList = $('<div>').html('Ratings:   ' + gameRating).attr("id", "gameRec-text");;
            var gameReleasedList = $('<div>').html('Released Date: ' + gameReleased).attr("id", "gameRec-text");
            var imgsURL = response.results[i].background_image;
            var gamePic = $('<img>').attr("src", imgsURL).width('400px').height('400px');
            // console.log('imgs in loop ' + imgsURL);
            $('#randomContainer').append(gameNameList, gameRatingList, gameReleasedList, gamePic);
        }

        nextPage = response.next;
        if (nextPage !== null) {
            console.log('RANDOM Recomm function NEXTpage ' + nextPage)
        }
    })
}

// Get games recommendation from genre and platform selected.
function getGamesRecommendation(genreSelected, platformSelected) {
    //delete previous results from bottom
    $('#topRatedContainer').empty();

    console.log('inside getGames function genreselected is: ' + genreSelected + '   and plaform input: ' + platformSelected)
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://rawg.io/api/games?genres=" + genreSelected + "&parent_platforms=" + platformSelected + "&page_size=3" + "&ordering=-rating"
        // url: "https://rawg.io/api/games?genres=" + genre + "&parent_platforms" + platformName + "&page_size=40" + "&ordering=-rating"

    }).then(function (response) {
        console.log(response)
        console.log('Total count of games: ' + response.count)
        //generate a random number for pages to get for games selected by game count x .01.
        var randomPage;
        if (response.count < 1000) {
            randomPage = Math.ceil(Math.random() * (response.count * .3));
        } else if (response.count < 11000) {
            randomPage = Math.ceil(Math.random() * (response.count * .2));
            // console.log('count is greater than 11000' + response.count)
        } else {
            randomPage = Math.ceil(Math.random() * (response.count * .01));
        }

        console.log('Total random pages: ' + randomPage)
        $('#topRatedContainer').html('<h2>TOP RATED GAMES!');

        for (var i = 0; i < 3; i++) {
            var gameID = response.results[i].id;
            var gameName = response.results[i].name;
            var gameRating = response.results[i].rating;
            var gameReleased = response.results[i].released;
            // var gameESRBList = $('<p>').html(esrbReturn);
            var gameNameList = $('<div>').html('Title:' + " " + gameName).attr("id", "gameRec-text");
            var gameReleasedList = $('<div>').html('Released Date: ' + gameReleased).attr("id", "gameRec-text")
            var gameRatingList = $('<div>').html('Ratings:   ' + gameRating).attr("id", "gameRec-text");
            var imgsURL = response.results[i].background_image;
            var gamePic = $('<img>').attr("src", imgsURL).width('400px').height('400px');
            // console.log('imgs in loop ' + imgsURL);
            $('#topRatedContainer').append(gameNameList, gameRatingList, gameReleasedList, gamePic);
        }
        nextPage = response.next;
        if (nextPage !== null) {
            console.log('getGameRecomm function NEXTpage' + nextPage)
        }
        //pass the randomPage that's generated
        randomRecommendations(randomPage, genreSelected, platformSelected);
    })

}

function getESRBRating(gameID) {
    // var urlESRBapi= "https://api.rawg.io/api/games/";
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api.rawg.io/api/games/" + gameID
    }).then(function (response) {
        console.log('ESRB ratings function')
        console.log(response)
        // console.log(response.esrb_rating.name)
        // var esrbReturn = response.ratings_count;
    })
}
