console.log("videos.js loaded");

var keyWord;

//This is for the config JS to try and hide API Keys so when forking the project you'll need API Keys 
// var mykey = configVideos.videoKey;
// var secretkey = configVideos.videoSecretKey;
// var mykey_2 = configVideos.videokey2;
// var fullkey = configVideos.videoKey + configVideos.videoSecretKey + configVideos.videokey2;
// console.log(fullkey);

var fullkey = "" // You will need a Google API Key to make this work -> console.developers.google.com 
                // article to help set up the the Youtube video search call -> https://dev.to/aveb/making-your-first-get-request-to-youtube-search-api-4c2f



$(document).ready(function () {
  // When the user enters their input and presses "Enter", the search will begin
  $("#userInput").on("keypress", function (e) {
    if (e.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      console.log("User pressed 'Enter'");
      keyWord = $("#userInput").val();
      console.log("User input:", keyWord);
      startSearch();
    }
  });


  function startSearch() {
    
    $("#search-header").empty();

    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search",
      type: "GET",
      data: {
        key: fullkey,
        q: keyWord,
        part: "snippet", // For this particular endpoint, this is the only permitted query parameter. Do not change this. 
        maxResults: 4, // Doesn't matter what this is, as long as it is above 3, use 4 to be safe. 
        type: "video",
        videoEmbeddable: "true",
      },
      success: function (response) {
        $("#video-Content").empty();
        console.log(response)

        var header = $("<h1>").html("Pick Your Poison...").attr("id", "search-header")
        $("#video-container").prepend(header)

        for (var i = 0; i < 3; i++) {
          embedVideo(response.items[i])
        }
        function embedVideo(videoItem) {
          var video = $("<iframe>").attr("src", "https://www.youtube.com/embed/" + videoItem.id.videoId)
          var title = $("<h3>").text(videoItem.snippet.title)
          $("#video-Content").append(title, video)
          console.log(videoItem)
        }
        // end of response function
      }
      // end of the ajax call
    });
    // end of the startSearch function
  }
  //end of document.ready 
});
