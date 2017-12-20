$(document).ready(function () { 


    $('.carousel').carousel({
        interval: 3000
    })


    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
        navMain.collapse('hide');
    });

});


smoothScroll.init({
    selector: '[data-scroll]',
    selectorHeader: null,
    speed: 800,
    easing: 'easeInOutCubic',
    offset: 0
});