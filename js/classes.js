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

function Brick(id, type){
    var brickCell = document.createElement("div");
    brickCell.className = "brick " + type;
	brickCell.id = id;
	this.id=id;
    var brick = document.createElement("p");
    brickCell.appendChild(brick);
    layer.appendChild(brickCell);
	brick.hit = function(){
		brickCell.innerHTML = "";
		brickCell.id="";
		switch (type){
			case "p3": App.state.points +=3
			break 
			case "p5": App.state.points +=5
			break
			case "p7": App.state.points +=7
			break
		}
	}
	brick.onclick = function(){
		brick.hit();
	}
}
