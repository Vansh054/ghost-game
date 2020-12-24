var PLAY;
var END;
var gameState = "PLAY";
var climberImage, doorImage;
var gameover, gameoverS
var towerImage;
var obstaceleG;
var ghostSImage,ghostSsprite,ghostJImage;

function preload(){
  ghostSImage = loadImage("ghost-jumping.png")
  ghostJImage = loadImage("ghost-standing.png")
  gameoverS = loadImage("gameover.jpg")
  climberImage = loadImage("climber.png")
  doorImage = loadImage("door.png")
  towerImage = loadImage("tower.png")
}

function setup(){
  createCanvas(300,500);
  
  tower = createSprite(150,50,300,250)
  tower.addImage(towerImage)
  tower.scale = 0.50;
  
  ghostSsprite = createSprite(150,200)
  ghostSsprite.addImage(ghostSImage)
  ghostSsprite.velocityY = 5;
  ghostSsprite.scale = 0.35;
     
  
  obstacleG = createGroup();  
  
  
}

function draw(){
  
 // background(towerImage);
  if (gameState == "PLAY")
    {
        
  spawnObstacles();
  
  
  if (keyWentDown("space"))
    {
      ghostSsprite.velocityY= -4;
      ghostSsprite.addImage(ghostJImage)
    }
  if (keyWentUp("space"))
    {
      ghostSsprite.velocityY = 5;
      ghostSsprite.addImage(ghostSImage)
    }
  if (keyDown(RIGHT_ARROW))
    {
      ghostSsprite.x = ghostSsprite.x + 2;
    }
  if (keyDown(LEFT_ARROW))
    {
      ghostSsprite.x = ghostSsprite.x - 2;
    }
  
  tower.velocityY = 6;
  
  if(tower.y > 325)
    {
      tower.y = 175;
    }
  
  if (obstacleG.collide(ghostSsprite) || ghostSsprite.y > 505)
    {
      gameState = "END";
    }
    }
  
  if (gameState == "END")
    {
      tower.visible = false;
      ghostSsprite.visible = false;
      obstacleG.destroyEach();
      
      createCanvas(400,400)
      gameover = createSprite(200,200)
      gameover.scale = 0.80;
      gameover.addImage(gameoverS);
      
    } 
    ghostSsprite.setCollider("rectangle",0,30,230,245)
    ghostSsprite.debug = false;
   
   
  
  drawSprites();
}

function spawnObstacles()
{
   
  if (frameCount % 150 == 0)
    {
      ran =Math.round(random(80,225))
      climber = createSprite(ran,50)
      door = createSprite(ran,0)
      climber.addImage(climberImage)
      climber.scale = 0.75;
      climber.velocityY = 3;
      climber.setCollider("rectangle",0,0,100,30)
      climber.debug = false;
      door.addImage(doorImage)
      door.scale = 0.75;
      door.velocityY = 3;
      door.setCollider("rectangle",0,0,60,112)
      door.debug = false;
      
      obstacleG.add(climber);
      obstacleG.add(door);
    }
}