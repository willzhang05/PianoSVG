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
var blackKeyDict = [87, 69, 82, 84, 89]
var whiteKeyDict = [65, 83, 68, 70, 71, 72, 74];
var charDict = ["c", "d", "e", "f", "g", "a", "b"];
var flatDict = ["d", "e", "g", "a", "b"];

window.onload = function(){
	whiteKeyGen();
	$(".whiteKey").click(function(e) {
		piano.play({ pitch: $(this).attr('id').toUpperCase()});
	});
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
	/*} else if (code === 87) {
        cs4Key();
    } else if (code === 69) {
        ef4Key();
    } else if (code === 82) {
        fs4Key();
    } else if (code === 84) {
        gs4Key();
    } else if (code === 89) {
        bf4Key();
    }*/
};

//var whiteKeyDict = [["a", 65], ["s", 83], ["d", 68], ["f", 70], ["g", 71], ["h", 72], ["j", 74], ["k", 75], ["l", 76], [";", 186], ["'", 222]];

//var charDict = ["a", "s", "d", "f", "g", "h", "j"];

/*
var cs4Key = function(){
    piano.play({ pitch : 'Db4' });
};

var ef4Key = function(){
    piano.play({ pitch : 'Eb4' });
};

var fs4Key = function(){
    piano.play({ pitch : 'Gb4' });
};

var gs4Key = function(){
    piano.play({ pitch : 'Ab4' });
};

var bf4Key = function(){
    piano.play({ pitch : 'Bb4' });
};

var cs5Key = function(){
    piano.play({ pitch : 'Db5' });
};

var ef5Key = function(){
    piano.play({ pitch : 'Eb5' });
};

var fs5Key = function(){
    piano.play({ pitch : 'Gb5' });
};

var gs5Key = function(){
    piano.play({ pitch : 'Ab5' });
};

var bf5Key = function(){
    piano.play({ pitch : 'Bb5' });
};*/