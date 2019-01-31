window.onload=function() {
	instructions = ''
	csize=40; // Canvas size in dots
	sx=sy=(csize/2)-1; // Snake position vars
	mx=my=0; // Snake movement vars
	dx=dy=0; // Dot position vars vars
	size=20; // Snake and dot size
	sbody=[]; // Snake sbody
	slen = 2; // Snake length
	speed = 80; // Initial speed
	speedrate = 2; // Rate of speed increase
	maxspeed = 20; // Max speed
	scorepoints = 0; // Initial score
	scorespeed = 1; // Initial speed on score
	pause = false;
	newDotPosition();
	canv=document.getElementById("canv"); // Canvas
	ctx=canv.getContext("2d"); // Context
	document.addEventListener("keydown", keyEvent); // Event listener for keyboard commands
	interval = setInterval(snake, speed); // Execute snake method in the specified rate
}

function snake() {
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, canv.width, canv.height); // Printing black canvas

	ctx.fillStyle="white"; // White snake and dot
	sx+=mx; // Moving snake
	sy+=my; //
	if(sx<0 || sx>csize-1 || sy<0 || sy>csize-1) { // Test if the snake hits the wall
		clearInterval(interval); // Game over
	}

	for(var i=0; i<sbody.length; i++) { // Printing all the snake's dots
		ctx.fillRect(sbody[i].x*size, sbody[i].y*size, size, size); // Printing one dot
		if(sbody[i].x == sx && sbody[i].y == sy && scorepoints > 0) { // If the snake hits itself after the game started
			clearInterval(interval); // Game over
		}
	}

	sbody.push({x:sx, y:sy}); // Adding 1 dot to the body of the snake
	while(sbody.length > slen) { // Shifting the tail as the snake moves
		sbody.shift();
	}

	if(dx==sx && dy==sy) { // If the snake hits a dot
		slen++; // Increase snake length
		newDotPosition();
		scorepoints+=10;
		if(speed > maxspeed) {
			scorespeed++;
			clearInterval(interval);
			interval = setInterval(snake, speed-=speedrate); // Decrease interval rate, making the game faster
		} else {
			scorespeed = 'MAX';
		}
	}

	ctx.fillRect(dx*(size) ,dy*(size), size, size); // Printing the dot
	document.getElementById("score").innerHTML = '<strong>Score: </strong>' + scorepoints + '	<strong>Speed: </strong>' + scorespeed; // Updating score
}

function newDotPosition() {
	dx=Math.floor(Math.random()*(csize-2) + 1); // Randomize new dot position, avoid the dot being on the edges
	dy=Math.floor(Math.random()*(csize-2) + 1); //
}

function keyEvent(e) {
	if((e.key == 'ArrowLeft' || e.key == 'a') && mx != 1 && !pause) { // Disabled when moving right or paused
		mx=-1;my=0; // Indicate left move
	} else if((e.key == 'ArrowUp' || e.key == 'w') && my != 1 && !pause) { // Disabled when moving down or paused
		mx=0;my=-1; // Indicate up move
	} else if((e.key == 'ArrowRight' || e.key == 'd') && mx != -1 && !pause) { // Disabled when moving left or paused
		mx=1;my=0; // Indicate right move
	} else if((e.key == 'ArrowDown' || e.key == 's') && my != -1 && !pause) { // Disabled when moving up or paused
		mx=0;my=1; // Indicate down move
	} else if(e.key == 'r') {
		location.reload();
	} else if(e.key == 'Escape'){
		if(pause) {
				interval = setInterval(snake, speed);
				pause = false;
		} else {
				clearInterval(interval);
				pause = true;
		}
	}
}
