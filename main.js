(
	function(){
		
		// Init
		let COLOR, Rain, NUM_RAIN, canvas, ctx, rain, drawRain, i, range;
		
		// How rainy is it?
		NUM_RAIN = 200;
		
		// What color is the rain?
		COLOR = [0,0,250];
		
		// Get the canvas
		canvas = document.getElementById('rain');
		
		// Get context
		ctx = canvas.getContext('2d');
		
		// Size canvas to window
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		// Draw the rain
		drawRain = function(xStart, yStart, xEnd, yEnd){
			ctx.strokeStyle = `rgba(${COLOR[0]}, ${COLOR[1]}, ${COLOR[2]}, 0.8)`;
			ctx.moveTo(xStart,yStart);
			ctx.lineTo(xEnd,yEnd);
			ctx.stroke();
		}
		
		Rain = class Rain {
			constructor() {
				this.xStart = Math.random() * canvas.width;
				this.yStart = Math.random() * canvas.height;
				this.xEnd = (Math.random() * 100) + this.xStart;
				this.yEnd = (Math.random() * 100) + this.yStart;
			}
			draw() {
				return drawRain(this.xStart, this.yStart, this.xEnd, this.yEnd);
			}
		}
		
		// Create lots of Rain
		rain = (function(){
			var j, rainDrops;
			rainDrops = [];
			for ( i = 1; i <= NUM_RAIN; ++i) {
				rainDrops.push(new Rain);
			}
			return rainDrops;
		})();
		
		drops = [];
		for ( i = 1, len = rain.length; i < len; i++){
			r = rain[i];
			drops.push(r.draw());
		}
		
	}

).call();