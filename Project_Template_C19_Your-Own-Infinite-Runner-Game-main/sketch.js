var girl;
var evilgirlImg;
var evilgirl;
var girlImg;
var ground;
var tree1;
var tree2;
var bacground;
var score=0;
var gameover;
var gameoverImg;
var girldedImg;
var edges;
var ground;
var PLAY=1
var END=0;
 var gamestate=PLAY


function preload(){
 girlImg =loadImage ("thegirl.png");
 evilgirlImg=loadImage ("sadgirl.png");
 gameoverImg=loadImage ("gamoverrestart.png")
 tree1=loadImage ("tree1.png");
 tree2=loadImage ("tree2.png");
 bacground = loadImage ("bacground.png")


}

function setup() {
    createCanvas (1300,700)
    background=createSprite (650,350,1400,700);
    background.addImage (bacground);
    edges=createEdgeSprites ();
    girl = createSprite (50,665,20,20)
    girl.scale=0.05
    girl.addImage (girlImg);
    girl.setCollider ("circle",0,0,40);
    ground=createSprite (100,695,20000,10);
    ground.visible=false;
    ground.velocityX=-15
    gamoverrestart=createSprite(650,350,100,100);
    gamoverrestart.addImage (gameoverImg);
    gamoverrestart.visible=false;


    

}

function draw() {
    text ("score"+score,1250,10)

    if (gamestate===PLAY){
      score=score+Math.round(frameCount/200)

    if (keyDown ("space")&& (girl.y>=150)){ 
        girl.velocityY=-8

    }
   
    }


    if (gamestate===END){
        ground.velocityX=0;
        obstacles.setVelocityXEach (0);
        girl.changeImage (evilgirlImg)
        girl.velocityX=0
        girl.velocityY=0
        gamoverrestart.visible=true
    }

     if (ground.x<100){
         ground.x=1350
     }


     if (keyDown (UP_ARROW)){
         reset ();
     }

     if (keyDown (DOWN_ARROW)){
         girl.velocityY=8
     }
    

     if (girl.y<350){
         gamestate=END
     }

     if (girl.isTouching (obstacles)){
         gamestate=END;
     }


     spawnObstacles ();
     girl.collide (ground);
    drawSprites ();
 

}


function spawnObstacles (){
    if (frameCount %60==0){
        var obstacle = createSprite (1350,690,10,10);
        obstacle.velocityX=-15
        obstacle.scale=0.2
        var r= Math.round (random(1,2))
        
        switch (r){
            case 1: 
            obstacle.addImage (tree1)
            break;

            case 2:
            obstacles.addImage (tree2)
            break;
        }
      obstacles=new Group (obstacle)

    }
}

function reset (){
    gamestate=PLAY;
    obstacles.destroyEach ();
    gamoverrestart.visible=false
    girl.changeImage (girlImg);
    score=0

}