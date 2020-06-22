// This will pull up the most popular articles based on the user's key word

var keyWord;
var searchURL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?autoCorrect=true&pageNumber=1&pageSize=10&q=" + keyWord + "&safeSearch=true"
var apiKey = "?rapidapi-key=4a82c08a16msh6a8b75f3318464bp1d1de8jsncd298ab8e732"

// this is the ajax call break down from rapidAPI
// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=Taylor%20Swift&safeSearch=false",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "4a82c08a16msh6a8b75f3318464bp1d1de8jsncd298ab8e732"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });




// When the user enters their input and presses "Enter", the search will begin
$("#userInput").on("keypress", function (e) {
    if (e.key === "Enter") {

        event.stopPropagation();
        event.preventDefault();
        console.log("User pressed 'Enter'");
        keyWord = encodeURIComponent($("#userInput").val()); // need to be able to translate spaces into a URL string
        console.log("User input:", keyWord);
        startSearch();
 }
 
});

function startSearch() {
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q="+ keyWord+ "&safeSearch=false",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
		"x-rapidapi-key": "4a82c08a16msh6a8b75f3318464bp1d1de8jsncd298ab8e732"
	}
}
$.ajax(settings).done(function (response) {
    console.log("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q="+ keyWord+ "&safeSearch=false",
    );
	console.log(response);
});
}







