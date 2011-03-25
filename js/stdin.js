		var step = padWidth;
		var padLeft = (width-padWidth)/2;
		pad.style.left = window.getComputedStyle(pad, null).getPropertyValue("left");

		var kbd = new Keyboard();
		var ms = new Mouse();
function movePad(keyName){
    if (keyName === 'arrowRight') {
        if (padLeft < width) {
            ((width - padLeft) < step) ? step = width - padLeft : step = padWidth;
            padLeft += step;
        }
        else 
            if (padLeft > width) {
                padLeft = width;
            }
    }
    else 
        if (keyName === 'arrowLeft') {
            if (padLeft > 0) {
                (padLeft < step) ? step = padLeft : step = padWidth;
                padLeft -= step;
            }
            else 
                if (padLeft < 0) {
                    padLeft = 0;
                }
        }
    pad.style.left = padLeft + 'px';
}
document.onkeydown = function(event){
    movePad(kbd.key[event.which]);
}
document.onmousemove = function(event){
    e = event;
    if (ms.x(e) >= 0) 
        pad.style.left = ms.x(e) + 'px';
    padLeft = ms.x(e) + 'px';
    //document.getElementById("info").innerHTML = padLeft + " "+ pad.style.left + " " + ms.x(e);
}

