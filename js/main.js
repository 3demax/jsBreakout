App = {
	debugMode : 1,
	cycleDuration: 1000, //in miliseconds
	say : function(info)
	{
		if(this.debugMode) {console.log(info);} ;
	},
	
	// this function is executed at startup
	load : function()
	{
		this.say("[Program start] " + Date.now());

	},

	// main game cycle
	update : function()
	{
		this.say("[Infinite cycle] ");

	},
};
