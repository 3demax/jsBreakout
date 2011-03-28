
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
		px = ball.x + ball.speed.x;
		py = ball.y + ball.speed.y;
		App.say("==== start ==== \n" + "bx=" + ball.x + " by=" + ball.y)
		ppy = py
		ppx = px
	//	if(py < field.dots[0][1]) {
		if ( (py <= 0) && (ball.speed.y < 0) ){
			App.say("py < 0");
	//		ans = solveball(field.dots[0], field.dots[1], ball.x, ball.y, px, py)
	//		px = ans[2]
	//		py = ans[3]
			ppy = 0
			ball.speed.y = -ball.speed.y
		}
	//	if(py > field.dots[2][1]) {
		if ( (py > field.height-ball.height) && (ball.speed.y > 0) ) {
			App.say("py > height");
	//		ans = solveball(field.dots[2], field.dots[3], ball.x, ball.y, px, py)
	//		px = ans[2]
	//		py = ans[3]
			ppy = field.height-ball.height
			ball.speed.y = -ball.speed.y
		}
	//	if(px < field.dots[0][0]) {
		if ( (px < 0) && (ball.speed.x < 0) ){
			App.say("px < 0");
	//		ans = solveball(field.dots[3], field.dots[0], ball.x, ball.y, px, py)
	//		px = ans[2]
	//		py = ans[3]
			ppx = 0
			ball.speed.x = -ball.speed.x
		}
	//	if(px > field.dots[2][0]) {
		if ( (px > field.width-ball.width) && (ball.speed.x > 0) ) {
			App.say("px > width");
	//		ans = solveball(field.dots[2], field.dots[1], ball.x, ball.y, px, py)
	//		px = ans[2]
	//		py = ans[3]
			ppx = field.width-ball.width
			ball.speed.x = -ball.speed.x
		}


		ball.x = ppx
		ball.y = ppy
		ball.element.style.left = ball.x + 'px';
		ball.element.style.top = ball.y + 'px';
//		$('ball').setStyle('-moz-transform', 'translate('+ball.x+'px, '+ball.y+'px)');
//		$('ball').setStyle('-webkit-transform', 'translate('+ball.x+'px, '+ball.y+'px)');
	//	ball.element.style.transform = 'translate(' + ball.x + 'px, ' + ball.y + 'px);';
		App.say("px=" + px + " py=" + py + "\n ==== end ====")
	}
}



