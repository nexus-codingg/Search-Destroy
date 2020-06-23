$(document).ready(function() {
    // When the user enters their input and presses "Enter", the search will begin
    $("#userInput").on("keypress", function (e) {
        if (e.key === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            console.log("User pressed 'Enter'");
            keyWord = $("#userInput").val(); // need to be able to translate spaces into a URL string
            console.log("User input:", keyWord);
            startSearch();
            $(".description").find("b").contents().unwrap();
        }
});

    function startSearch() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q="+ keyWord+ "&safeSearch=true",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                "x-rapidapi-key": "4a82c08a16msh6a8b75f3318464bp1d1de8jsncd298ab8e732"
            }
        }

        $.ajax(settings).done(function (newsData) {
            console.log(newsData); 

            $('.ui.cards').empty();

            for (var i = 0; i<newsData.value.length; i++){
                console.log(newsData.value[i].title);
                console.log(newsData.value[i].image.thumbnail);
                console.log(newsData.value[i].datePublished);
                console.log(newsData.value[i].description);
                console.log(newsData.value[i].url);   

                
                

                $('.ui.cards').attr('id', 'articleNumber-' + i);
                var image = $('<img>');
                image.append('src', newsData.value[i].image.thumbnail);
                // var title = $('<div>');
                // title.addClass('header').text(newsData.value[i].title);
                var description = $('<div>');
                description.addClass('description').text(newsData.value[i].description);
                var date = $('<div>');
                date.addClass('extra content').text(newsData.value[i].datePublished);
                var url = $('<div>');
                url.addClass('extra content').text(newsData.value[i].url);
                var content = $("<div>").addClass('content');

                

                $('.ui.cards').append(image);
                content.append(description,date, url);
                $('.ui.cards').append(content);
                
                // var replace = keyWord.replace(//g, “red”);

                // var replace = <>/ig;
                //     alert(txt.replace(rex , ""));
            }
        });       
    }
})





