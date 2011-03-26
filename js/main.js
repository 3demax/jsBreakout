function fillRow(type){
}
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
		bricks={}
		for ( id = 0; id < 10; id++ ) bricks[id] = new Brick(id, "p7");
		for ( id = 10; id < 20; id++ ) bricks[id] = new Brick(id, "p5");
		for ( id = 20; id < 30; id++ ) bricks[id] = new Brick(id, "p3");
		kbd = new Keyboard();
		ms = new Mouse();
		
		level = document.getElementById("level");
		points = document.getElementById("points");
		lives = document.getElementById("lives");
		
		document.addEventListener( 'keydown', function(event){            
            if (!kbd.isPressed(kbd.key[event.which])) {
                kbd.setPressed(kbd.key[event.which]);
            }
		},false);
		
		document.addEventListener( 'keyup', function(event){
			if (kbd.isPressed(kbd.key[event.which])) {
				kbd.setReleased(kbd.key[event.which]);
			}
		},false);
		
		document.addEventListener( 'mousemove', function(event){
		    var e = event;
		    if (ms.x(e) >= 0) 
		        pad.style.left = ms.x(e) + 'px';
		    padLeft = ms.x(e);
		},false);
	},

	// main game cycle
	update : function()
	{
		movePad();
		points.innerHTML = App.state.points;
		lives.innerHTML = App.state.lives;
	},
	state: {
		level: 1,
		points: 0,
		lives: 5
	}
};