var WIDESCREEN_WIDTH = 1600;
var MOBILE_WIDTH = 992;

// Disable scroll magic on small view ports
var toggleScrollMagic = function() {
	if($(window).width() <= MOBILE_WIDTH) {
		controller.enabled(false);
		// Revert any half-tweened elements
		$(".section-background, .timeline-event").css({"top": "", "opacity": 1});
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
			TweenMax.to(".intro img", 1, {top: "-300px", ease: Linear.easeNone})
		]);

	// build scene
	var scene = new ScrollScene({triggerElement: ".timeline", duration: 300, offset: 0})
						.setTween(tween)
						.addTo(controller);

	// 
	// Arrow tween
	// 
	var tween = new TimelineMax()
		.add([
			TweenMax.to(".intro .triple-arrow", 0.5, {opacity: 0, ease: Linear.easeNone})
		]);

	// build scene
	var scene = new ScrollScene({triggerElement: ".timeline", offset: 30})
						.setTween(tween)
						.addTo(controller);

	//
	// Timeline tween!
	//
	var additionalOffset = 0;
	var timelineTweens = $(".timeline-event").map(function(index, timelineEventEl) {
		// Fade in
		var tween = new TimelineMax()
			.add(TweenMax.to(timelineEventEl, 1, {opacity: "1", top: "-30px", ease: Linear.easeNone}));
		var scene = new ScrollScene({triggerElement: timelineEventEl, duration: 125, offset: -300 + additionalOffset})
			.setTween(tween)
			.addTo(controller);

		// Fade out
		var tween = new TimelineMax()
			.add(TweenMax.to(timelineEventEl, 1, {opacity: "0", ease: Linear.easeNone}));
		var scene = new ScrollScene({triggerElement: timelineEventEl, duration: 125, offset: 100 + additionalOffset})
			.setTween(tween)
			.addTo(controller);

		additionalOffset += 45 * ($(window).height()/1200);
	});

	$(window).resize(function() {
		toggleScrollMagic();
		scaleIntroSectionHeight();
	}).resize();
});