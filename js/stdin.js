var step = padWidth;
var padLeft = (  width - padWidth  ) / 2;
pad.style.left = window.getComputedStyle(  pad, null  ).getPropertyValue(  "left"  );

function movePad(  ){
    if ( kbd.isPressed( 'right' ) ) {
        if ( padLeft < width ) {
            ( ( width - padLeft ) < step ) ? step = width - padLeft : step = padWidth;
            padLeft += step;
			pad.style.left = padLeft + 'px';
        }
        else 
            if ( padLeft > width ) {
                padLeft = width;
				pad.style.left = padLeft + 'px';
            }
    }
    else 
        if ( kbd.isPressed( 'left' ) ) {
	        if ( padLeft > 0 ) {
	            ( padLeft < step ) ? step = padLeft : step = padWidth;
	            padLeft -= step;
				pad.style.left = padLeft + 'px';
	        }
	        else 
	            if ( padLeft < 0 ) {
	                padLeft = 0;
					pad.style.left = padLeft + 'px';
	            }
        }
}