
function Keyboard(){
    this.key = {
        37: 'left',
        39: 'right',
		32: 'space',
		13: 'enter'
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
	this.speed = { maximum: 300, x: 0}
	this.x = 0;
	var racket = document.getElementById("racket");
	this.width = parseFloat(window.getComputedStyle(racket, null).getPropertyValue("width"));
	this.height = parseFloat(window.getComputedStyle(racket, null).getPropertyValue("height"));
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
				
				this.speed.x = move / App.cycleDuration;
	            this.left += move;
				ms.setShift();
	        }
	    } else if ( kbd.isPressed( 'left' ) || ms.shift < 0) {
	        if ( this.left > 0 ) {
	            ( this.left < step ) ? move = this.left : move = step;
				
				if (Math.abs(ms.shift) < move && ms.shift < 0)
					move = Math.abs(ms.shift);

				this.speed.x = move / App.cycleDuration;
	            this.left -= move;
				ms.setShift();
	        }
        }
		this.set(this.left);
	}
	this.speed.x = move;
	this.set = function(x){ 
		racket.style.left = x + 'px'
	}
}

function Brick(id, type){
	var layer = document.getElementById("bricks-layer");
    var brickCell = document.createElement("div");
    brickCell.className = "brick " + type;
	brickCell.id = id;
	this.id = id;
	this.width = brickCell.offsetWidth;
    var brick = document.createElement("p");
    brickCell.appendChild(brick);
    layer.appendChild(brickCell);
	this.contains = function(x, y){
		return (x > brickCell.offsetLeft &&
		 (x < brickCell.offsetLeft + brickCell.offsetWidth) &&
		  y > brickCell.offsetTop && 
		  (y < brickCell.offsetTop + brickCell.offsetHeight));
	}
	this.hit = function(){
		if (document.getElementById(this.id)) {
			document.getElementById(this.id).innerHTML = "";
			document.getElementById(this.id).id = "";
			switch (type) {
				case "p3":
					App.state.points += 3
					break
				case "p5":
					App.state.points += 5
					break
				case "p7":
					App.state.points += 7
					break
			}
			return true;
		} else return false;
	}
	brick.onclick = function(){
		bricks[this.parentNode.id].hit();
	}
}
function Display(){
	this.countdown = function(){
		var shots = ["3", "2", "1", "GO", ""];
		var counter = document.getElementById("message");
		App.stop();
		counter.style.display = "table-cell";
		var i = 0;
		function post(){
			setTimeout(function(){
				if (i < shots.length) {
					counter.innerHTML = shots[i];
					i++;
					post();
				} else{
					App.start();
				}
			}, 1000);
		}
		post();
	}
	this.message = function(msg, clsbtn){
		var messageBox = document.getElementById("message");
		var closeButton = '\n<button onclick=\"javascript:this.parentNode.style.display = \'none\'\">Close</button>';
		if(clsbtn) msg += closeButton;
		messageBox.innerHTML = msg;
		App.stop();
		messageBox.style.display = 'table-cell';
	}
	this.clear = function(){
		document.getElementById("message").style.display = 'none';
	}
}
function Ball()
{
	this.speed = {x : 25, y :30};
	this.element = document.getElementById("ball");
	var element = this.element;
	this.left = parseFloat(window.getComputedStyle(element, null).getPropertyValue("left"));
	this.top = parseFloat(window.getComputedStyle(element, null).getPropertyValue("top"));
	this.width = parseFloat(window.getComputedStyle(element, null).getPropertyValue("width"));
	this.height = parseFloat(window.getComputedStyle(element, null).getPropertyValue("height"));
	this.x = this.left; this.y = this.top;
	this.px = this.x; this.py = this.y
	this.set = function(x,y){
		ball.x = x;
		ball.y = y;
		ball.element.style.left = x + 'px';
		ball.element.style.top = y + 'px';
	}

}

function Stack(){
	this.items = [
			/*
			 * test values 
			{x: 30, y: 50, position: 'horizontal', r: 90},
			{x: 10, y: 60, position: 'horizontal', r: 35},
			{x: 20, y: 20, position: 'vertical',   r: 43},
			{x: 33, y: 10, position: 'vertical',   r: 48},
			{x: 50, y: 10, position: 'horizontal', r: 13},
			{x: 15, y: 40, position: 'horizontal', r: 54},
			*/
		];
	this.add = function(item){
		this.items.push(item);
	}
	this.min = function(index){
		for (k = this.items.length - 1; k > 0; k--) {
			for (j = 0; j < k; j++) {
				if (this.items[j].r > this.items[j + 1].r) {
					m = this.items[j];
					this.items[j] = this.items[j + 1];
					this.items[j + 1] = m;
				}
			}
		}	
		return this.items[index];
	}
	
}
