App = {
	debugMode : 1,
	cycleDuration: 200, //in miliseconds
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
		if (App.debugMode === 0) display.countdown();

		level = document.getElementById("level");
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
	},

	// main game cycle
	update : function()
	{
		pad.move();
		level.innerHTML = App.state.level;
		points.innerHTML = App.state.points;
		lives.innerHTML = App.state.lives;
		//ball.move();
	},
	state: {
		level: 1,
		points: 0,
		lives: 5,
	}
};
