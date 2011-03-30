App = {
	debugMode : false,
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
		points.innerHTML = App.state.points;
		lives.innerHTML = App.state.lives;
		if (App.state.points === 30){
			App.stop();
			points.innerHTML = App.state.points;
			display.message("That's all for now.<br>Thank's for playing.", false);
//			App.state.lives = 5;
//			App.state.points = 0;
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
		ball.speed.y = -Math.abs(ball.speed.y);
		ball.speed.x = (Math.round(Math.random())*2-1)*Math.abs(ball.speed.x);
		pad.set( field.width/2 - pad.width/2 );
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
		$('ball').setStyle('-moz-transition-duration', '0');
		$('ball').setStyle('-webkit-transition-duration', '0');
		App.reset();
		App.update();
		setTimeout(function(){
			$('ball').setStyle('transition-duration', '.2s');
			$('ball').setStyle('-o-transition-duration', '.2s');
			$('ball').setStyle('-moz-transition-duration', '.2s');
			$('ball').setStyle('-webkit-transition-duration', '.2s');
			App.start();
		}, 1000);
		
	},
	gameOver: function(){
		App.running = false;
		App.state.lives = 5;
		App.state.points = 0;
		display.message("Click to play again.", false);
	}
};
