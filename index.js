$(document).ready(function () {
	var word, wordLength;
	var alphabetDisabled = true;
	var consonantDisabled = false;
	var usedLetters = [];
	loadWord();

	$('.spin-wheel').click(function () {
			spinWheel();
			$(this).prop('disabled', true);
			alphabetDisabled = false;
			consonantDisabled = false;
	})
	
	$('.alphabet').click(function () {
		if (!alphabetDisabled) {
			$letterChosen = $(this).data("letter");

			if ($(this).hasClass('used')) {
				alert("You've already tried that one.")

			} else if ($(this).hasClass('vowel')) {
				let $self = $(this);
				$('#myModal').modal();
				$('#buy-vowel').click(function () {
					$('#myModal').modal('toggle');
					$($self).css({'background-color': 'lightgrey', 'opacity': '.7', 'color': 'grey', 'border': '1px solid grey'});
					$($self).addClass('used');
					buyVowel($letterChosen);
				})

			} else if (!consonantDisabled) {
				$(this).css({'background-color': 'lightgrey', 'opacity': '.7', 'color': 'grey', 'border': '1px solid grey'});
				$(this).addClass('used');
				checkLetter($letterChosen);
				console.log(usedLetters);
				consonantDisabled = true;
				if (turnsLeft > 0) {
					$('.btn-success').prop('disabled', false);
				}
			}
		}
	})
	
})

var bankValue = 0;
var prizes = [550, 800, 5000, 'bankrupt', 600, 300, 3500, 600, 300, 700, 450, 350, 800, 'lose a turn', 300, 400, 600, 'bankrupt', 900, 'free spin', 500, 900, 300, 400];
var multiplier = 0;
var turnsLeft = 5;

function loadWord() {
	word = "chameleon";
	wordLength = word.length;
	for (var i = 0; i < wordLength; i++) {
		$('.letter-boxes').append(`<div class="col guess-boxes"></div>`)
	}
}

function spinWheel() {
	var $wheel = $('#wheel-image');
	multiplier = Math.floor(Math.random() * 24);
	let degree_value = (multiplier * 15);
	$wheel.css({'transform': 'rotate(' + degree_value + 'deg)'});
	console.log(prizes[multiplier]);
	if (!Number.isInteger(prizes[multiplier])) {
		console.log("Not an integer");
	}
	turnsLeft--;
	$('#turn span').text(turnsLeft);
}

function checkLetter(letter) {
	let correctLetterQuantity = 0;
	for (var i = 0; i < wordLength; i++) {
		if (word[i] === letter) {
			$('.guess-boxes')[i].append(letter);
			correctLetterQuantity++;
			if (Number.isInteger(prizes[multiplier])) {
				bankValue = bankValue + prizes[multiplier];
				$('#bank span').text(bankValue);
			}
		}
	}
}

function buyVowel(letter) {
	bankValue -= 250;
	$('#bank span').text(bankValue);
	for (var i = 0; i < wordLength; i++) {
		if (word[i] === letter) {
			$('.guess-boxes')[i].append(letter);
		}
	}
}