$(document).ready(function () {
	$('.btn-success').click(function () {
			spinWheel();
	})
	
	
})


	function spinWheel() {
		var prizes = [550, 800, 'jackpot', 'bankrupt', 600, 300, 3500, 600, 300, 700, 450, 350, 800, 'lose a turn', 300, 400, 600, 'bankrupt', 900, 'free spin', 500, 900, 300, 400];
		var $wheel = $('#wheel-image');
		let multiplier = Math.floor(Math.random() * 24);
		let degree_value = (multiplier * 15);
		$wheel.css({'transform': 'rotate(' + degree_value + 'deg)'});
		console.log(prizes[multiplier]);
	}
