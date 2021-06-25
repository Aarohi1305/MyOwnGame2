var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var ground;
var cat, catimg;
var obstacle;

var puddle, obstacle2, hole;
var holeimg, puddleimg;
var  obstacle2img;
var backimg, groundimg;

var restart, restartimg;
var gameOver, gameOverimg;

var invisibleGround;

function preload(){
    
    catimg = loadImage("images/catRunning.png");
    holeimg = loadImage("images/hole.png");
    puddleimg = loadImage("images/puddle.png");
    obstacle2img = loadImage("images/obstcle2.png");

    backimg = loadImage("images/road.jpg");
    restartimg = loadImage("images/restart.png");
    gameOverimg = loadImage("images/gameOver.png");

    groundimg = loadImage("images/ground.jpg");
}
function setup(){
    
    canvas = createCanvas(displayWidth, displayHeight);
   
   
    
   // restart = createSprite(500,500);
   // restart.addImage(restartimg);
   // restart.visiblity = false;


   // gameOver = createSprite(450,450);
    //gameOver.addImage(gameOverimg);
    //gameOver.visiblity = false;

    ground = createSprite(displayWidth/2,displayHeight/2);
    ground.addImage(backimg);
   ground.depth = 0;
   ground.scale = 3.5;

    cat = createSprite(displayWidth/5,displayHeight-displayHeight/6,20,50);
    cat.addImage("running_cat",catimg);
    cat.scale = 0.3;
    cat.depth = ground.depth+1;


    invisibleGround = createSprite(displayWidth/2,displayHeight-100,displayWidth*3,10);
    invisibleGround.shapeColor = "red";
    //invisibleGround.visible = false;

   obstaclesGroup = createGroup();
    
    

}
function draw(){
   background(000);  
    stroke(50);
    textSize(15);
    text("score:  ", 500,50);
    

    if (gameState===PLAY){
       
       ground.velocityX = -4;  
      score = score + Math.round(getFrameRate()/60);
    } 

    if(ground.x<400){
        ground.x = displayWidth/2 + 100;
    }
    cat.depth = ground.depth +1;
   
    
    if((keyDown("space")) && (cat.y<=800)){ 
      cat.velocityY=-12;
      console.log("space bar");
   }
    console.log(cat.y + "y");
     
     if(cat.y<400){
      cat.velocityY = 4; 
      console.log(cat.y + "= y position");
     }
     
     cat.collide(invisibleGround);

    spawnObstacles();
    KeyPressed();

    
    
    drawSprites();
}
function spawnObstacles(){
    if (frameCount % 180 === 0){
        var obstacle = createSprite(600,displayHeight-125,10,40);
        //obstacle.velocityX = -(6 + score/100);
        obstacle.velocityX = -4;
        
         //generate random obstacles
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: obstacle.addImage(holeimg);
                   break;
           case 2: obstacle.addImage(obstacle2img);
                   break;
           case 3: obstacle.addImage(puddleimg);
                   break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         obstacle.scale = 0.2;
         obstacle.lifetime = 300;
        
         
        //add each obstacle to the group
        // obstaclesGroup.add(obstacle2); 
        // obstaclesGroup.add(hole);
        // obstaclesGroup.add(puddle);
      }
     }
     function KeyPressed(){
    console.log("function called");
     

     }
     function end(){
     
      if(obstacle2.isTouching(cat)){
        gameState = END;
      } else if (gameState === END){
        ground.velocityX = 0;
        gameOver.visiblity = true;
        restart.visiblity = true;
      }
      if(puddle.isTouching(cat)){
        gameState = END;
      } else if (gameState === END){
        ground.velocityX = 0;
        gameOver.visiblity = true;
        restart.visiblity = true;
      }
      if(hole.isTouching(cat)){
        gameState = END;
      } else if (gameState === END){
        ground.velocityX = 0;
        gameOver.visiblity = true;
        restart.visiblity = true;
      }
}      

