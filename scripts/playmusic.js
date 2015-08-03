var piano = new Wad({
    source : 'square', 
    env : {
        attack : .01, 
        decay : .005, 
        sustain : .2, 
        hold : .015, 
        release : .3
    }, 
    filter : {
        type : 'lowpass', 
        frequency : 1200, 
        q : 8.5, 
        env : {
            attack : .2, 
            frequency : 600
        }
    }
})

var octave = 4;

var whiteKeyGen = function(){
	var keys = 'cdefgabc';
	for(var i = 0; i < 14; i++){
		var old = document.getElementById("white").innerHTML;
		if(i > 6){
			var id = keys.charAt(i - 6).toString();
		} else {
			var id = keys.charAt(i).toString();
		}
		var funcName = id + 'Key()';
		var x = (i * 100).toString();
		var svgTemp = '<rect id="' + id + '" class="whiteKey" width="100" height="480"' +
						'stroke-width="3" fill="#fff" y="0" x="' + x + '" stroke="rgb(0,0,0)"/>';
		document.getElementById("white").innerHTML = old + svgTemp;
	}
}

$(".whiteKey").click(function(e) {
		piano.play({ pitch: $(this).attr('id').toUpperCase() + 'b' + octave.toString()});
});

var blackKeyDict = [87, 69, 82, 84, 89]
var whiteKeyDict = [65, 83, 68, 70, 71, 72, 74];
var charDict = ["c", "d", "e", "f", "g", "a", "b"];
var flatDict = ["d", "e", "g", "a", "b"];


window.onload = function(){
	whiteKeyGen();
	
	$(document).on('keydown', function(e){
		var code = e.keyCode ? e.keyCode : e.which;
		if(whiteKeyDict.indexOf(code) != -1){
			index = whiteKeyDict.indexOf(code);
			keyL = charDict[index];
			currId = '#' + keyL;
			try {
				$(currId).css("fill", "#BDBDBD");
				piano.play({ pitch: keyL.toUpperCase() + octave});
			} catch (err){
				alert("Octave out of range!");
				reset(currId);
			}
		} else if(blackKeyDict.indexOf(code) != -1){
			index = blackKeyDict.indexOf(code);
			keyL = flatDict[index];
			currId = '#' + keyL + 'b';
			try {
				$(currId).css("fill", "#BDBDBD");
				piano.play({ pitch: keyL.toUpperCase() + 'b' + octave});
			} catch (err){
				alert("Octave out of range!");
				reset(currId);
			}
		}
	});
	var reset = function(arg){ 
		$(arg).css("fill", "#FFF");
	}
	$(document).on('keyup', function(e){
		var code = e.keyCode ? e.keyCode : e.which;
		if(whiteKeyDict.indexOf(code) != -1){
			index = whiteKeyDict.indexOf(code);
			keyL = charDict[index];
			currId = '#' + keyL;
			reset(currId);
		}
	});
}

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 188){
		octave--;
	} else if (code == 190){
		octave++;
	}
}