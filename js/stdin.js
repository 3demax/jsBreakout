pad = document.getElementById("racket");
var width = 480;
var step = 120;
var padLeft = 0;
var kbd = new Keyboard();
var ms = new Mouse();
function movePad(keyName){
    if (keyName === 'arrowRight') {
        if (padLeft < width) {
            ((width - padLeft) < step) ? step = width - padLeft : step = 120;
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
                (padLeft < step) ? step = padLeft : step = 120;
                padLeft -= step;
            }
            else 
                if (padLeft < 0) {
                    padLeft = 0;
                }
        }
    pad.style.left = padLeft + 'px';
}

document.addEventListener('keydown', function(event){
    kbd.setPressed(kbd.key[event.which]);
    movePad(kbd.key[event.which]);
}, false);
/*document.addEventListener('keyup', function(event){
    kbd.setReleased(kbd.key[event.which]);
}, false);*/
document.onmousemove = function(event){
    e = event;
    if (ms.x(e) >= 0) 
        pad.style.left = ms.x(e) - 0;
    padLeft = ms.x(e);
    //document.getElementById("info").innerHTML = padLeft + " "+ pad.style.left + " " + ms.x(event);
}
