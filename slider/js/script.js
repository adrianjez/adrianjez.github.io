$(document).ready(function () {

    var sliderOne = $("#slider-one");
    var startOne = $('#start-one');
    var stopOne = $('#stop-one');
    var nextOne = $('#next-one');
    var prevOne = $('#prev-one');

    var sliderTwo = $("#slider-two");
    var startTwo = $('#start-two');
    var stopTwo = $('#stop-two');

    sliderOne.slider({
        timeout: 1000,
        start: startOne,
        stop: stopOne,
        liveTime: 1000,
        next: nextOne,
        prev: prevOne
    });

    // sliderTwo.slider({timeout: 2000});


});
