$(document).ready(function(){

	//setting up canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");


	//setting up grid system
	var gridNum =20;
	var gridSize = canvas.width/gridNum;

	//setting up player and candy object
	var candy = {
		x:0,
		y:0,
		alive:false
	}

	var player = {
		x:7,
		y:7,
		//direction of movement
		//right = 0, left = 1, up = 2, down = 3, stop = 5
		direction:5,
		alive:true,
		//length of the snake
		tail:1 
	}
	//make and array of arrays to keep track of positions of all lengths of the snake
	var snakeBody = [[7,7]];

	//set up key controls
	var keyPressed = null;
	var leftKey =37;
	var upKey =38;
	var rightKey =39;
	var downKey =40;

	//make a costom insert() function/method for our array
	Array.prototype.insert=function(index, item) {
		//index of where you want to insert your new item, 0 = number of items u want to delete, item = new items that u want to put inside array
		this.splice(index,0,item);
	}

	function update () {
		// 1. update the snakes direction based on users key imput 
		if (keyPressed) {
			if (keyPressed==rightKey && player.direction !=1) {
				player.direction=0;
			}
			if (keyPressed==leftKey && player.direction !=0) {
				player.direction=1;
			}
			if (keyPressed==upKey && player.direction !=3) {
				player.direction=2;
			}
			if (keyPressed==downKey && player.direction !=2) {
				player.direction=3;
			}
		}

		//2. Spawn the candy in a random position in the beginning and everytime it has been eaten
		if (!candy.alive){
			//generate random numbers for x and y of candy
			//range of candy.x should be 0-19
			candy.x=Math.floor(Math.random()*20);
			candy.y=Math.floor(Math.random()*20);

			//check if the candy is spawned right on top of the snake
			var collided;

			do {
				collided=false;

				//run a for loop through the snakeBody array to make sure the candy does not spawn on the snake
				for (var i=0;i<player.tail;i++){
					candy.x
					if (candy.x == snakeBody[i][0] && candy.y == snakeBody [i][1]){
						collided = true;
						candy.x = Math.floor(Math.random()*20);
						candy.y = Math.floor(Math.random()*20);
						break;
					}
				}
			}while(collided)
			//Now the candy does not overlap the snake, set it back alive
			candy.alive= true;

		}

		//Check if player eats candy
		if (player.x == candy.x && player.y == candy.y) {
			candy.alive = false;
			player.tail ++;
		}

		//check if player eats itself
		if(player.tail > 1) {
			for(var i=1; i < player.tail; i++){
				if(player.x == snakeBody [i][0] && player.y == snakeBody[i][1]){
					player.alive = false;
					clearInterval(updates);
				}
			}
		}

		//check if player hits border
		if (player.x < 0 || player.x >= gridNum || player.y < 0 || player.y >= gridNum){
			player.alive = false;
			clearInterval (updates);
		}

		//move the player
		// add new head position to the beginning of the array
		snakeBody.insert(0,[player.x, player.y]);
		//remove the last piece if you are not growing
		while (snakeBody.length > player.tail +1 ) {
			snakeBody.pop();
		}

		// moving player to next box
		switch (player.direction){
			// right
			case 0:
			player.x += 1; break;
			//left
			case 1:
			player.x -= 1; break;
			// up
			case 2:
			player.y -= 1; break;
			//down
			case 3:
			player.y += 1; break;
		}

		//while game is playing, draw all the shapes on the screen according to 
		if (player.alive) {
			draw();
		}
	}

	//draw the actual outcome
	function draw(){
		// clear the background
		context.clearRect(0,0,canvas.width, canvas.height)
		//draw the candy
		//choose the color
		context.fillStyle = "red";
		//draw rectangle
		context.fillRect(candy.x*gridSize,candy.y*gridSize, gridSize,gridSize)

		//draw snake
		for(var i=0; i<player.tail; i++) {
			context.fillStyle = "blue";
			context.fillRect (snakeBody [i][0] *gridSize, snakeBody[i][1]*gridSize,gridSize,gridSize);

		}
	}

	//keydown events
	$(window).on("keydown", function(event) {
		keyPressed = event.which;
		
	})

	//call updates
	update();
	var updates = setInterval(update, 100);

});

















