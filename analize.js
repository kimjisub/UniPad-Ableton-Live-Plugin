inlets = 1;
setinletassist(0,"midiin");
/*setinletassist(0,"Note-on and Note-off (list: Pitch, Velocity)");
setinletassist(1,"Poly Key Pressure (list: KEY, Value)");
setinletassist(2,"Control Change (list: Controller Number, Value)");
setinletassist(3,"Program Change");
setinletassist(4,"Aftertouch");
setinletassist(5,"Pitch Bend (0-127)");
setinletassist(6,"MIDI Channel");*/

outlets = 3;
setoutletassist(0,"onPadTouch");
setoutletassist(1,"onFunctionkeyTouch");
setoutletassist(2,"onChainTouch");

function msg_int(v) {
	;
	outlet(0, "f"+ midiparse(v))
}