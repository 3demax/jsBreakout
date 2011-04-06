App = {
	debugMode : true,
	cycleDuration: 200, //in miliseconds
	running: true,
	sounds: false,
	say : function(info)
	{
		if(this.debugMode) {console.log(info);} ;
	},
	
	// this function is executed at startup
	load : function()
	{
		kbd = new Keyboard();
		ms = new Mouse();
		
		field = new Field();
		pad = new Pad();
		display = new Display();
		ball = new Ball();
		
		field.fill();
		App.reset();
		App.start();
		if (!App.debugMode) display.countdown();

		points = document.getElementById("points");
		lives = document.getElementById("lives");
		
		App.state.lives = 5;
		App.state.points = 0;
		
		document.addEventListener( 'keydown', function(event){
			ms.shift = 0;
            kbd.setPressed(kbd.key[event.which]);
			document.getElementById("arrow-" + kbd.key[event.which]).className = "pressed";
		},false);
		
		document.addEventListener( 'keyup', function(event){
			ms.shift = 0;
			kbd.setReleased(kbd.key[event.which]);
			document.getElementById("arrow-" + kbd.key[event.which]).className = "";
		},false);
		
		document.addEventListener( 'mousemove', function(event){
			ms.x = ms.convertX(event);
			ms.setShift();
		},false);
		field.source.addEventListener('click', function(){
			if (!App.running && (App.state.lives === 0 || App.state.points === 150)) App.load();
		},false);
		document.addEventListener('keypress', function(event){
			if (
				!App.running && 
				(kbd.isPressed('enter') ||
				kbd.isPressed('space')) &&
				App.state.lives === 0
			) App.load();
		}, false);

		/*For the buttons on the screen*/
		document.getElementById("arrow-left").onmousedown = function(){
			kbd.setPressed('left');
		}
		document.getElementById("arrow-left").onmouseup = function(){
			kbd.setReleased('left');
		}
		document.getElementById("arrow-right").onmousedown = function(){
			kbd.setPressed('right');
		}
		document.getElementById("arrow-right").onmouseup = function(){
			kbd.setReleased('right');
		}
		
		/* test
		App.say(addAngle(ball.speed.x, ball.speed.y, Math.PI / 2));
		*/
	},

	// main game cycle
	update : function()
	{
		points.innerHTML = App.state.points;
		lives.innerHTML = App.state.lives;
		if (App.state.points === 150){
			App.stop();
			points.innerHTML = App.state.points;
			display.message("Congratulations!<br>You've won", false);
			return;
		}
		if (App.state.lives === 0) {
			App.gameOver();
			return;
		}
		pad.move();
		physics.step();
	},
	state: {
		points: 0,
		lives: 5,
	},
	reset : function(){
		ball.set( field.width/2 - ball.width/2,  field.height-ball.height-pad.height);
		pad.set( field.width/2 - pad.width/2 );
		App.say("resetted");
	},
	start : function(){
		display.clear();
		App.running = true;
	},
	stop : function(){
		App.running = false;
	},
	restart : function(){
		$('ball').setStyle('transition-duration', '0');
		$('ball').setStyle('-o-transition-duration', '0');
		$('ball').setStyle('-moz-transition', 'none');
		$('ball').setStyle('-webkit-transition-duration', '0');
		App.reset();
		setTimeout(function(){
			App.update();
			$('ball').setStyle('transition-duration', '.2s');
			$('ball').setStyle('-o-transition-duration', '.2s');
			$('ball').setStyle('-moz-transition', 'all .24s linear');
			$('ball').setStyle('-webkit-transition-duration', '.2s');
			App.start();
		}, 1000);
		
	},
	gameOver: function(){
		App.stop();
		display.message("You've lost.<br>Click or press Enter to play again.", false);
	}
};
