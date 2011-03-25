App = {
	debugMode : 1,
	cycleDuration: 1000, //in miliseconds
	say : function(info)
	{
		if(this.debugMode) {console.log(info);} ;
	},
	
	// this function is executed at startup
	load : function(bricks)
	{
		var layer = document.getElementById("bricks-layer");
		
		for (i = 0; i < bricks; i++) {
			var brickCell = document.createElement("div");
			brickCell.className = "brick";
			var brick = document.createElement("p");
			brickCell.appendChild(brick);
			layer.appendChild(brickCell);
		}
		this.say("[Program start] " + Date.now());
	},

	// main game cycle
	update : function()
	{
		this.say("[Infinite cycle] ");

	},
};
function shitBricks(){
	
}
