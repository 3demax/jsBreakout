
function solve(x1, y1, x2, y2, bx, by, dx, dy)
{
	A1 = y1 - y2; B1 = x2 - x1; C1 = x1*y2 - x2*y1;
	A2 = by - dy; B2 = dx - bx; C2 = bx*dy - dx*by;
	det = A1*B2 - A2*B1;
	det1 = -C1*B2 + B1*C2;
	det2 = -C2*A1 + A2*C1;
	//hey, those lines shouldn't be parallel there!
	x = det1/det;
	y = det2/det;
	return [x,y]
}

function intersects(x1, y1, x2, y2, bx, by, dx, dy)
{
	ans = solve(x1, y1, x2, y2, bx, by, dx, dy)
	if  (	( (ans[0] >= x1) && (ans[0] <= x2) ) 
			&&
			( (ans[1] >= y1) && (ans[1] <= y2) ) 
		){
		return true
	}else{
		return false
	}
}

function sgn(a)
{
	a>0 ? a=1 : ( a<0 ? a=-1 : a=0 );
	return a;
}
function mirror(x1, y1, x2, y2, xx, xy, dx, dy)
{
	var ddx = dx - 2*(dx - xx)*sgn(y2 - y1)
	var ddy = dy - 2*(dy - xy)*sgn(x2 - x1)
	return [ddx, ddy]
}

function solveball(l1, l2, bx, by, dx, dy)
{
	ans = solveballcoord(l1[0], l1[1], l2[0], l2[1], bx, by, dx, dy)
	return ans
}

function solveballcoord(x1, y1, x2, y2, bx, by, dx, dy)
{
	var x = solve(x1, y1, x2, y2, bx, by, dx, dy);
	if ( ((x[0] < x1) && (x[0] > x2)) || ((x[1] < y1) && (x[1] > y2)) )
	{
		return [x[0], x[1], dx, dy]
	}
	var dd = mirror(x1, y1, x2, y2, x[0], x[1], dx, dy);
	return [x[0], x[1], dd[0], dd[1]]
}

physics = {
	step: function()
	{
		//Reflection from walls
		
		ball.px = ball.x + ball.speed.x;
		ball.py = ball.y + ball.speed.y;
//		App.say("==== start ==== \n" + "bx=" + ball.x + " by=" + ball.y)
		ball.ppx = ball.px
		ball.ppy = ball.py
		if ( (ball.py <= 0) && (ball.speed.y < 0) ){
			App.say("py < 0");
			ball.ppy = 0
			ball.speed.y = -ball.speed.y
		}
		
		if ( (ball.px < 0) && (ball.speed.x < 0) ){
			App.say("px < 0");
			ball.ppx = 0
			ball.speed.x = -ball.speed.x
		}

		if ( (ball.px > field.width-ball.width) && (ball.speed.x > 0) ) {
			App.say("px > width");
			ball.ppx = field.width-ball.width
			ball.speed.x = -ball.speed.x
		}

		if ( (ball.py > field.height-ball.height-pad.height) && (ball.speed.y > 0) ) {
			App.say("py > height");
			
			this.reflect()
		}

		ball.x = ball.ppx
		ball.y = ball.ppy
		ball.element.style.left = ball.x + 'px';
		ball.element.style.top = ball.y + 'px';
//		App.say("px=" + ball.px + " py=" + ball.py + "\n ==== end ====");
	},

	reflect : function () {
		//Reflection from pad
			
		var h = field.height-ball.height-pad.height;
		//we predict that pad will be here
		var padxx = Math.round( parseFloat(pad.left) + pad.speed.x*(h-ball.y)/(ball.py-ball.y) );
		var bw = ball.x + ball.width;
		App.say("pad.x=" + pad.left + "\npad.speed=" + pad.speed.x);
		App.say("padxx=" + padxx + "\nball.x=" + ball.x);
		if  (	( (ball.x > padxx) && (ball.x < padxx + pad.width) ) 
				||
				( (bw > padxx) && (bw < padxx + pad.width) ) 
			)	
		{
			ball.ppy = h+5
			ball.speed.y = -ball.speed.y
		}		
		else
		{
			App.say("You loose.")
			App.state.lives --;
			lives.innerHTML = App.state.lives;
			App.stop();
		}
	}
}



