$(document).ready(function(){

// alert('javascript is linked');

    // sidebar toggle functionality
    $('#hamburger').on('click', function() {
        $('.ui.sidebar')
        .sidebar('attach events', '.toc.item')
        .sidebar('toggle');
    })
    

    $('.ui.dropdown')
        .dropdown();
})