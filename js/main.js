App = {
	debugMode : 0,
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
		display = document.getElementById("display");
		
		field.fill();
		if (App.debugMode === 0) App.countdown();

		kbd = new Keyboard();
		ms = new Mouse();
		App.requestName();
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
	},
	state: {
		level: 1,
		points: 0,
		lives: 5,
		record: function(name){
			if (!name) {
				display.innerHTML = '<form><input id="name" placeholder="Enter your name"></form>';
			}
				var record = {"time":new Date(), "name": name, "points": App.state.points, "lives": App.state.lives};
				window.localStorage.setItem(name, record);
		},
		
	},
	countdown: function(){
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
	},
	requestName: function(){
	}
};
