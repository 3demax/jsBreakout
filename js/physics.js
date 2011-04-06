
function solve(x1, y1, x2, y2, bx, by, dx, dy)
{
	A1 = y1 - y2; B1 = x2 - x1; C1 = x1*y2 - x2*y1;
	A2 = by - dy; B2 = dx - bx; C2 = bx*dy - dx*by;
	det = A1*B2 - A2*B1;
	det1 = -C1*B2 + B1*C2;
	det2 = -C2*A1 + A2*C1;
	//hey, those lines shouldn't be parallel there!
	x = Math.round(det1/det);
	y = Math.round(det2/det);
	return [x,y]
}

function randomAngle(){
	var min = Math.PI / 4;
	var max = Math.PI / 2.5;
	var rndabs =  Math.random() * (max - min) + min;
	var sign = Math.round(Math.random()-1)*2+1;
	return sign*rndabs
}

function getSpeedProjections(speed, angle){
	var x = Math.round(speed * Math.cos(angle));
	var y = Math.round(speed * Math.sin(angle));
	return [x, y]
}

function addAngle(speedx, speedy, angle){
	return getSpeedProjections(ball.v, Math.atan(speedy / speedx) + angle);
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
		
		ball.ppx = ball.px = ball.x + ball.speed.x;
		ball.ppy = ball.py = ball.y + ball.speed.y;
//		App.say("==== start ==== \n" + "bx=" + ball.x + " by=" + ball.y)
		if ( (ball.py < 66) )//|| (ball.y < 66) )
		{
//			App.say("brickTime");
			var bx = ball.x
			var by = ball.y
			var px = ball.px
			var py = ball.py
//			if (ball.speed.y < 0){
//				if (ball.speed.x > 0)
//				{
//					var bx = ball.x + ball.width;
//					var px = ball.px + ball.width;
//				}
////				bx = ball.x + ball.width/2;
//			} 
//			else {
//				by = ball.y + ball.height;
//				if (ball.speed.x > 0)
//				{
//					var bx = ball.x + ball.width;
//					var px = ball.px + ball.width;
////					var py = ball.y + ball.height;
//				}
//			}
			
			brickTime(bx, by, px, py);			
//			ball.ppx = 0
//			ball.speed.x = -ball.speed.x
		}

		if ( (ball.py <= 0) && (ball.speed.y < 0) ){
			App.say("py < 0");
			ball.ppy = 0
			ball.speed.y = -ball.speed.y
			playSound("wall.wav", App.cycleDuration);
		}
		
		if ( (ball.px < 0) && (ball.speed.x < 0) ){
//			App.say("px < 0");
			ball.ppx = 0
			ball.speed.x = -ball.speed.x
			playSound("wall.wav", App.cycleDuration);
		}

		if ( (ball.px > field.width-ball.width) && (ball.speed.x > 0) ) {
//			App.say("px > width");
			ball.ppx = field.width-ball.width
			ball.speed.x = -ball.speed.x
			playSound("wall.wav", App.cycleDuration);
		}

		if ( (ball.py > field.height-ball.height-pad.height) && (ball.speed.y > 0) ) {
//			App.say("py > height");
			this.reflect();
			
		}

		ball.x = ball.ppx
		ball.y = ball.ppy
//		ball.x = ball.px
//		ball.y = ball.py
		ball.element.style.left = ball.x + 'px';
		ball.element.style.top = ball.y + 'px';
//		App.say("px=" + ball.px + " py=" + ball.py + "\n ==== end ====");
	},

	reflect : function () {
		//Reflection from pad
			
		var h = field.height-ball.height-pad.height;
		//we predict that pad will be here
		var padxx = Math.round(pad.left + pad.speed.x*(h-ball.y)/(ball.py-ball.y) );
		var bw = ball.x + ball.width;
//		App.say("pad.x=" + pad.left + "\npad.speed=" + pad.speed.x);
//		App.say("padxx=" + padxx + "\nball.x=" + ball.x);
		if  (	( (ball.x > padxx) && (ball.x < padxx + pad.width) ) 
				||
				( (bw > padxx) && (bw < padxx + pad.width) ) 
			)	
		{
			ball.ppy = h+5
			var newspeed = addAngle(ball.speed.x, ball.speed.y, -Math.PI / 2);
			ball.speed.x = newspeed[0];
			ball.speed.y = newspeed[1];
			//ball.speed.y = -ball.speed.y;
			App.say(newspeed + ' ' + ball.speed.x + ' ' + ball.speed.y);
			playSound("wall.wav", App.cycleDuration);
		}
		else
		{
//			App.say("You loose.")
			App.state.lives --;
			lives.innerHTML = App.state.lives;
			
			App.stop();
			display.message('&nbsp;', false);
			setTimeout(App.restart, 1000);
		}
	},
	
}

	//All in all, it's just another brick in the wall
	brickTime = function(bx, by, px, py)
	{
//		App.say("args: "+bx+" "+by+" "+px+" "+py)
//		if (ball.speed.y < 0){
//			if (ball.speed.x > 0)
//			{
//				var bx = ball.x + ball.width;
//				var px = ball.px + ball.width;
//			}
////				bx = ball.x + ball.width/2;
//		} else {
//			by = ball.y + ball.height;
//			if (ball.speed.x > 0)
//			{
//				var bx = ball.x + ball.width;
//				var px = ball.px + ball.width;
////					var py = ball.y + ball.height;
//			}
//		}
		this.stack = new Stack()
		for (i = 1; i <= 3; i++)
		{
			lx1 = 0; lx2 = field.width;
			ly1 = ly2 = i*22;
			if (intersects(lx1, ly1, lx2, ly2, bx, by, px, py))
			{
//				App.say("horizontal intersection");
				var ans = solve(lx1, ly1, lx2, ly2, bx, by, px, py);
				var radius = Math.sqrt( Math.pow(ans[0] - bx, 2) + Math.pow(ans[1] - by, 2) );
				this.stack.add({x: ans[0] , y: ans[1], position: 'horizontal', r: radius });
			}
		}
		for (i = 1; i <= 9; i++)
		{
			ly1 = 0; ly2 = 66;
			lx1 = lx2 = i*60;
			if (intersects(lx1, ly1, lx2, ly2, bx, by, px, py))
			{
//				App.say("vertical intersection");
				var ans = solve(lx1, ly1, lx2, ly2, bx, by, px, py);
				var radius = Math.sqrt( Math.pow(ans[0] - bx, 2) + Math.pow(ans[1] - by, 2) );
				this.stack.add({x: ans[0] , y: ans[1], position: 'vertical', r: radius });
			}
		}
		ans = this.stack.min(0);
		if ( typeof(ans) != "undefined" ){
			hitId = Bricks.getId(Math.round(ans.x)+1,Math.round(ans.y)-1);
//			App.say(stack.items);
//			App.say(ans.x + " " + ans.y + " " + ans.r + " hitId " + hitId + " stack.counter=" + stack.counter);
		}
//		App.stop();
//		App.say("hitId="+hitId);
		
		tries = 0;
		while (	
				(tries < stack.counter-1) &&
				(
					( typeof(hitId) == "undefined" ) ||
					(bricks[hitId].hitted)
				)
		   	  )
		{
			App.say(tries + " try");
			tries++;
			ans = stack.min(tries);
			if ( ans.r > Math.sqrt(Math.pow(ball.speed.x,2) + Math.pow(ball.speed.y,2)) )
				break;
			hitId = Bricks.getId(Math.round(ans.x)+1,Math.round(ans.y)-1);
		}
		if ( (!(typeof(hitId)=="undefined")) && (!bricks[hitId].hitted)) 
		{
//			App.say("id=\"" + bricks[hitId].hitted + '\" hitId=' + hitId);
			bricks[hitId].hit();
//			App.say("id=\"" + bricks[hitId].hitted + '\" hitId=' + hitId);
//			App.say("==============");
			if (ans.position == "vertical") 
			{
//				App.say("vertical")
				ball.speed.x = -ball.speed.x;
				ball.ppx = ans.x;
			}
			if (ans.position == "horizontal") 
			{
//				App.say("horizontal")
				ball.speed.y = -ball.speed.y;
				ball.ppy = ans.y;
			}
		}
	}


