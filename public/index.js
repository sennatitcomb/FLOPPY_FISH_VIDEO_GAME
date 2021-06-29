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

function setup() 
{
    var canvas = createCanvas(1000, 1000);
    background("#081217");
	player = createSprite(25,500,pSize,pSize);
	rocks = new Group();
	boundaries = new Group();
}

function mousePressed() 
{
	player.velocity.y += - 25;
	
}

function death()
{	
	player.velocity.y = 20;
	
	for(var i = 0; i < rocks.length; i ++)rocks.get(i).velocity.x=0;

	for(var i = 0; i < boundaries.length; i ++) boundaries.get(i).velocity.x = 0;
}

function checkScore()
{
	for(var i = 0; i < boundaries.length; i ++)
	{
		if(boundaries.overlap(player, Scored)) 
		{
			score ++;	
		}
		
		if(score / 10 >= 1)
		{
			speed = speed * score/10
		}
	}

}

function Scored(a,b)
{
	console.log(score);
	boundaries.remove(a);
	a.remove();
	
}

function createRocks()
{
		var direction
		clock ++;
		if (clock == 100)
		{
			
			direction = random(0,2);
			
			if (direction < 1) direction = 0;
			else direction = 1000;
			
			boundary = createSprite(1000,1000,1,2000);
			//boundary.visible = false;
			
			rock = createSprite(1000,direction,75,random(250,1000));
			rock.velocity.x= speed;
			rock.immovable = true;
			boundary.velocity.x = speed;
			rocks.add(rock);
			boundaries.add(boundary);
			clock = 0;
		}			
}

function checkCollision()
{
	if(rocks.collide(player)) dead = true;

	if(player.position.y >= 1000-(pSize/2))
	{
		dead = true;
		player.velocity.y = 0;
		player.position.y = 1000-(pSize/2);
	}
	if(player.position.y <= 0)
	{
		player.position.y = pSize/2;
		player.velocity.y = 0;
	}
}

function draw() 
{
    background("#081217");
		
	checkCollision();
	checkScore();
	
	if(dead) //DEAD
	{
		console.log("DEATH COMES FOR US ALL");
		death();
	}
	else //NOT DEAD
	{
		player.velocity.y +=gravity;			
		createRocks();
	}
	
	if(dead && player.position.y >= 1000-(pSize/2)) 
	{
		console.log(score);
		noLoop();
	} 

	
	drawSprites();

}
