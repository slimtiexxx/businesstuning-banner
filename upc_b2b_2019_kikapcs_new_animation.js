var b;

var firstRun = true

function initBanner(){
	var tmpItm, trgtItm

	setAllriginals(b, {alpha:0})

	TweenMax.delayedCall(.5, initSmallPrint, [{fullHeight: false}])
	

	b.bgImg.alpha = 1
	b.whiteEllipse.alpha = 1
	b.whiteBar.alpha = 1
	// b.priceBadge.alpha = 1

	initBadge()

	TweenMax.delayedCall(.5, slide1)

	tmpItm = b.bgImg
	trgtItm = b.bgImgStart
	TweenMax.from(tmpItm, 14, {x: trgtItm.x, y: trgtItm.y, scaleX: trgtItm.scaleX, scaleY: trgtItm.scaleY, ease: Sine.easeOut})

	// showBtn()

	return;
}

function slide1(){
	showTxt(b.nehaTxt)
	TweenMax.delayedCall(.7, showTxt, [b.erdeklodjonTxt])
	// 
	
	TweenMax.delayedCall(.9, showLogo)

	TweenMax.delayedCall(.7, slideEnd)
	


	function slideEnd(){
		// hideTxt(b.nehaTxt)
		TweenMax.delayedCall(.8, slide2)
	}
}

function slide2(){
	// showTxt(b.megbizhatoTxt)
	

	TweenMax.delayedCall(1, showBtn)

	TweenMax.delayedCall(1, slide3)
	
}

function slide3(){
	
	// 

	badgeContainer.style.visibility = "visible";
	TweenMax.from(badgeContainer, 1.7, {rotationY: 90, ease: Elastic.easeOut.config(1, 0.5), delay: .7})

	TweenMax.delayedCall(3, flipBadge)
	TweenMax.delayedCall(6, flipBadge)
}

function showTxt(_txt){
	var tmpItm
	_txt.alpha = 1
	for(var i=0; i<_txt.numChildren; i++) {
		tmpItm = _txt.getChildAt(i)
		TweenMax.from(tmpItm, .4, {alpha: 0, y: tmpItm.y+10, delay: i*.2, ease: Cubic.easeOut})
	}
}

function hideTxt(_txt){
	var tmpItm

	for(var i=0; i<_txt.numChildren; i++) {
		tmpItm = _txt.getChildAt(i)
		TweenMax.to(tmpItm, .4, {alpha: 0, y: tmpItm.y-10, delay: i*.2, ease: Cubic.easeIn})
	}
}

var badgeContainer, badge1, badge2, flipSpd, sideVisible

function initBadge(){
	flipSpd = 1.5
	sideVisible = 1
	badgeContainer = document.getElementById("badgeContainer")
	badge1 = document.getElementById("badge1")
	badge2 = document.getElementById("badge2")
	
	TweenMax.set(badgeContainer, {transformPerspective: 150});

	

}

function flipBadge(){
		
	TweenMax.to(badgeContainer, flipSpd/3, {rotationY: 90, z: 0,  ease: Expo.easeIn, onComplete: changeBadge})
	function changeBadge(){
		TweenMax.set(badgeContainer, {rotationY: -90});
		if(sideVisible == 1){
			sideVisible = 2
			TweenMax.set(badge1, {display: "none"});
			TweenMax.set(badge2, {display: "inline-block"});
		} else {
			sideVisible = 1
			TweenMax.set(badge1, {display: "inline-block"});
			TweenMax.set(badge2, {display: "none"});
		}
		TweenMax.to(badgeContainer, flipSpd/3*2, {rotationY: 0, ease: Elastic.easeOut.config(1, 0.5)})

	}
}

function showLogo(){
	
	b.vodafoneLogo.x = b.upcLogo.x

	b.vodafoneLogo.scaleX = b.vodafoneLogo.scaleY = .8

	b.upcLogo.alpha = 1
	// b.vodafoneLogo.alpha = 1

	tmpItm = b.upcLogo
	TweenMax.from(tmpItm, 1.2, {y: stageHeight+30, ease: Quint.easeInOut})

	tmpItm = b.vodafoneLogo
	TweenMax.set(tmpItm, {alpha: 1, delay: .9})
	TweenMax.to(tmpItm, 1.2, {x: tmpItm.ox, scaleX: tmpItm.oscaleX, scaleY: tmpItm.oscaleY, ease: Quint.easeInOut, delay: .7})

	b.vodafoneCegcsoport.alpha = 1
	b.logoPlus.alpha = 1
	TweenMax.from(b.logoPlus, 1.2, {scaleX: 0, scaleY: 0, ease: Quint.easeInOut, delay: .6})
	TweenMax.from(b.vodafoneCegcsoport, 1.2, {y: stageHeight+50, ease: Quint.easeInOut, delay: .8})
	
	

}

function showBtn(){
	var tmpItm = b.erdekelBtn

	tmpItm.alpha = 1

	TweenMax.from(tmpItm, 1.2, {x: stageWidth+80, ease: Quint.easeInOut})

	tmpItm = tmpItm.btnArrow

	TweenMax.delayedCall(.5, buttonAnim)
}

function buttonAnim(){
	var tmpItm = b.erdekelBtn.btnArrow
	if(t.elapsed() < 29000){
		TweenMax.to(tmpItm, .4, {x: tmpItm.x+5, ease: Sine.easeOut, repeat: 1, yoyo: true, onComplete: buttonAnim})
	}
}

