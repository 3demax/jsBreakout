
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
		if ( x > field.width ) x = field.width;
		this.x = x;
		return x; 
	}
	this.setShift = function(){
		this.shift = this.x - pad.left;
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
	//this.speed = 600;
	this.speed = { maximum: 300, x: 0}
	this.x = 0;
	var racket = document.getElementById("racket");
	this.width = parseFloat(window.getComputedStyle(racket, null).getPropertyValue("width"));
	this.path = field.width - this.width;
	var step = this.speed.maximum * App.cycleDuration / 1000;
	var move = step;
	this.left = ( this.path - this.width ) / 2;
	racket.style.left = window.getComputedStyle( racket, null ).getPropertyValue( "left" );

	this.move = function(){
 		if ( kbd.isPressed( 'right' ) || ms.shift > 0 && !kbd.isPressed('left')) {
	        if ( this.left < this.path ) {
	            ( ( this.path - this.left ) < step ) ? move = this.path - this.left : move = step;
				
				if (Math.abs(ms.shift) < move && ms.shift > 0)
					move = Math.abs(ms.shift);
				
	            this.left += move;
				ms.setShift();
	        }
	    } else if ( kbd.isPressed( 'left' ) || ms.shift < 0) {
	        if ( this.left > 0 ) {
	            ( this.left < step ) ? move = this.left : move = step;
				
				if (Math.abs(ms.shift) < move && ms.shift < 0)
					move = Math.abs(ms.shift);

	            this.left -= move;
				ms.setShift();
	        }
        }
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
function Display(){
	this.countdown = function(){
		var shots = ["3", "2", "1", "GO", ""];
		var counter = document.getElementById("counter");
		counter.style.display = "block";
		var i = 0;
		function post(){
			setTimeout(function(){
				if (i < shots.length) {
					counter.innerHTML = shots[i];
					i++;
					post();
				}
			}, 1000);
		}
		post();
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
