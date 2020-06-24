// global default variables for genre and plaform
var genreSelected = 1;
var platformSelected = 1;
var gameID = 3498;
var urlForGenreList = "https://api.rawg.io/api/genres";
$.ajax({
    type: "GET",
    datatype: "json",
    url: urlForGenreList
}).then(function (response) {
    console.log(response)
    for (var i = 0; i < response.results.length; i++) {
        // arrayOfGenres.push(response.results[i].name);
        // var genreOptions = $("<option>").val(response.results[i].id).text(response.results[i].name);
        var genreOptions = $("<option>").val(response.results[i].id).text(response.results[i].name);
        // console.log(response.results[i].name + ' ID is: '+ response.results[i].id);
        // var genreOptions = $("<option>").attr({ id: "data-search"}).text(response.results[i].name);
        // genreOptions.attr("id", "genres");
        genreOptions.attr("id", response.results[i].name);
        $("#Genres").append(genreOptions);
        // console.log(genreOptions.val());
    }
})
var urlPlatformList = "https://api.rawg.io/api/platforms/lists/parents";
$.ajax({
    type: "GET",
    datatype: "json",
    url: urlPlatformList
}).then(function (response) {
    // console.log(response)
    for (var i = 0; i < response.results.length; i++) {
        // arrayOfGenres.push(response.results[i].name);
        // console.log(response.results[i].name);
        var platformOptions = $("<option>").val(response.results[i].id).text(response.results[i].name);
        console.log(response.results[i].name + ' ID is ' + response.results[i].id);

        platformOptions.attr("id", response.results[i].name);
        $("#platform").append(platformOptions);
    }
})
var singlePlayer = "https://api.rawg.io/api/games?tags=";
$.ajax({
    type: "GET",
    datatype: "json",
    url: singlePlayer
}).then(function (response) {
    
        console.log(response.results[15].tags[15].name)

})
//on change function to get genres' ID # 
$('#Genres').on('change', function () {
    genreSelected = $(this).val();
    // var genreClick = $(this).val();
    // genreSelected = genreClick;
    // genreSelected = JSON.stringify(genreValue);
    console.log('genreSelected ' + genreSelected);
    // console.log(stringNew);
});
//on change function to get platform' platform # 
$('#platform').on('change', function () {
    platformSelected = $(this).val();
    console.log('platformSelected id: ' + platformSelected);
});
$('#single').on('change', function () {

    singleSelect = $(this).val();

});
$('#multi').on('change', function () {

    multiSelect = $(this).val();

});
$("#finishBtn").on('click', function () {
    console.log('click finishBtn')
    getGamesRecommendation(genreSelected, platformSelected, ratingSelected, multiSelect, singleSelect);
});
// var genre = "action";
// var platformName = "PlayStation";
// Get games recommendation from genre and platform selected.
function getGamesRecommendation(genreSelected, platformSelected,) {
    console.log('inside getGames function genreselected is: ' + genreSelected + '   and plaform input: ' + platformSelected)
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://rawg.io/api/games?genres=" + genreSelected + "&parent_platforms" + platformSelected + "&page_size=40" + "&ordering=-rating"
        // url: "https://rawg.io/api/games?genres=" + genre + "&parent_platforms" + platformName + "&page_size=40" + "&ordering=-rating"
    }).then(function (response) {
        //global scope
        console.log(response)
        console.log('This is from the returnGame function')
        var arrayOfGenres = [];
        var arrayOfParentPlatforms = [];
        var arrayOfPlayers = []
        //global scope
        for (var i = 0; i < 3; i++) {
            var genres = response.results[i].genres;
            var parentPlatforms = response.results[i].parent_platforms;
            var gameName = response.results[i].name;
            var playerType = response.results[i].tags[15].name
            var gameID = response.results[i].id;
            console.log("game id is " + gameID)
            getESRBRating(gameID);
            var gameRating = response.results[i].rating;
            var moreGamesPages = response.next;
            // console.log(moreGamesPages)
            // var gameESRBList = $('<p>').html(esrbReturn);
            
            var gameNameList = $('<p>').html(gameName);
            var gameRatingList = $('<p>').html(gameRating);
            var gamePagesNext = $('<p>').html(moreGamesPages);
            var imgsURL = response.results[i].background_image;
            var gamePic = $('<img>').attr("src", imgsURL);
            console.log('imgs in loop ' + imgsURL);
            $('#bottom').prepend(gameNameList, gameRatingList, gamePagesNext, gamePic);
            for (var x = 0; x < genres.length; x++) { // genres
                arrayOfGenres.push(genres[x].name);
                // console.log(arrayOfGenres);
            }
            for (var y = 0; y < parentPlatforms.length; y++) { // platforms
                // console.log("test YU")
                arrayOfParentPlatforms.push(parentPlatforms[y].platform.name);
                // console.log("test CV")
            }
            for (var z = 0; z < arrayOfPlayers.length; z++){
                arrayOfPlayers.push(playerType[z].tag.name)
            }
            // console.log(arrayOfParentPlatforms)
            console.log("test point RE, line 94")
        }
    })
}

