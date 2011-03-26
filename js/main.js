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
		for ( i = 0; i < 20; i++ ) {
			bricks[i] = new Brick(i);
			//layer.removeChild(bricks[i]);
			//document.getElementById("info").innerHTML += bricks[i].id;
		}
		kbd = new Keyboard();
		ms = new Mouse();
		
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
	},
};