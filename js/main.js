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
		document.addEventListener('keypress', function(event){
			if (!App.running && (kbd.isPressed('enter') || kbd.isPressed('space'))) App.restart();
		}, false);
		/*function test(){
			teststack = new Stack();
			teststack.add({x: 55, y: 150, position: 'horizontal', r: 6});
			teststack.add({x: 5, y: 15, position: 'horizontal', r: 3});
			teststack.add({x: 44, y: 444, position: 'horizontal', r:4});
			teststack.add({x: 55, y: 150, position: 'horizontal', r:7});
			//for (i = 0; i < teststack.items.length; i++) 
				//App.say(teststack.min(i).r + ': ' + teststack.min(i).x + ', ' + teststack.min(i).y);
			App.say("==========");
			App.say(teststack.min(0).r);
			App.say(teststack.min(1).r);
			App.say(teststack.min(2).r);
			App.say(teststack.min(3).r);
			
		}
		test();
		*/
		//App.say(getSpeedProjections(30, 0));
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
			App.start();
			$('ball').setStyle('transition-duration', '.2s');
			$('ball').setStyle('-o-transition-duration', '.2s');
			$('ball').setStyle('-moz-transition-duration', '.2s');
			$('ball').setStyle('-webkit-transition-duration', '.2s');
		}, 1000);
		
	},
	gameOver: function(){
		App.running = false;
		App.state.lives = 5;
		App.state.points = 0;
		display.message("You've lost.<br>Click or press Enter to play again.", false);
	}
};
