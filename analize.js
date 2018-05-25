inlets = 4
setinletassist(0,"Note-on and Note-off (Pitch)")
setinletassist(1,"Note-on and Note-off (Velocity)")
setinletassist(2,"Control Change (Controller Number)")
setinletassist(3,"Control Change (Value)")

outlets = 3
setoutletassist(0,"onPadTouch")
setoutletassist(1,"onFunctionkeyTouch")
setoutletassist(2,"onChainTouch")

var v = new Array()
v[0] = v[1] = v[2] = v[3] = 0
var noteSig = 0
var controlSig = 0

function msg_int(i) {
	v[inlet] = i
	switch(inlet){
		case 0:
		case 1:
			noteSig += 1
			break;
		case 2:
		case 3:
			controlSig += 1
			break;
	}

	if(noteSig >= 2)
		onNote()
	if(controlSig >= 2)
		onControl()
}

function onNote() {
	noteSig = 0

	var note = v[0]
	var velo = v[1]

	var x = 9 - Math.floor(note / 10);
	var y = note % 10;
	
	if (y >= 1 && y <= 8)
		outlet(0, (x - 1) + " / " + (y - 1) + " / " + (velo != 0))
}
function onControl() {
	controlSig = 0;

	var note = v[2]
	var velo = v[3]

	if (91 <= note && note <= 98) {
		outlet(1, (note - 91) + " / " + (velo != 0))
	}
	if (19 <= note && note <= 89 && note % 10 == 9) {
		var c = 9 - Math.floor(note / 10) - 1;
		outlet(2, (c) + " / " + (velo != 0))
		outlet(1, (c + 8) + " / " + (velo != 0))
	}
	if (1 <= note && note <= 8) {
		outlet(1, (8 - note + 16) + " / " + (velo != 0))
	}
	if (10 <= note && note <= 80 && note % 10 == 0) {
		outlet(1, (Math.floor(note / 10) - 1 + 24) + " / " + (velo != 0))
	}
}
