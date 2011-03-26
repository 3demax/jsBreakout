var field = document.getElementById("field");
var pad = document.getElementById("racket");
var layer = document.getElementById("bricks-layer");
var fieldWidth = parseFloat(window.getComputedStyle(field, null).getPropertyValue("width"));
var padWidth = parseFloat(window.getComputedStyle(pad, null).getPropertyValue("width"));
var width = fieldWidth - padWidth;

function Keyboard(){
    this.key = {
        37: 'left',
        39: 'right'
    }
	this.pressed = {
		'left': false,
		'right': false
	}
    this.isPressed = function(keyName){
		return this.pressed[keyName];
    }
	this.setPressed = function(keyName){
		this.pressed[keyName] = true;
	}
	this.setReleased = function(keyName){
		this.pressed[keyName] = false;
	}
}

function Mouse(){
	this.x = function( event ){
		var x = event.clientX - ( document.body.clientWidth - fieldWidth ) / 2;
		if ( x < 0 ) x = 0;
		if ( x > width ) x = width;
		return x; 
	}
}

function Brick(name){
    var brickCell = document.createElement("div");
    brickCell.className = "brick";
	brickCell.id = name;
	this.id=name;
    var brick = document.createElement("p");
    brickCell.appendChild(brick);
    layer.appendChild(brickCell);
	brick.hit = function(){
		brickCell.innerHTML = "";
		brickCell.id="";
		App.state.points +=1;
	}
	brick.onclick = function(){
		brick.hit();
	}
}
