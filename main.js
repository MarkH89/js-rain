(
	function(){
		
		// Init
		let COLOR, Rain, NUM_RAIN, canvas, ctx, rain, drawRain, i, range, ANGLE, LENGTH_RAIN, RAIN_SPEED;
		
		// How rainy is it?
		NUM_RAIN = 250;
		
		// Angle of rain
		ANGLE = 20;
		
		// Length of rain
		LENGTH_RAIN = 30;
		
		// Speed at which rain falls
		RAIN_SPEED = 15;
		
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
				this.angle = ANGLE// + ((Math.random() * 20)) - 10 );
				this.xEnd = this.xStart + (Math.sin(this.angle * (Math.PI/180)) * LENGTH_RAIN);
				this.yEnd = this.yStart + (Math.cos(this.angle * (Math.PI/180)) * LENGTH_RAIN);
			}
			fall() {
				if(this.xStart > canvas.width){
					this.xStart = -LENGTH_RAIN;
					this.angle = (ANGLE + Math.random() * 20);
				}
				if(this.yStart > canvas.height){
					this.yStart = -LENGTH_RAIN;
					this.angle = (ANGLE + Math.random() * 20);
				}
				if(this.xStart < 0 && this.yStart < 0){
					this.xStart = 0;
					this.yStart = 0;
				}
				console.log()
				this.xStart = this.xStart + (Math.sin(this.angle * (Math.PI/180)) * RAIN_SPEED);
				this.yStart = this.yStart + (Math.cos(this.angle * (Math.PI/180)) * RAIN_SPEED);
				this.xEnd = this.xStart + (Math.sin(this.angle * (Math.PI/180)) * LENGTH_RAIN);
				this.yEnd = this.yStart + (Math.cos(this.angle * (Math.PI/180)) * LENGTH_RAIN);
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
			
		let	c_loops = 0;
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