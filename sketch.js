var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ghost;
var climber, climbersGroup;
var tower, towersGroup;
var door, doorsGroup;
var coin, coinsGroup;
var invisible_block, invisible_blockGroup;
var spookySound;

function preload(){
  
  ghost = loadImage("ghost-standing.png");
  climber = loadImage("climber.png");
  tower = loadImage("tower.png");
  door = loadImage("door.png");
  coin = loadImage("coin.jpg");
  
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  
  spookySound.loop();
  
  tower_img = createSprite(300,300,10,10);
  tower_img.addImage("tower_scrolling",tower);
  tower_img.velocityY = 3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  coinsGroup = new Group();
  invisible_blockGroup = new Group();
  
  ghost_img = createSprite(300,100,10,10);
  ghost_img.addImage("ghost_image",ghost);
  ghost_img.scale = 0.3;
  
}

function draw(){
  
  createCanvas(600,600);
  background("black");
  
  if (gameState === PLAY) {
    
    spawnDoors();
    
    if(keyDown("left_arrow")){
      ghost_img.x = ghost_img.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost_img.x = ghost_img.x + 3;
    }
    
    if(keyDown("space")){
      ghost_img.velocityY = -3;
    }
    
    ghost_img.velocityY = ghost_img.velocityY + 0.3;
    
    if(tower_img.y > 400){
      tower_img.y = 300
    }
    
    if(climbersGroup.isTouching(ghost_img)){
      ghost_img.velocityY = 0;
    }
    
    if(coinsGroup.isTouching(ghost_img)){
      coinsGroup.destroyEach();
      ghost_img.scale = ghost_img.scale + 0.01;
    }
    
    if(invisible_blockGroup.isTouching(ghost_img) || ghost_img.y > 600){
      ghost_img.destroy();
      tower_img.destroy();
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
      coinsGroup.destroyEach();
      gameState = END;
    }
    
    
    
    }
  
  
  if (gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",220,298);
  }
  
  drawSprites();
  
}

function spawnDoors(){
  
if (frameCount % 120 === 0) {
  door_img = createSprite(200,-40,10,10);
  climber_img = createSprite(200,10,10,10);
  coin_img = createSprite(200,-30,10,10);
  
  invisible_block_img = createSprite(200,20);
  invisible_block_img.width = climber_img.width;
  invisible_block_img.height = 2;
  invisible_block_img.visible = false;
  
  door_img.x = Math.round(random(130,470));
  climber_img.x = door_img.x;
  invisible_block_img.x = door_img.x;
  coin_img.x = door_img.x;
  
  door_img.addImage(door);
  climber_img.addImage(climber);
  coin_img.addImage(coin);
  coin_img.scale = 0.1;
  
  door_img.velocityY = 3;
  climber_img.velocityY = 3;
  coin_img.velocityY = 3;
  invisible_block_img.velocityY = 3;
  
  ghost_img.depth = door_img.depth;
  ghost_img.depth = ghost_img + 1;
  
  door_img.lifetime = 300;
  climber_img.lifetime = 300;
  coin_img.lifetime = 300;
  invisible_block_img.lifetime = 300;
  
  doorsGroup.add(door_img);
  climbersGroup.add(climber_img);
  coinsGroup.add(coin_img);
  invisible_blockGroup.add(invisible_block_img);
  
}
}