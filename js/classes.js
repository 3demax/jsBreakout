/**
 * Ugly global variable (IE style) to make Keyboard.isPressed() work with only one argument.
 * Other possible explanation of this is that I am a junkie.
 */
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
		var width = parseFloat(document.getElementById("field").style.width);
		document.getElementById('info').innerHTML = width;
		var x = event.clientX - (document.width-600) / 2;
		if (x < 0) x=0;
		if (x>480) x=480;
		return x; 
	}
	this.y = function(event){
		//return this.key['y']
	}
}
Mouse.prototype = new Keyboard();