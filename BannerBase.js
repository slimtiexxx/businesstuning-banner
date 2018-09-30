var banner
var noLoop = false

var isChrome = !!window.chrome && !!window.chrome.webstore;

var stageWidth
var stageHeight

var t

var cover

var lib

var b;

//////////////////////////////
//// utils //////////////////
////////////////////////////

function initBase(comp){

	bgColor = typeof bgColor !== 'undefined' ? bgColor : "#fff";
	

	lib=comp.getLibrary();

	stageWidth = canvas.width/window.devicePixelRatio
	stageHeight = canvas.height/window.devicePixelRatio

	if( $("#border").length ){
		$(border).css("width", stageWidth-2);
		$(border).css("height", stageHeight-2);
	}

	addBanner()
}

function addBanner() {

	t = new Timer()
	
	var animCounter = 0

	if(b) {
		firstPlay = false
		exportRoot.removeChild(b);
		TweenMax.killAll()	
	} else {

		// TweenMax.delayedCall(.5, initSmallPrint)
		firstPlay = true
	}

	if(firstPlay){
		// var graphics = new createjs.Graphics()
	 	cover = new createjs.Shape();
		exportRoot.addChild(cover)
	}
	
	b = new lib.Banner();

	b.alpha = 0
	exportRoot.addChildAt(b, exportRoot.getChildIndex(cover))

	cover.graphics.beginFill(bgColor).drawRect(0, 0, stageWidth, stageHeight);

	function animFrame(){

		if(b.numChildren !=0){
			b.alpha = 1
			TweenMax.to(cover, .5, {alpha: 0, ease: Linear.easeNone})

			
			initBanner()
		} else {
			window.requestAnimationFrame(animFrame)
		}
	}

	animFrame()
	// initBanner()	
}

function setAllriginals(_mc, parameters, traceNames){
	traceNames = typeof traceNames !== 'undefined' ? traceNames : false;

	var names = []
	for(var i=0; i<_mc.numChildren; i++) {
		var tmpItm = _mc.getChildAt(i)
		
		for(var a in _mc){
			if(_mc[a]==tmpItm) {
				tmpItm.name = a
				names.push(a)
			}
		}

		if(typeof tmpItm.ox == "undefined") {
			tmpItm.ox = tmpItm.x
			tmpItm.oy = tmpItm.y
			tmpItm.oscaleX = tmpItm.scaleX
			tmpItm.oscaleY = tmpItm.scaleY
			tmpItm.orotation = tmpItm.rotation
			
			if(tmpItm.getBounds()){
				tmpItm.owidth = tmpItm.getBounds().width
				tmpItm.oheight = tmpItm.getBounds().height
			}

			if(parameters){
				for(var a in parameters) {
					tmpItm[a] = parameters[a]
				}
			}
		}
	}

	if(traceNames){
		var traceTxt = ""
		for(var a in names){
			traceTxt += names[a]+"\n"
		}
		console.log(traceTxt)
	}
}

function resetAllriginals(_mc, parameters){

	for(var i=0; i<_mc.numChildren; i++) {
		var tmpItm = _mc.getChildAt(i)
			tmpItm.x = tmpItm.ox
			tmpItm.y = tmpItm.oy
			tmpItm.scaleX = tmpItm.oscaleX
			tmpItm.scaleY = tmpItm.oscaleY
			tmpItm.rotation = tmpItm.orotation
			if(parameters){
				for(var a in parameters) {
					tmpItm[a] = parameters[a]
				}
			}
	}
}

function resetOriginals(_mc, parameters){
	_mc.x = _mc.ox
	_mc.y = _mc.oy
	_mc.scaleX = _mc.oscaleX
	_mc.scaleY = _mc.oscaleY
	_mc.rotation = _mc.orotation

	if(parameters){
		for(var a in parameters) {
			_mc[a] = parameters[a]
		}
	}
}

function resetBanner(){
	TweenMax.to(cover, .5, {alpha: 1, ease: Linear.easeNone})
	TweenMax.delayedCall(1, addBanner)
}

function Timer(init, precision) {
  var start = new Date()

  this.elapsed = function() { 
  	return new Date() - start; 
  };
}