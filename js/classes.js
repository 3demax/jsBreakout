
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
	this.convertX = function( event ){
		var x = event.clientX - ( document.body.clientWidth - field.width ) / 2;
		if ( x < 0 ) x = 0;
		if ( x > pad.path ) x = pad.path;
		this.x = x;
		return x; 
	}
	this.setX = function (pos){
		this.x = pos;
	}
}

function Field(){
	var field = document.getElementById("field");
	this.width = parseFloat(window.getComputedStyle(field, null).getPropertyValue("width"));
	this.height = parseFloat(window.getComputedStyle(field, null).getPropertyValue("height"));
	this.left = parseFloat(window.getComputedStyle(field, null).getPropertyValue("left"));
	this.fill = function(){
		bricks={}
		for ( id = 0; id < 10; id++ ) bricks[id] = new Brick(id, "p7");
		for ( id = 10; id < 20; id++ ) bricks[id] = new Brick(id, "p5");
		for ( id = 20; id < 30; id++ ) bricks[id] = new Brick(id, "p3");
	}
}

function Pad(){
	this.speed = { maximum: 20, x: 0}
	this.x = 0;
	var racket = document.getElementById("racket");
	this.width = parseFloat(window.getComputedStyle(racket, null).getPropertyValue("width"));
	this.path = field.width - this.width;
	var step = this.width;
	this.left = ( this.path - this.width ) / 2;
	racket.style.left = window.getComputedStyle( racket, null ).getPropertyValue( "left" );

	this.move = function(x){
//	    if ( kbd.isPressed( 'right' ) ) {
//	        if ( this.left < this.path ) {
//	            ( ( this.path - this.left ) < step ) ? step = this.path - this.left : step = this.width;
//	            this.left += step;
//	        } else if ( this.left > this.path ) {
//	            this.left = this.path;
//	        }
//	    } else if ( kbd.isPressed( 'left' ) ) {
//	        if ( this.left > 0 ) {
//	            ( this.left < step ) ? step = this.left : step = this.width;
//	            this.left -= step;
//	        }
//	        else if ( this.left < 0 ) {
//                this.left = 0;
//            }
//        }
		racket.style.left = this.left + 'px';
		
	}
}

function Brick(id, type){
	var layer = document.getElementById("bricks-layer");
    var brickCell = document.createElement("div");
    brickCell.className = "brick " + type;
	brickCell.id = id;
	this.id=id;
    var brick = document.createElement("p");
    brickCell.appendChild(brick);
    layer.appendChild(brickCell);
	this.hit = function(){
		document.getElementById(this.id).innerHTML = "";
		document.getElementById(this.id).id="";
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
		bricks[this.parentNode.id].hit();
	}
}

function Ball()
{
	this.x = 50; this.y = 50;
	this.speed = {x : 10, y : 30};
	this.element = document.getElementById("ball");
	var element = this.element;
	this.left = parseFloat(window.getComputedStyle(element, null).getPropertyValue("left"));
	this.top = parseFloat(window.getComputedStyle(element, null).getPropertyValue("top"));
	this.width = parseFloat(window.getComputedStyle(element, null).getPropertyValue("width"));
	this.height = parseFloat(window.getComputedStyle(element, null).getPropertyValue("height"));


}
