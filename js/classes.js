/**
 * Ugly global variable (IE style) to make Keyboard.isPressed() work with only one argument.
 * Other possible explanation of this is that I am a junkie.
 */
var e;

function Keyboard(){
    this.key = {
        37: 'arrowLeft',
        39: 'arrowRight'
    }
    /*
     this.lastKey = function(){
     return e.which
     }
     */
    this.isPressed = function(keyName){
        return (e.type === 'keydown' && e.which === keyName) ? true : false;
    }
}
