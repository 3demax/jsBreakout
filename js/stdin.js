var e;

function Keyboard(){
    this.key = {
        37: 'arrowLeft',
        39: 'arrowRight'
    }
	this.pressed = {
		'arrowLeft': false,
		'arrowRight': false
	}
    this.isPressed = function(keyName){
		return this.pressed[keyName];
//        return (event.type === 'keydown' && event.which === keyName) ? true : false;
    }
	this.setPressed = function(keyName){
		this.pressed[keyName] = true;
	}
	this.setReleased = function(keyName){
		this.pressed[keyName] = false;
	}
}
/*document.addEventListener('keydown', function(event){
	kbd.setPressed(kbd.key[event.which]);
}, false);
document.addEventListener('keyup', function(event){
	kbd.setReleased(kbd.key[event.which]);
},false);
*/
function Mouse(){
	this.key = {0: 'buttonLeft', 2: 'buttonRight'}
	this.pressed = {'buttonLeft':false,'buttonRight':false}
	this.x = function(event){
		/*var width = document.getElementById("field").style.width;
		document.getElementById('info').innerHTML = width;*/
		var x = event.clientX - (document.body.clientWidth-600) / 2;
		if (x < 0) x=0;
		if (x>480) x=480;
		return x; 
	}
	this.y = function(event){
		//return this.key['y']
	}
}
Mouse.prototype = new Keyboard();







pad = document.getElementById("racket");
var width = 480;
var padWidth = 120;
var step = padWidth;
var padLeft = (width-padWidth)/2;
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
    pad.style.left = padLeft;
}

document.addEventListener('keydown', function(event){
//    kbd.setPressed(kbd.key[event.which]);
    movePad(kbd.key[event.which]);
}, false);
/*document.addEventListener('keyup', function(event){
    kbd.setReleased(kbd.key[event.which]);
}, false);*/
document.onmousemove = function(event){
    e = event;
    if (ms.x(e) >= 0) 
        pad.style.left = ms.x(e);
    padLeft = ms.x(e);
    //document.getElementById("info").innerHTML = padLeft + " "+ pad.style.left + " " + ms.x(e);
}
