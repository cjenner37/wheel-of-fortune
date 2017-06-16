$(document).ready(function () {
	var word, wordLength;
	loadWord();

	$('.btn-success').click(function () {
			spinWheel();
	})
	
	$('.alphabet').click(function () {
		$letterChosen = $(this).data("letter");
		$(this).css({'background-color': 'lightgrey', 'opacity': '.7', 'color': 'grey', 'border': '1px solid grey'});
		checkLetter($letterChosen);
		console.log($letterChosen);
	})
	
})

	function loadWord() {
		word = "chameleon";
		wordLength = word.length;
		for (var i = 0; i < wordLength; i++) {
			$('.letter-boxes').append(`<div class="col guess-boxes"></div>`)
		}
	}

	function spinWheel() {
		var prizes = [550, 800, 'jackpot', 'bankrupt', 600, 300, 3500, 600, 300, 700, 450, 350, 800, 'lose a turn', 300, 400, 600, 'bankrupt', 900, 'free spin', 500, 900, 300, 400];
		var $wheel = $('#wheel-image');
		let multiplier = Math.floor(Math.random() * 24);
		let degree_value = (multiplier * 15);
		$wheel.css({'transform': 'rotate(' + degree_value + 'deg)'});
		console.log(prizes[multiplier]);
	}

	function checkLetter(letter) {
		for (var i = 0; i < wordLength; i++) {
			if (word[i] === letter) {
				$('.guess-boxes')[i].append(letter);
			}
		}
	}