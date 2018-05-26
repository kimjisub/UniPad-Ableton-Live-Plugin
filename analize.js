// inlets
inlets = 3
setinletassist(0,"Note-on and Note-off")
setinletassist(1,"Control Change")
setinletassist(2,"launchpad")

// outlets
outlets = 3
setoutletassist(0,"onPadTouch")
setoutletassist(1,"onFunctionkeyTouch")
setoutletassist(2,"onChainTouch")

// vars
launchpad = 0


function msg_int(i) {
	switch(inlet){
		case 0:
		case 1:
			break;
		case 2:
			launchpad = i
			break;
	}
}

function list(note, velo){
	switch(inlet){
		case 0:
			onNote(note, velo)
			break;
		case 1:
			onControl(note, velo)
			break;

	}
}

function onNote(note, velo) {
	switch(launchpad){
		case 0:
			outlet(0, 1, 1, 0)
			break;
		case 1:
			outlet(0, 2, 2, 0)
			break;
		case 2:
			var x = 9 - Math.floor(note / 10);
			var y = note % 10;
			
			if (y >= 1 && y <= 8)
				outlet(0, x - 1, y - 1, velo != 0 ? 1 : 0)
			break;
		case 3:
			outlet(0, 3, 3, 0)
			break;
	}
}
function onControl(note, velo) {
	switch(launchpad){
		case 0:
			outlet(1, 1, 0)
			break;
		case 1:
			outlet(1, 2, 0)
			break;
		case 2:
			if (91 <= note && note <= 98) {
				outlet(1, note - 91, velo != 0 ? 1 : 0)
			}
			if (19 <= note && note <= 89 && note % 10 == 9) {
				var c = 9 - Math.floor(note / 10) - 1;
				outlet(2, c, velo != 0 ? 1 : 0)
				outlet(1, c + 8, velo != 0 ? 1 : 0)
			}
			if (1 <= note && note <= 8) {
				outlet(1, 8 - note + 16, velo != 0 ? 1 : 0)
			}
			if (10 <= note && note <= 80 && note % 10 == 0) {
				outlet(1, Math.floor(note / 10) - 1 + 24, velo != 0 ? 1 : 0)
			}
			break;
		case 3:
			outlet(1, 3, 0)
			break;
	}
}
