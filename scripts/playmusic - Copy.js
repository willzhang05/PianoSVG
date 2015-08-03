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
			var id = keys.charAt(i - 6).toString() + '5';
		} else {
			var id = keys.charAt(i).toString() + '4';
		}
		var funcName = id + 'Key()';
		var x = (i * 100).toString();
		var svgTemp = '<rect id="' + id + '" class="whiteKey" width="100" height="480"' +
						'stroke-width="3" fill="#fff" y="0" x="' + x + '" stroke="rgb(0,0,0)"/>';
		document.getElementById("white").innerHTML = old + svgTemp;
		console.log(svgTemp);
	}
}

/*var blackKeyGen = function(){
	var keys = 'cdfga';
	for(var i = 0; i < 2; i++){
		for(var t = 0; t < keys.length; t++){
			var old = document.getElementById("black").innerHTML;
			if(i == 0){
				var id = keys.charAt(i - 6).toString() + 's5';
			} else {
				var id = keys.charAt(i).toString() + 's4';
			}
			var funcName = id + 'Key()';
			var x = (t * 100).toString();
			var svgTemp = '<rect id="' + id + '" class="blackKey" width="100" height="480"' +
							'stroke-width="3" fill="#fff" y="0" x="' + x + '" stroke="rgb(0,0,0)"/>';
			document.getElementById("black").innerHTML = old + svgTemp;
		}
	}
	var keys = 'cdfga';
	for(var i = 0; i < 10; i++){
		var old = document.getElementById("black").innerHTML;
		if(i == 2 || i == 6 || i == 9){
			continue;
		} else {
			if(i > 4){
				var id = keys.charAt(i).toString() + 's5';
			} else {
				var id = keys.charAt(i).toString() + 's4';
			}
			var funcName = id + 'Key()';
			var x = (i * 100 + 100).toString();
			var svgTemp = '<rect id="' + id + '" class="blackKey" width="60" height="325"' +
						'stroke-width="3" fill="#000" y="0" x="' + x + '" stroke="rgb(0,0,0)"/>';
			document.getElementById("black").innerHTML = old + svgTemp;
			console.log(svgTemp);	
		}
	}
}*/
var keyDict = [65, 83, 68, 70, 71, 72, 74];
var charDict = ["c", "d", "e", "f", "g", "a", "b"];

window.onload = function(){
	whiteKeyGen();
	/*blackKeyGen();*/
	$(".whiteKey").click(function(e) {
		piano.play({ pitch: $(this).attr('id').toUpperCase()});
	});
	$(document).on('keydown', function(e){
		if(e.keyCode == 65){
			$("#c4").css("fill", "#BDBDBD");
			piano.play({ pitch: 'C4'});
		}
	});
	var reset = function(arg){ 
		$(arg).css("fill", "#FFF");
	}
	$(document).on('keyup', function(e){
		var code = e.keyCode ? e.keyCode : e.which;
		index = keyDict.indexOf(code);
		keyL = charDict[index];
		currId = '#' + keyL + octave.toString();
		reset(currId);
	});
}

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 188){
		octave--;
	} else if (code == 190){
		octave++;
	} else if (code === 87) {
        cs4Key();
    } else if (code === 69) {
        ef4Key();
    } else if (code === 82) {
        fs4Key();
    } else if (code === 84) {
        gs4Key();
    } else if (code === 89) {
        bf4Key();
    }
};

//var keyDict = [["a", 65], ["s", 83], ["d", 68], ["f", 70], ["g", 71], ["h", 72], ["j", 74], ["k", 75], ["l", 76], [";", 186], ["'", 222]];

//var charDict = ["a", "s", "d", "f", "g", "h", "j"];


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
};