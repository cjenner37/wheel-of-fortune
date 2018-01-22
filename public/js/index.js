var word, wordLength, $self;
var alphabetDisabled = true;
var consonantDisabled = false;
var usedLetters = [];

$(document).ready(function () {
	loadWord();

	$('#infoModal').modal();

	$('#help').click(function () {
		$('#infoModal').modal();
	})

	$('#solve').click(function () {
		if (word === $('#guess').val()) {
			alert("You Win!");
			loadWord();
		} else {
			alert("You Lose!");
			alphabetDisabled = true;
			$('.btn-success').prop('disabled', true);
			$(this).prop('disabled', true);
		}
	})

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
				$self = $(this);
				$('#myModal').modal();
				$('#buy-vowel').click(function () {
					$('#myModal').modal('toggle');
					buyVowel($letterChosen);
				});

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
	});
	
}); // end document.ready

var bankValue = 0;
var prizes = [550, 800, 5000, 'bankrupt', 600, 300, 3500, 600, 300, 700, 450, 350, 800, 'lose a turn', 300, 400, 600, 'bankrupt', 900, 'free spin', 500, 900, 300, 400];
var multiplier = 0;
var turnsLeft = 5;
var round = 0;

function loadWord() {
	let library = ["chameleon", "salamander", "concord", "inconceivable", "superfluous"];

   word = library[round];
   round++;
	wordLength = word.length;
	turnsLeft = 5;
	$('#round span').text(round);
	$('.letter-boxes').empty();
	$('.alphabet').css({'background-color': '', 'opacity': '', 'color': 'black', 'border': '1px solid black'});
	$('.vowel').css({'color': 'red',});
	for (var i = 0; i < wordLength; i++) {
		$('.letter-boxes').append(`<div class="col guess-boxes"></div>`)
	}
}

function spinWheel() {
	var $wheel = $('#wheel-image'), degree = 0;
	multiplier = Math.floor(Math.random() * 24);
	let degree_value = (multiplier * 15);
	$wheel.css({'transform': 'rotate(' + degree_value + 'deg)'});
	console.log(prizes[multiplier]);
	if (!Number.isInteger(prizes[multiplier])) {
		if (prizes[multiplier] === 'bankrupt') {
			bankValue = 0;
			$('#bank span').text(bankValue);
		} else if (prizes[multiplier] === 'lose a turn'){
			turnsLeft--;
		} else if (prizes[multiplier] === 'free spin'){
			turnsLeft++;
		}
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
	if (bankValue >= 250) {
		bankValue -= 250;
		$('#bank span').text(bankValue);
		for (var i = 0; i < wordLength; i++) {
			if (word[i] === letter) {
				$('.guess-boxes')[i].append(letter);
			}
		}
		$self.css({'background-color': 'lightgrey', 'opacity': '.7', 'color': 'grey', 'border': '1px solid grey'});
		$self.addClass('used');
	} else {
		alert("You don't have enough money!");
	}
}