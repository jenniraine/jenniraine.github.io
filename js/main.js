var WIDESCREEN_WIDTH = 1600;
var MOBILE_WIDTH = 1024;

// Disable scroll magic on small view ports
var toggleScrollMagic = function() {
	if($(window).width() <= MOBILE_WIDTH) {
		controller.enabled(false);
		$(".section-background").css("top", "");
	} else {
		controller.enabled(true);
	}
};

var scaleIntroSectionHeight = function() {
	var $introSection = $('.intro');
	var maxHeight = parseInt($introSection.css("max-height"));
	var windowWidth = $(window).width();

	// Don't do this for mobile
	if(windowWidth <= MOBILE_WIDTH) {
		$introSection.css("height", "");
		return;
	}

	if($(window).width() < WIDESCREEN_WIDTH) {
		var ratio = $(window).width()/WIDESCREEN_WIDTH;
		var scaledHeight = maxHeight*ratio*0.9;
		$introSection.height(scaledHeight);
		var $message = $introSection.find(".intro-message");
	} else {
		console.log("at widescreen width");
		$introSection.height(maxHeight);
	}

	console.log("Height of intro section is: ", $introSection.height());
};


$(document).ready(function() {
	window.controller = new ScrollMagic({vertical: true});
	// build tween
	var tween = new TimelineMax()
		.add([
			TweenMax.to(".intro img", 1, {top: "-350px", ease: Linear.easeNone})
		]);

	// build scene
	var scene = new ScrollScene({triggerElement: ".timeline", duration: 600, offset: 0})
						.setTween(tween)
						.addTo(controller);
	scene.addIndicators();

	//
	// Timeline tween!
	//
	var additionalOffset = 0;
	var timelineTweens = $(".timeline-event").map(function(index, timelineEventEl) {
		// Fade in
		var tween = new TimelineMax()
			.add(TweenMax.to(timelineEventEl, 1, {opacity: "1", ease: Linear.easeNone}));
		var scene = new ScrollScene({triggerElement: timelineEventEl, duration: 50, offset: -300 + additionalOffset})
			.setTween(tween)
			.addTo(controller);
		scene.addIndicators();

		// Fade out
		var tween = new TimelineMax()
			.add(TweenMax.to(timelineEventEl, 1, {opacity: "0", ease: Linear.easeNone}));
		var scene = new ScrollScene({triggerElement: timelineEventEl, duration: 50, offset: 100 + additionalOffset})
			.setTween(tween)
			.addTo(controller);
		scene.addIndicators();

		additionalOffset += 50 * ($(window).height()/1200);
	});

	$(window).resize(function() {
		toggleScrollMagic();
		scaleIntroSectionHeight();
	}).resize();
});