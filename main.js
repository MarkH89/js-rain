(
	function(){
		
		// Init
		let COLOR, Rain, NUM_RAIN, canvas, ctx, rain, drawRain, i, ANGLE, LENGTH_RAIN, RAIN_SPEED, tightness, boundary;
		
		let num_ctrl, angle_ctrl, tightness_ctrl, length_ctrl, speed_ctrl, VAR_RAIN_LENGTH, VAR_RAIN_SPEED; 
	
		boundary = 0;
	
		// How rainy is it?
		num_ctrl = document.getElementById('num-rain');
		NUM_RAIN = parseInt(num_ctrl.value);
		
		// Angle of rain
		angle_ctrl = document.getElementById('angle');
		ANGLE = parseInt(angle_ctrl.value);
			
		// Angle of rain
		tightness_ctrl = document.getElementById('tightness');
		tightness = parseInt(tightness_ctrl.value);
		
		// Length of rain
		length_ctrl = document.getElementById('length');
		LENGTH_RAIN = parseInt(length_ctrl.value);

		var_length_ctrl = document.getElementById('var_length');
		VAR_RAIN_LENGTH = parseInt(var_length_ctrl.value);
		
		// Speed at which rain falls
		speed_ctrl = document.getElementById('speed');
		RAIN_SPEED = parseInt(speed_ctrl.value);
		
		var_speed_ctrl = document.getElementById('var_speed');
		VAR_RAIN_SPEED = parseInt(var_speed_ctrl.value);
		
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
				this.speed = RAIN_SPEED + (Math.random() * VAR_RAIN_SPEED);
				this.rain_length = LENGTH_RAIN + (Math.random() * VAR_RAIN_LENGTH);
			}
			fall() {
				if(this.xStart > canvas.width || this.yStart > canvas.height){
					this.xStart = (Math.random() * canvas.width) - LENGTH_RAIN;
					this.yStart = this.xStart < boundary ? (Math.random() * canvas.height) - LENGTH_RAIN : (Math.random()) - (LENGTH_RAIN + boundary);
					this.angle = (ANGLE + Math.random() * tightness);
					this.speed = RAIN_SPEED + (Math.random() * VAR_RAIN_SPEED);
					this.rain_length = LENGTH_RAIN + (Math.random() * VAR_RAIN_LENGTH);
				}
				this.xStart = this.xStart + (Math.sin(this.angle * (Math.PI/180)) * this.speed);
				this.yStart = this.yStart + (Math.cos(this.angle * (Math.PI/180)) * this.speed);
				this.xEnd = this.xStart + (Math.sin(this.angle * (Math.PI/180)) * this.rain_length);
				this.yEnd = this.yStart + (Math.cos(this.angle * (Math.PI/180)) * this.rain_length);
			}
			draw() {
				this.fall();
				return drawRain(this.xStart, this.yStart, this.xEnd, this.yEnd);
			}
		}
		
		createRain = function(){
			var j, rainDrops;
			rainDrops = [];
			for ( i = 1; i <= NUM_RAIN; ++i) {
				rainDrops.push(new Rain);
			}
			//console.log(rainDrops);
			return rainDrops;
		}
		
		// Create lots of Rain
		rain = createRain();
		
		// Run animation
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
		
		// Add event listeners
		num_ctrl.addEventListener('change', function(){
			NUM_RAIN = parseInt(num_ctrl.value);
			rain = createRain();
		});
		
		angle_ctrl.addEventListener('change', function(){
			ANGLE = parseInt(angle_ctrl.value); 
		});
		
		tightness_ctrl.addEventListener('change', function(){
			tightness = parseInt(tightness_ctrl.value); 
		});
		
		length_ctrl.addEventListener('change', function(){
			LENGTH_RAIN = parseInt(length_ctrl.value); 
		});
		
		speed_ctrl.addEventListener('change', function(){
			RAIN_SPEED = parseInt(speed_ctrl.value); 
		});
		
		var_length_ctrl.addEventListener('change', function(){
			VAR_RAIN_LENGTH = parseInt(var_length_ctrl.value); 
		});
		
		var_speed_ctrl.addEventListener('change', function(){
			VAR_RAIN_SPEED = parseInt(var_speed_ctrl.value); 
		});
		
	}

).call();