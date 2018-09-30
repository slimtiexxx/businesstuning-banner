//////////////////////////////
//// smallPrint /////////////
////////////////////////////

var smallPrintOpened = false

var smallPrintStarWidth
var smallPrintStarHeight

var canvasWidth
var canvasHeight

function initSmallPrint(_params){

	_params = (typeof _params !== 'undefined') ? _params : {};
	_params.fullHeight = (typeof _params.fullHeight !== 'undefined') ? _params.fullHeight : true;
	
	canvasWidth = $(canvas).width()
	canvasHeight = $(canvas).height()
		
	smallPrintStarHeight = $( smallPrintStar ).height()
	smallPrintStarWidth = $( smallPrintStar ).width()

	smallPrint = document.getElementById("smallPrint")
	smallPrint.style.visibility = "visible"

	$( smallPrintContainer ).width(canvasWidth)
	$( smallPrintContainer ).height(canvasHeight)
	$( smallPrint ).width(canvasWidth)
	$( smallPrint ).height(canvasHeight)

	var smallprintPadding = $(smallPrintContent).css("padding-left").replace("px", "")

	$(smallPrintContent).css("padding-top", Math.round(smallprintPadding*.75));
	$(smallPrintContent).css("padding-bottom", Math.round(smallprintPadding*.75));

	$(smallPrintContent).css("overflow", "scroll");

	$( smallPrintContent ).width(canvasWidth-(smallprintPadding*2))	
	
	if(_params.fullHeight){
		$( smallPrintContent ).height(canvasHeight-Math.round(smallprintPadding*.75)*2)	
	}

	$( smallPrintStar ).mouseenter(function() {
		TweenMax.killDelayedCallsTo(smallPrintOut)
		smallPrintOver()
	  }).mouseleave(function() {
	  	TweenMax.delayedCall(.2, smallPrintOut)
	  });
	$( smallPrintContent ).mouseenter(function() {
		TweenMax.killDelayedCallsTo(smallPrintOut)
		smallPrintOver()
	  }).mouseleave(function() {
	  	TweenMax.delayedCall(.2, smallPrintOut)
	  });

	if (typeof smallPrintPosition == 'undefined') {
		TweenMax.to(smallPrint, 0, {x: canvasWidth+smallPrintStarWidth})
		TweenMax.to(smallPrint, 1, {x: canvasWidth, ease: Expo.easeInOut})		
	} else if(smallPrintPosition == "bl"){
		$( smallPrintStar ).css("left", 0);
		$( smallPrintStar ).css("top", -smallPrintStarWidth);
		TweenMax.to(smallPrint, 0, {y: canvasHeight+smallPrintStarHeight})
		TweenMax.to(smallPrint, 1, {y: canvasHeight, ease: Expo.easeInOut})		
	} else if(smallPrintPosition == "br"){
		////////////////////////console.log(stageWidth)
		$( smallPrintStar ).css("left", stageWidth-smallPrintStarWidth);
		$( smallPrintStar ).css("top", -smallPrintStarWidth);
		TweenMax.to(smallPrint, 0, {y: canvasHeight+smallPrintStarHeight})
		TweenMax.to(smallPrint, 1, {y: canvasHeight, ease: Expo.easeInOut})		
	}

}

function smallPrintOver(){
	if(smallPrintOpened) {
		return
	}
	
	smallPrintOpened = true

	if (typeof smallPrintPosition == 'undefined') {
		TweenMax.to(smallPrint, .8, {x: 0, ease: Expo.easeOut})
	} else if(smallPrintPosition == "bl" || smallPrintPosition == "br"){
		TweenMax.to(smallPrint, .8, {y: 0, ease: Expo.easeOut})
	}
}

function smallPrintOut(event) {

	if(!smallPrintOpened) {
		return
	}
	
	smallPrintOpened = false
	if (typeof smallPrintPosition == 'undefined') {
		TweenMax.to(smallPrint, .8, {x: canvasWidth, ease: Expo.easeInOut})
	} else if(smallPrintPosition == "bl" || smallPrintPosition == "br"){
		TweenMax.to(smallPrint, .8, {y: canvasHeight, ease: Expo.easeOut})
	}
};