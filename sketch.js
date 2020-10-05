var PLAY;
var END;
var gameState = PLAY


var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
 
}



function setup() {
  createCanvas(600,400);
   monkey = createSprite(100,250,20,20);
   monkey.addAnimation("moving",monkey_running)
   monkey.scale = 0.1;
  
 ground = createSprite(300,345,900,130);

  score = 0
  
  obstacleGroup = new Group()
  bananaGroup = new Group()
  
  monkey.setCollider("rectangle",0,0,600,600)
  monkey.debug = false
}


function draw() {
   background("lightGreen");
  
 
  
  if(gameState === PLAY) {
     if (keyDown("space")&& monkey.y >= 249){
   monkey.velocityY = -10
  }
  
  monkey.velocityY = monkey.velocityY + 0.4
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,445,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,200,50);
  
  score = score + Math.round(getFrameRate()/61);
    
   SpawnObstacle();
   SpawnBanana();
    
    
    
  }
  else if (gameState === END){
    obstacleGroup.velocityX  = 0;
    monkey.velocityY = 0;
  
    
  }
  
  monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey)){
      gameState = END
    }
  
   
  drawSprites();
}

function SpawnObstacle(){
  if (frameCount % 150 === 0){
    obstacle = createSprite(10,260,10,10)
    obstacle.x = Math.round(random(600,800))
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.12
    obstacle.velocityX = -3
    
    obstacle.lifetime = 255
    
    
    obstacleGroup.add(obstacle);
  }
}

function SpawnBanana(){
 if(frameCount % 150 === 0){
  banana = createSprite(300,200);
  banana.y = Math.round(random(120,200))
  banana.addImage(bananaImage)
  banana.velocityX = -3
  banana.scale = 0.12
  bananaGroup.add(banana);
 }
}




