(
	function(){
		
		// Init
		let COLOR, Rain, NUM_RAIN, canvas, ctx, rain, drawRain, i, ANGLE, RAIN_LENGTH, RAIN_SPEED, TIGHTNESS, boundary, PI_180;
		
		let num_ctrl, angle_ctrl, tightness_ctrl, length_ctrl, speed_ctrl, VAR_RAIN_LENGTH, VAR_RAIN_SPEED; 
	
		PI_180 = Math.PI/180;
	
		boundary = 0;
	
		// How rainy is it?
		num_ctrl = document.getElementById('num-rain');
		NUM_RAIN = parseInt(num_ctrl.value);
		
		// Angle of rain
		angle_ctrl = document.getElementById('angle');
		ANGLE = parseInt(angle_ctrl.value);
			
		// Angle of rain
		tightness_ctrl = document.getElementById('tightness');
		TIGHTNESS = parseInt(tightness_ctrl.value);
		
		// Length of rain
		length_ctrl = document.getElementById('length');
		RAIN_LENGTH = parseInt(length_ctrl.value);

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
				this.randomSVal = Math.random();
				this.randomXVal = Math.random();
				this.randomYVal = Math.random();
				this.randomLVal = Math.random();
				this.randomAVal = Math.random();
				this.xStart = this.randomXVal * canvas.width;
				this.yStart = this.randomYVal * canvas.height;
				this.angle = (ANGLE + this.randomAVal * TIGHTNESS);
				this.xEnd = this.xStart + (Math.sin(this.angle * (PI_180)) * RAIN_LENGTH);
				this.yEnd = this.yStart + (Math.cos(this.angle * (PI_180)) * RAIN_LENGTH);
				this.speed = RAIN_SPEED + (this.randomSVal * VAR_RAIN_SPEED);
				this.rain_length = RAIN_LENGTH + (this.randomLVal * VAR_RAIN_LENGTH);
				this.debug();
			}
			update() {
				this.xStart = (this.randomXVal * (canvas.width + (Math.tan(this.angle * (PI_180))) * canvas.height)) - (RAIN_LENGTH + (Math.tan(this.angle * (PI_180)) * canvas.height));
				this.yStart = this.xStart < boundary ? (this.randomYVal * canvas.height) - RAIN_LENGTH : (Math.random()) - (RAIN_LENGTH + boundary);
				this.angle = (ANGLE + this.randomAVal * TIGHTNESS);
				this.speed = RAIN_SPEED + (this.randomSVal * VAR_RAIN_SPEED);
				this.rain_length = RAIN_LENGTH + (this.randomLVal * VAR_RAIN_LENGTH);				
			}
			fall() {
				if(this.xStart > canvas.width || this.yStart > canvas.height){
					this.update();
				}
				this.xStart = this.xStart + (Math.sin(this.angle * (PI_180)) * this.speed);
				this.yStart = this.yStart + (Math.cos(this.angle * (PI_180)) * this.speed);
				this.xEnd = this.xStart + (Math.sin(this.angle * (PI_180)) * this.rain_length);
				this.yEnd = this.yStart + (Math.cos(this.angle * (PI_180)) * this.rain_length);
			}
			draw() {
				this.fall();
				return drawRain(this.xStart, this.yStart, this.xEnd, this.yEnd);
			}
			debug() {
				console.log(
					'RandomVal: ' + this.randomVal + '\n' +
					'xStart: ' + this.xStart + '\n' +
					'yStart: ' + this.yStart
				);
			}
		}
		
		// The Rainmaker
		createRain = function(){
			var j, rainDrops;
			rainDrops = [];
			for ( i = 1; i <= NUM_RAIN; ++i) {
				rainDrops.push(new Rain);
			}
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
		
		// Control Num Raindrops
		num_ctrl.addEventListener('change', function(){
			NUM_RAIN = parseInt(num_ctrl.value);
			rain = createRain();
		});
		
		// Control Angle of Rain
		angle_ctrl.addEventListener('change', function(){
			ANGLE = parseInt(angle_ctrl.value); 
		});
		
		// Control How Tight or Loose the rain drop angle can be
		tightness_ctrl.addEventListener('change', function(){
			TIGHTNESS = parseInt(tightness_ctrl.value); 
		});
		
		// Control the length of the drops
		length_ctrl.addEventListener('change', function(){
			RAIN_LENGTH = parseInt(length_ctrl.value); 
		});
		
		// Control the speed of the rain drops
		speed_ctrl.addEventListener('change', function(){
			RAIN_SPEED = parseInt(speed_ctrl.value); 
		});
		
		// Control how variable the length can be
		var_length_ctrl.addEventListener('change', function(){
			VAR_RAIN_LENGTH = parseInt(var_length_ctrl.value); 
		});
		
		// Control how variable the speed can be
		var_speed_ctrl.addEventListener('change', function(){
			VAR_RAIN_SPEED = parseInt(var_speed_ctrl.value); 
		});
		
	}

).call();