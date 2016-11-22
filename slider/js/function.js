(function ($) {

    $.fn.slider = function (config) {
        // console.log('config', config);
        var that = this;

        //CONFIGURATION
        if (typeof(config) === 'undefined') {
            var config = {};
        }

        if (typeof(config.timeout) === 'undefined') {
            config.timeout = 1000;
        }

        if (typeof(config.start) === 'undefined') {
            config.start = false;
        }

        if (typeof(config.stop) === 'undefined') {
            config.stop = false;
        }

        if (typeof(config.liveTime) === 'undefined') {
            config.liveTime = 1000;
        }

        if (typeof(config.next) === 'undefined') {
            config.next = false;
        }

        if (typeof(config.prev) === 'undefined') {
            config.prev = false;
        }
        // END CONFIGURATION

        var slides = this.children();	// TABLE OF ALL SLIDES
        var maxSlide = slides.length;   // LAST SLIDE
        init();
        function init() {
            $(slides[0]).clone().appendTo(that);
            $(slides[maxSlide - 1]).clone().prependTo(that);

            that.css('left', '-100%');
            that.css('width', ( maxSlide + 2) * 100 + '%');

        }
        var allowClick = true;
        var running = false;
        var temporary_block = false;

        var currentSlide = 1;
        var nextSlide = 2;
        var prevSlide = maxSlide;

        //this.css('width', (2 + maxSlide) * 100 + '%'); // SET WIDTH OF SLIDER
        var interval;

        function startSlide() {

            if(!running) {
                console.log('start slide111');
                interval = setInterval(move, config.liveTime + config.timeout);
                running = true;
            }
        }

        function stopSlide() {
            console.log('stop slide');
            running = false;
            clearTimeout(interval);
        }

        if (config.start !== false) {
            config.start.click(function () {
                startSlide();

            })
        }

        if (config.stop !== false) {
            config.stop.click(function () {
                stopSlide();
            })
        }


        function prevSlidee() {
            if (currentSlide === 0) {
                currentSlide = maxSlide;
            }
            else {
                currentSlide--;
            }

            move('backward');
        }

        function nextSlidee() {
            if (currentSlide === 1) {
                prevSlide = maxSlide;
            } else {
                prevSlide = currentSlide - 1;
            }

            move('forward');
        }

        if (config.next !== false) {

            config.next.click(function () {

                if(running) {
                    temporary_block = true;
                    stopSlide();
                }
                if(allowClick) {
                    allowClick = false;
                    nextSlidee();
                    // setNextSlide();
                    // setPrevSlide();
                }
            })
        }


        if (config.prev !== false) {
            config.prev.click(function () {

                if(running) {
                    temporary_block = true;
                    stopSlide();
                }

                if(allowClick) {
                    allowClick = false;
                    prevSlidee();
                }
            })
        }

        function move(direction) {
            allowClick = false;
            if (!direction) {
                direction = 'forward'
            }



            if ((currentSlide > 1 && currentSlide < maxSlide && direction == 'forward')
                || direction == 'forward' && currentSlide == 1) {
                console.log('1');
                that.animate({
                    // left: "-" + (((currentSlide % maxSlide) * 100)+100) + "%"
                    left: "-" + (((currentSlide % maxSlide) * 100) + 100) + "%"
                }, config.timeout, function () {

                    if (currentSlide === maxSlide) {
                        currentSlide = 1;
                    }
                    else {
                        currentSlide++;
                    }
                    allowClick = true;

                    if(temporary_block) {
                        startSlide();
                        temporary_block = false;
                    }
                });
            }

            else if (currentSlide == 0 && direction == 'backward') {
                console.log('2');

                that.animate({
                    left: "0%"
                }, config.timeout, function () {
                    console.log('currentSlideasds', currentSlide);
                    console.log('maxSlide', maxSlide);
                    that.css('left', ((maxSlide) * -100) + '%');
                    if (currentSlide == 0) {
                        currentSlide = maxSlide;
                    }
                    else {
                        currentSlide--;
                    }
                    allowClick = true;

                    if(temporary_block) {
                        startSlide();
                        temporary_block = false;
                    }
                });
            }
            else if (direction == 'backward' && currentSlide > 0) {
                console.log('2.5');

                that.animate({
                    left: "-" + (((currentSlide) * 100) ) + "%"
                }, config.timeout, function () {
                    // currentSlide--;
                    allowClick = true;

                    if(temporary_block) {
                        startSlide();
                        temporary_block = false;
                    }
                });

            }
            else if (currentSlide == maxSlide && direction == 'forward') {
                console.log('3');
                that.animate({
                    left: "-" + ((maxSlide + 1 ) * 100) + "%"
                }, config.timeout, function () {
                    console.log('asdas');
                    that.css('left', '-100%');

                    if (currentSlide === maxSlide) {
                        currentSlide = 1;
                    }
                    else {
                        currentSlide++;
                    }

                    allowClick = true;

                    if(temporary_block) {
                        startSlide();
                        temporary_block = false;
                    }
                });
            }

            setNextSlide();
            setPrevSlide();
        }

        function stopMove() {
        }

        function setNextSlide() {
            if (currentSlide === maxSlide) {
                nextSlide = 1;
            } else {
                nextSlide = currentSlide + 1;
            }
        }

        function setPrevSlide() {
            if (currentSlide === 1) {
                prevSlide = maxSlide;
            } else {
                prevSlide = currentSlide - 1;
            }
        }

        return this;
    };


}(jQuery));
