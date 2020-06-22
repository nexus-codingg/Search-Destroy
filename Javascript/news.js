//URL: http://www.gamespot.com/api/articles/?api_key=02a6f58c6c1dad1a35e97d9dbb05e8699381e856

// var kword;
// var aURL = ""

// $("#search-term").on("change", startSearch);
$("#userInput").on("keypress", function (e) {
if (e.key === "Enter") {
    // startSearch();
    console.log("User pressed 'Enter'");
    kword = $("#userInput").val();
    console.log("User input:", kword);
    
} 
})

// $.ajax({
//     url: aURL,
//     method: "GET",
//     dataType:"json",

// }).then(function(response){
//     console.log(response);
// })

// // startSearch();

// function startSearch(kword) {
    

// }
  



