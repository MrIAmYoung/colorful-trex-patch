//variables for trex animation and sprite
  var trex, trex_running, trex_collided;

//variables for ground image and sprite
  var ground, invisibleGround, groundImage;

//variable for cloud
  var cloud, cloundImage,cloudGroup;

//variable for birds
var bird, birdImage,birdGroup;
  
//variable for obsticles
  var obsticle, obsticleImage1, obsticleImage2, obsticleImage3, obsticleImage4, obsticleImage5, obsticleImage6,obsticleGroup;

//variable for score
   var score=0;

//variable for sounds
   var die,checkPoint,jump;

//variable for gameover and restart button
var gameOver,restart;
var gmImage,restartImage;

//variables for the gamestates
  var PLAY=1;
  var END=0;
  var gamestate=PLAY;

//variables for night and day
var bgColor="powderblue";
//loads all images/animations and sounds
  function preload()
  {
    //trex
      trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
      trex_collided = loadImage("trex_collided.png");
    
    //ground
      groundImage = loadImage("ground2.png");
    
    //cloud
      cloudImage = loadImage("cloud.png");
    
    //obsticles
    obsticleImage1 = loadImage("obstacle1.png");
    obsticleImage2 = loadImage("obstacle2.png");
    obsticleImage3 = loadImage("obstacle3.png");
    obsticleImage4 = loadImage("obstacle4.png");
    obsticleImage5 = loadImage("obstacle5.png");
    obsticleImage6 = loadImage("obstacle6.png");
    
    //birds
    birdImage = loadAnimation("bird1.png", "bird2.png");
    
    //gameover and restart button
    gmImage = loadImage("gameOver.png");
    restartImage = loadImage("restart.png");
    
    //sounds
    //checkPoint = loadSound("checkPoint.mp3");
    //die = loadSound("die.mp3");
   //jump = loadSound("jump.mp3");
    
  }

//setup the sprites
  function setup() 
  {
    createCanvas(windowWidth,windowHeight);

    //create a trex sprite
      trex = createSprite(50,windowHeight/2+90,20,50);
      trex.debug=false;
      trex.addAnimation("running", trex_running);
      trex.addAnimation("collided",trex_collided);
      trex.scale = 0.5;
      
    trex.setCollider("rectangle",0,-5,50,80,40);

    //create a ground sprite
      ground = createSprite(200,windowHeight/2+80,400,20);
      ground.addImage("ground",groundImage);
      ground.x = ground.width /2;
      
    
    
    invisibleGround=createSprite(200,windowHeight/2+100,400,20);
    invisibleGround.visible=false;
    
    
    //create obstacle cloud and bird groups
    obsticleGroup=createGroup();
    cloudGroup=createGroup();
    birdGroup=createGroup();
    
    //create gameover and restart button sprites
    gameOver=createSprite(windowWidth/2,windowHeight/2-50,100,20);
    gameOver.addImage("gameOver",gmImage);
    gameOver.visible=false;
    gameOver.scale=0.5;
    restart=createSprite(windowWidth/2,windowHeight/2,20,20); 
    restart.addImage("restart",restartImage);
    restart.visible=false;
    restart.scale=0.5;
  }

//draw the code for conditions
function draw()
  {
  
  background(bgColor);
    fill(11,15,42);
  text("score:"+score,windowWidth/2,50);
  //gamestates
    if (gamestate===PLAY)
      {
       score=score+Math.round((getFrameRate()/60));
        
         //jump when the space button is pressed
    if (touches.length>0 || keyDown("space") && trex.y>=windowHeight/2+48)  
      {
        //jump.play();
        trex.velocityY = -10;
        touches=[];
      }
    
    if (score % 100===0)
      bgColor=11,15,42;
      if (score % 200===0)
        bgColor="powderblue";
     
    
        
    if (score>0 && score % 100===0){
      //checkPoint.play();
      console.log(ground.velocityX);
    }
        //code for gravity
  trex.velocityY = trex.velocityY + 0.75
        
        //ground velocity
        ground.velocityX = -(12+score/100);
        
        //resets the ground
    if (ground.x < 0)  
      {
        ground.x = ground.width / 2;
      }
        
        spamClouds();
        spamObstacles();
        
        if (score>100){
          spamBirds();
        }
        
        if (trex.isTouching(obsticleGroup)||trex.isTouching(birdGroup))
          {
            //die.play();
            gamestate=END;
          }
      }
    else if (gamestate===END)
      {
      ground.velocityX=0;
      trex.velocityY=0;
      trex.changeAnimation("collided");
      restart.visible=true;
      gameOver.visible=true;
      obsticleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      birdGroup.setVelocityXEach(0);
      obsticleGroup.setLifetimeEach(-1);
      cloudGroup.setLifetimeEach(-1);
      birdGroup.setLifetimeEach(-1);
        
        if (touches.length>0 || mousePressedOver(restart))
          {
            
          restartGame();
          touches=[];
          }
      }
    

  trex.collide(invisibleGround);
  
  drawSprites();
  
}

//spam clouds
function spamClouds()
  {
    //if framecount make cloud
      if (frameCount % 60 ===0)
        {
          cloud=createSprite(600,100,50,20);
          cloud.addImage(cloudImage);
          cloud.scale=0.5;
          cloud.y=random(windowHeight/2,windowHeight/2+30);
          cloud.velocityX=-5;
          
          cloud.depth=trex.depth;
          trex.depth=trex.depth+1;
          cloud.lifetime=120;
          
          cloudGroup.add(cloud);
        }
  }

//spam obstacles
function spamObstacles()
  {
    //if framecount make obstacle
      if (frameCount % 80 ===0)
        {
          obsticle=createSprite(600,windowHeight/2+65,20,50);
          obsticle.debug=false;
          obsticle.velocityX=-(12+score/100);
          var r=Math.round(random(1,6));
          switch(r)
            {
            case 1:obsticle.addImage(obsticleImage1);
                break;
            case 2:obsticle.addImage(obsticleImage2);
                break
            case 3:obsticle.addImage(obsticleImage3);
                break;
            case 4:obsticle.addImage(obsticleImage4);
                break;
            case 5:obsticle.addImage(obsticleImage5);
                break;
            case 6:obsticle.addImage(obsticleImage6);
                break;
            default:break;
            }
          obsticle.scale=0.5;
          obsticle.lifetime=50;
          obsticle.depth=trex.depth;
          trex.depth=trex.depth+1;
          obsticleGroup.add(obsticle);
        }

  }

//spam birds
function spamBirds()
{
  if (frameCount % 100 ===0) 
  {
  bird=createSprite(600,100,50,20);
  bird.addAnimation("bird",birdImage);
  bird.scale=0.05;
  bird.y=random(windowHeight/2,windowHeight/2+53);
  bird.velocityX=-(13+score/100);
    birdGroup.add(bird);
    bird.depth=trex.depth;
    trex.depth=trex.depth+1;
    bird.lifetime=50;
  }
}
//restart after gameover
function restartGame()
{
  obsticleGroup.destroyEach();
  cloudGroup.destroyEach();
  birdGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  gamestate=PLAY;
  trex.x=50;
  trex.y=windowHeight/2+100;
  trex.changeAnimation("running");
  score=0;
}