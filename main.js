(
	function(){
		
		// Init
		let COLOR, Rain, NUM_RAIN, canvas, ctx, rain, drawRain, i, range, ANGLE, LENGTH_RAIN;
		
		// How rainy is it?
		NUM_RAIN = 1;
		
		// Angle of rain
		ANGLE = 45;
		
		// Length of rain
		LENGTH_RAIN = 50;
		
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
			ctx.beginPath();
			ctx.strokeStyle = `rgba(${COLOR[0]}, ${COLOR[1]}, ${COLOR[2]}, 0.8)`;
			ctx.moveTo(xStart,yStart);
			ctx.lineTo(xEnd,yEnd);
			ctx.stroke();
		}
		
		Rain = class Rain {
			constructor() {
				this.xStart = Math.random() * canvas.width;
				this.yStart = Math.random() * canvas.height;
				this.xEnd = this.xStart + (LENGTH_RAIN * Math.sin(-ANGLE / (Math.PI/180)));
				this.yEnd = this.yStart + (LENGTH_RAIN * Math.cos(-ANGLE / (Math.PI/180)));
			}
			fall() {
				this.xStart = this.xStart + 1;
				this.yStart = this.yStart + 1;
				this.xEnd = this.xStart + (LENGTH_RAIN * Math.sin(-ANGLE / (Math.PI/180)));
				this.yEnd = this.yStart + (LENGTH_RAIN * Math.cos(-ANGLE / (Math.PI/180)));
				console.log('xStart' + this.xStart);
				console.log('yStart' + this.yStart);
				console.log('xEnd' + this.xEnd);
				console.log('yEnd' + this.yEnd);
			}
			draw() {
				this.fall();
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
			
		run = function(){
			let r, i, len, drops;
			requestAnimationFrame(run);
			ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
			drops = [];
			for ( i = 0, len = rain.length; i < len; i++){
				r = rain[i];
				drops.push(r.draw());
			}
			return drops;
		}
		run();
		
	}

).call();