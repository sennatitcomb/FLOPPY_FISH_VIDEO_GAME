var rock;
var gravity = 1;
var rocks;;
var speed= -2;
var dead = false;
var clock = 0;
var player;
var pSize = 50;
var score = 0;
var boundaries;
var boundary;
var paused = false;
var playerImage;
var Cheight = 500;
var Clength = 800;
var name;

//currently does not work until we get an image to serve on the server, possibly never

function preload()
{
	playerImage = loadImage("/pufferfish2.png");
}


// this function is run before creating the canvas, anything that needs to be "set up" should be in here.
function setup() 
{
    pauseMenu();
    var canvas = createCanvas(Clength, Cheight);
    background("#96c9e3");
	player = createSprite((Cheight/2)-25,Cheight/2,pSize,pSize);
	player.addImage(playerImage);
	rocks = new Group();
	boundaries = new Group();
}


//pause menu, loads and unloads the html that serves as the menu, also turns on the loop or noLoop functions, which will effectively pause the game
function pauseMenu()
{
	if(!paused)
	{
		noLoop();
		document.getElementsByClassName("menu")[0].style.visibility = "visible";
		document.getElementById("menubackdrop").style.visibility = "visible";
		console.log("PAUSED");
		paused = true;
	}

	else
	{
		console.log("unpause")
		document.getElementsByClassName("menu")[0].style.visibility = "hidden";
		document.getElementById("menubackdrop").style.visibility = "hidden";
		paused = false;
		loop();
	}

}

//extremely basic jump function
function jump(){ if(!dead) player.velocity.y += -25;}


//anything that should be activated through a mouse press should be in here
function mousePressed() 
{
	jump()
}

//death screen
function deathScreen()
{
	document.getElementsByClassName("dead")[0].style.visibility = "visible";
	document.getElementById("menubackdrop").style.visibility = "visible";
}

//anything that happens when the player dies, like making the player fall down
function death()
{	

	player.velocity.y = 20;	
	for(var i = 0; i < boundaries.length; i ++) boundaries.get(i).velocity.x = 0;
	for(var i = 0; i < rocks.length; i ++) rocks.get(i).velocity.x = 0;
	if(player.bounce(rocks)) player.velocity.y = 0;
	deathScreen();
}

//this checks if the player ever touches a boundary line, which will increment the score
function checkScore()
{
	for(var i = 0; i < boundaries.length; i ++)
	{
		if(boundaries.overlap(player, Scored)) 
		{
		}
		
	}

}

//this function gets called by using the overlap property/function, which automatically uses the two objects in contact as parameters (very useful) this just removes the boundary line
//so the player doesn't constantly contact the boundary line.
function Scored(a,b)
{
	score ++;
	console.log(score);
	boundaries.remove(a);
	a.remove();
	
	document.getElementById("updatingscore").textContent = "Score:  " + score;
}

//this function creates the rocks every couple of seconds, sets a random direction (up or down) and sets their speeds.
function createRocks()
{
		var direction
		clock ++;
		if (clock == 100)
		{
			
			direction = random(0,2);
			
			if (direction < 1) direction = 0;
			else direction = height;
			
			boundary = createSprite(Clength,Cheight,1,Cheight*2);
			//boundary.visible = false;
			
			rock = createSprite(Clength,direction,75,random(Cheight/2,Cheight));
			rock.velocity.x= speed;
			rock.immovable = true;
			boundary.velocity.x = speed;
			boundary.visible = false;
			rocks.add(rock);
			boundaries.add(boundary);
			clock = 0;
		}			
}

//this function checks if the player ever contacts a surface. If it is a wall, they die, if it is the upper screen, the player doesn't fly off the map, if it is the lower screen, they die.
function checkCollision()
{
	if(rocks.collide(player)) dead = true;

	if(player.position.y >= Cheight-(pSize/2))
	{
		dead = true;
		player.velocity.y = 0;
		player.position.y = Cheight-(pSize/2);
	}
	if(player.position.y <= 0)
	{
		player.position.y = pSize/2;
		player.velocity.y = 0;
	}
}


//main function, this function gets called every tick, DO NOT PUT ANY WHILE LOOPS IN HERE, IT WILL BREAK
function draw() 
{
if(!paused){
    //VERY IMPORTANT, DO NOT REMOVE, SPRITES DO NOT REDRAW THEMSELVES
    background("#96c9e3");
		
	checkCollision();
	checkScore();
	
	if(dead) //DEAD
	{
		death();
	}
	else //NOT DEAD
	{
		player.velocity.y +=gravity;			
		createRocks();
	}
	
	if(dead && player.position.y >= Cheight-(pSize/2)) 
	{
		console.log("Score: " + score);
		noLoop();
	} 

}	
	drawSprites();

}

//these just check the various key shortcuts like space for jump or P for pause
document.addEventListener('keyup', function(event) 
{
	if(event.keyCode === 80)
	{	
		console.log("KEYDOWN");
		pauseMenu();
	}
});


window.onload = function()
{
	var saveMenu = document.getElementById("save");

	document.getElementById("playBtn").addEventListener('click', function()
	{
		console.log("play");
		if(!dead) pauseMenu();
	});
	
	document.getElementById("yes").addEventListener('click', function()
	{
		location.reload();	
	});
	
	document.getElementById("record").addEventListener('click',function()
	{
		var request = new XMLHttpRequest();
		request.open('POST', '/test', true);		

		name = prompt("Please enter your name");
		if(name == null || name == "") name = "guest";
		var Object = 
		{
			Name: name,
			Score: score
		}
		console.log(Object);

		var JObject = JSON.stringify(Object);
		request.setRequestHeader('content-Type', 'application/json');
		request.send(JObject);
		console.log("SNET");

	});

	var bool = false;
	document.getElementById("howBtn").addEventListener('click',function()
	{
		
		if(!bool)
		{
			bool = true;
			document.getElementById("menubackdrop").style.visibility = "hidden";
		}
		else
		{
			bool = false;
			document.getElementById("menubackdrop").style.visibility = "visible";
		}
	});
}
