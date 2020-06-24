console.log("videos.js loaded");

keyWord;
var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;
var mykey_2 = config.KEY_2;
var fullkey = config.MY_KEY + config.SECRET_KEY + config.KEY_2;
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
      getVideo();
    }
  });


  function getVideo() {
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: fullkey, 
            q: "cats",
            part: 'snippet',
            maxResults: 1,
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(data){
            embedVideo(data)
        },
        error: function(response){
            console.log(response);
            console.log("Request Failed");
        }
    });
}
// function embedVideo(data) {
//     $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
//     $('h3').text(data.items[0].snippet.title)
//     $('.description').text(data.items[0].snippet.description)
// }











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
