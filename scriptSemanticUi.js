$(document).ready(function(){

// alert('javascript is linked');

    // sidebar toggle functionality
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item')
        .sidebar('toggle');

})