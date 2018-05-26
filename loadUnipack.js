// inlets
inlets = 4
setinletassist(0,"Pathname for unzipped unipack")
setinletassist(1,"Typecode for Pathname")
setinletassist(2,"onPadTouch")
setinletassist(3,"onChainTouch")

// outlets
outlets = 3
setoutletassist(0,"LED Pitch")
setoutletassist(1,"LED Velocity")
setoutletassist(2,"Channal")

// inlet params
var v = new Array(inlets)
for (var i=0;i<inlets;i++)
	v[i] = 0

// waiting params
var noteSig = 0
var controlSig = 0



var v = new Array()
v[0] = v[1] = 0
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
