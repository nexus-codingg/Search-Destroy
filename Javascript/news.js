$(document).ready(function() {
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

        $.ajax(settings).done(function (newsData) {
            console.log(newsData); 

            for (var i = 0; i<newsData.value.length; i++){
                console.log(newsData.value[i].title);
                console.log(newsData.value[i].image.thumbnail);
                console.log(newsData.value[i].datePublished);
                console.log(newsData.value[i].description);
                console.log(newsData.value[i].url);   

                // var cardCreation = $('<div>');
                // cardCreation.addClass('ui card');
                // cardCreation.attr('id', 'articleNumber-' + i);
                // var addImage = $('<div>');
                // addImage.addClass('image');

                // $('#articleNumber-' +i).append('h2' + newsData.value[i].title);

            }
        });       
    }
})


