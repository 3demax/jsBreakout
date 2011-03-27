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
		field = new Field();
		pad = new Pad();
		ball = new Ball();
		
		field.fill();
		if (App.debugMode === 0) App.countdown();

		kbd = new Keyboard();
		ms = new Mouse();
		
		level = document.getElementById("level");
		points = document.getElementById("points");
		lives = document.getElementById("lives");
		
		document.addEventListener( 'keydown', function(event){            
            kbd.setPressed(kbd.key[event.which]);
		},false);
		
		document.addEventListener( 'keyup', function(event){
			kbd.setReleased(kbd.key[event.which]);
		},false);
		
		document.addEventListener( 'mousemove', function(event){
			//pad.left = ms.x(event);
			ms.setX(ms.convertX(event))
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
		lives: 5
	},
	countdown: function(){
		var display = document.getElementById("display");
		var shots = ["3", "2", "1", "GO", ""];
		var i = 0;
		function post(){
			setTimeout(function(){
				if (i < shots.length) {
					display.innerHTML = "<p>" + shots[i] + "</p>";
					i++;
					post();
				}
			}, 1000);
		}
		post();
	}
};
