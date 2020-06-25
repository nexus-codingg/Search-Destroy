console.log("videos.js loaded");

var keyWord;
var mykey = configVideos.videoKey;
var secretkey = configVideos.videoSecretKey;
var mykey_2 = configVideos.videokey2;
var fullkey = configVideos.videoKey + configVideos.videoSecretKey + configVideos.videokey2;
console.log(fullkey);



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

  
function startSearch(){

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
    success: function(response){
        console.log(response)
        for (var i = 0; i < 3; i++) {
            embedVideo(response.items[i])
        }
    }
    
});
}

function embedVideo(videoItem){
    var video = $("<iframe>").attr("src", "https://www.youtube.com/embed/" + videoItem.id.videoId)
    var title = $("#video-title").text(videoItem.snippet.title)
    $(".content").append(title, video)
    console.log(videoItem)
}


$(".content").empty();








//     $.ajax(settings).done(function (newsData) {
//       console.log(newsData);

//       $(".ui.cards").empty();

//       for (var i = 0; i < newsData.value.length; i++) {
//         // console.log(newsData.value[i].title);
//         // console.log(newsData.value[i].image.thumbnail);
//         // console.log(newsData.value[i].datePublished);
//         // console.log(newsData.value[i].description);
//         // console.log(newsData.value[i].url);
//         console.log("--->", i, "-----", newsData.value[i]);
//         if (newsData.value[i].image.height !== 0) {
//           $(".ui.cards").attr("id", "articleNumber-" + i);
//           var image = $("<img>");
//           image
//             .attr("src", newsData.value[i].image.thumbnail)
//             .css({'width': '150', 'height': '150', 'float': 'left', 'padding-right': '10px'});

          
//           var title = $("<h3>");
//           title
//             .addClass("header")
//             .text(newsData.value[i].title.replace(/(<([^>]+)>)/gi, ""))
//             .css({'color': 'white', 'margin-top': '0'});;
//           var description = $("<div>");
//           description
//             .addClass("description")
//             .text(newsData.value[i].description.replace(/(<([^>]+)>)/gi, ""))
//             .css('color', 'white');
//           var date = $("<div>");
//           var formattedDate = new Date(newsData.value[i].datePublished);
//           formattedDate = formattedDate;
//           date.addClass("extra content")
//             .text(formattedDate)
//             .css('color', 'white');;
//           var url = $("<a>");
//           url
//             .addClass("extra content")
//             .attr({ href: newsData.value[i].url, target: "_blank" })
//             .text("The journey continues here.");
//           var content = $("<div>").addClass("content");

//           content.append(image, title, description, date, url);
//           $(".ui.cards").append(content);
          
//         }
//       }
//     });
//   }
});
