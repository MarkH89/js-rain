(
	function(){
		
		// Init
		let COLOR, RAIN, NUM_RAIN, canvas, ctx, rain, drawRain, i, range;
		
		// How rainy is it?
		NUM_RAIN = 250;
		
		// What color is the rain?
		COLOR = [0,0,250];
		
		// Get the canvas
		canvas = document.getElementById('rain');
		
		// Get context
		ctx = canvas.getContext('2d');
		
		// Draw the rain
		drawRain = function(x, y, r, style){
			ctx.beginPath();
			ctx.fillStyle = `rgba(${COLOR[0]}, ${COLOR[1]}, ${COLOR[2]}, 0.8)`;
			ctx.fillRect(50,50,2,50)
		}
		
		drawRain();
	}

).call();