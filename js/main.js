App = {
	debugMode : true,
	cycleDuration: 200, //in miliseconds
	running: true,
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
		if (!App.debugMode) display.countdown();

		points = document.getElementById("points");
		lives = document.getElementById("lives");
		
		document.addEventListener( 'keydown', function(event){
			ms.shift = 0;
            kbd.setPressed(kbd.key[event.which]);
		},false);
		
		document.addEventListener( 'keyup', function(event){
			ms.shift = 0;
			kbd.setReleased(kbd.key[event.which]);
		},false);
		
		document.addEventListener( 'mousemove', function(event){
			ms.x = ms.convertX(event);
			ms.setShift();
		},false);
		document.addEventListener('click', function(){
			if (!App.running) App.restart();
		},false);
		
	},

	// main game cycle
	update : function()
	{
		pad.move();
		points.innerHTML = App.state.points;
		lives.innerHTML = App.state.lives;
		physics.step();
	},
	state: {
		points: 0,
		lives: 5,
	},
	reset : function(){
		ball.set( field.width/2 - ball.width/2,  field.height-ball.height-pad.height);
		ball.speed.y = -Math.abs(ball.speed.y);
		ball.speed.x = Math.abs(ball.speed.x);
		pad.set( field.width/2 - pad.width/2 );
	},
	start : function(){
		display.clear();
		App.running = true;
	},
	stop : function(){
		App.running = false;
		if (App.state.lives != 0) {
			display.message(' ', false);
			setTimeout(App.restart, 1000);
		}
	},
	restart : function(){
		App.reset();
		App.update();
		App.start();
	},
	gameOver: function(){
		App.running = false;
		App.state.lives = 5;
		App.state.points = 0;
		display.message("You've lost. Click to play again.", false);
	}
};
