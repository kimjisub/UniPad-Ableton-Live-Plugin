// inlets
inlets = 5
setinletassist(0, "Pathname for unzipped UniPack")
setinletassist(1, "Typecode for Pathname")
setinletassist(2, "onPadTouch")
setinletassist(3, "onChainTouch")
setinletassist(4, "launchpad")

// outlets
outlets = 4
setoutletassist(0, "UniPack analize result")
setoutletassist(1, "Note-on and Note-off")
setoutletassist(2, "Control Change")
setoutletassist(3, "Channel")

// waiting params
var folderDone = 0
var folderURL
var folderType

// vars
UniPack = null

function anything() {
	var a = arrayfromargs(messagename, arguments)

	switch (inlet) {
		case 0:
			folderURL = a
			folderDone += 1
			break;
		case 1:
			folderType = a
			folderDone += 1
			break;
	}

	if (folderDone >= 2) {
		folderDone = 0
		if (folderType == 'fold')
			loadUniPack(folderURL)

	}
}

function list(note, velo) {
	outlet(0, "list")
	switch (inlet) {
		case 0:
			onNote(note, velo)
			break;
		case 1:
			onControl(note, velo)
			break;

	}
}

function UniPackLED(syntaxs, loop, num) {
	this.syntaxs = syntaxs
	this.loop = loop
	this.num = num
}

function UniPackLEDSyntaxOn(x, y, color, velo) {
	this.func = 0
	this.x = x
	this.y = y
	this.color = color
	this.velo = velo
}

function UniPackLEDSyntaxOff(x, y) {
	this.func = 1
	this.x = x
	this.y = y
}

function UniPackLEDSyntaxDelay(d) {
	this.func = 2
	this.delay = d
}


function loadUniPack(path) {
	var keyLED = new Folder(path + "keyLED");
	keyLED.reset();
	while (!keyLED.end) {
		var foldername;
		if (keyLED.pathname.charAt(keyLED.pathname.length - 1) != "/")
			foldername = keyLED.pathname + "/" + keyLED.filename;
		else
			foldername = keyLED.pathname + keyLED.filename
		
		outlet(0, foldername)
		keyLED.next();
	}
	keyLED.close();
}
