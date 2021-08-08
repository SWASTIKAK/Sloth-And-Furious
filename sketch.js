var bgImg;
var hang,hangImg1,hangImg2;
var bg;
var leaves,leaves2;
var leavesImg1, leavesImg2, leavesImg3, leavesImg4;
var sloth,slothImg;
var jaguar, jaguarImg;
var branch1, branch2, branch3, branch3; 
var branchImg1, branchImg2, branchImg3;
var gameState = "start";
var score= 30;


//Function to preload necessary Images
function preload(){
  
   bgImg = loadImage("bg3.png");
   hangImg1 = loadImage("EtcImages/hang1.png");
   leavesImg1 = loadImage("EtcImages/leaf1left.png");
   //leavesImg2 = loadImage("EtcImages/leaf1right.png");
   //leavesImg3 = loadImage("EtcImages/leaf2left.png");
   leavesImg4 = loadImage("EtcImages/leaf2right.png");
   //jaguarImg = loadImage("jaguar.png");
   slothImg = loadImage("sloth2right.png");
   sloth2Img = loadImage("sloth4.png");
   branchImg1 = loadImage("branch1right.png");
   branchImg3 = loadImage("branch2.png");
   branchImg2 = loadImage("branch3.png");
   branchImg4 = loadImage("branch1left.png");
   snakeImg = loadImage("sanke.png");
   eagleImg = loadImage("eagle.png");
   backImg = loadImage("back.jpg");
   parentImg = loadImage("parents.png");
   sound = loadSound("yay.mp3");
   sound1 = loadSound("sound.mp3");

  } 
  
//Function to set initial environment
function setup() {
  createCanvas(700, 900);

  sound1.loop();
  
  bg = createSprite(530,80);
  bg.addImage("background", bgImg);
  bg.scale = 1.2;
  bg.velocityY = 5;

  sloth = createSprite(170,200);
  sloth.addImage("sloth",slothImg );
  sloth.scale = 0.6;
 // sloth.debug = true;
  sloth.setCollider("circle",-10,0,125);

  hang = createSprite(350,140,20,20);
  hang.addImage("leaves", hangImg1);
  hang.scale = 1.2;
  hang.visible = false;
  
  leaves2 = createSprite(504,690);
  leaves2.addImage("bushes",leavesImg4);
  leaves2.visible = false;

  leaves = createSprite(214,725);
  leaves.addImage("bushes",leavesImg1);
  leaves.visible = false;



  /*jaguar = createSprite(444,370);
  jaguar.addImage("jaguar",jaguarImg);
  jaguar.scale = 0.6;

  branch1 = createSprite(64,550);
  branch1.addImage("branches",branchImg1);

  branch2 = createSprite(514,480);
  branch2.addImage("branches",branchImg2);
  branch2.scale = 0.7;

  branch3 = createSprite(44,320);
  branch3.addImage("branches",branchImg3);
  branch3.scale = 0.7;*/

  branchesGroup = new Group();
  obstaclesGroup = new Group();

 
  
}

//Function to display UI
function draw() {
  background("white");
  

  if(bg.y > 680){
    bg.y = 550;}
  
 
  if(gameState === "start"){
    background(backImg);

    

    frameCount = 0;
    bg.y = 80;
     fill("white");
     textSize(80);
     text("Sloth And Furious",30,220)

     fill("black");
     textSize(30);
     text("Dear Player, ",10,350);

     fill("black");
     textSize(30);
     text("You must help The baby sloth reuntie with her ",10,400);

     fill("black")
     textSize(30);
     text("parents at the top of the woods.Use your arrow keys and avoid the obsctacles.",10,430);

     fill("black");
     textSize(30);
     text("and avoid the obsctacles.You can take a rest at the",10,460);

     fill("black");
     textSize(30);
     text("normal branches but not for too long,",10,490);

     fill("white");
     textSize(36);
     text("ALL THE BEST!!",20,560);
 
     
     fill("white");
     textSize(40);
     text("Press Space to Start", 150, 730);
     
     bg.visible = false;
     sloth.visible = false;
     
  }
  if(keyDown("space")){
    gameState = "play";
  }
  
  
if(gameState === "play"){
  
   
  

   bg.visible = true;
   sloth.visible = true;

  if(keyDown("left_arrow")){
     sloth.x = sloth.x - 5;
     sloth.addImage("sloth",slothImg );
     sloth.scale = 0.6;
  }

  if(keyDown("right_arrow")){
      sloth.x = sloth.x + 5;
      sloth.addImage("sloth",slothImg );
      sloth.scale = 0.6;
  }
  
  if(keyDown("up_arrow")){
      sloth.velocityY = -5;
      sloth.addImage("sloth",slothImg );
      sloth.scale = 0.6;
  }

  sloth.velocityY = sloth.velocityY + 0.8;

  if(frameCount%25===0 && frameCount>165){
    score = score - 1;
  }


  spawnBranches();
  spawnObstacles();
  console.log(frameCount);

  if(branchesGroup.isTouching(sloth)){
    sloth.addImage("sloth", sloth2Img);
    sloth.setVelocity(0,0);
    sloth.scale = 0.5;
  }

  if(frameCount === 1035){
    gameState = "win";
    obstaclesGroup.destroyEach();

  }
 
  if(gameState === "win"){
    bg.velocityY = 0;
    branchesGroup.velocityY = 0;
    sloth.setVelocity(0,0);
    var parents = createSprite(320,450,100,100);
    parents.addImage("parents",parentImg);
    parents.scale = 0.5;
    score = 0;
    sloth.visible = false;
    hang.visible = true;
    leaves.visible = true;
    leaves2.visible = true;
    sound.play();
    
    
    //background(bg2Img);

  }

  
   
  

  if(obstaclesGroup.isTouching(sloth)||sloth.y>901){
    sloth.visisble = false;
    gameState = "end";
    reset();
  }

 }

  drawSprites();

  textSize(30);
  fill("black");
  text("Branches Left :"+score, 420,40);
 
  if(gameState==="win"){
     textSize(35);
     fill("black");
     text("Thakyou for reuniting ",190,630);
     text("the sloth with her parents. ",150,660);
  }
  
  
}

function reset(){
  score = 30 ;
  gameState = "start";
  obstaclesGroup.destroyEach();
  branchesGroup.destroyEach();
  sloth.x = 170;
  sloth.y = 200;
  //sloth.visible = true;
  
}

function spawnBranches(){

    if(frameCount%161 === 0){
       var branches = createSprite(random(620,630),-50,80,10);
       branches.velocityY = 4;
      // branches.debug = true;
       branches.setCollider("rectangle",10,10,400,10);
     //  branches.scale = 1.2

       var rand = Math.round(random(1,2));
       switch(rand){
        case 1: branches.addImage(branchImg1);
               break;
        case 2: branches.addImage(branchImg2);
               break;
       default: break;

       

      }
      branchesGroup.add(branches);
    }

    if(frameCount%302 === 0){
        var branches1 = createSprite(random(130,140),-50,80,10);
        branches1.velocityY = 4;
       // branches1.debug = true;
        branches1.setCollider("rectangle",0,0,400,10);
       //branches1.scale = 1.2
 
        var rand = Math.round(random(1,2));
        switch(rand){
         case 1: branches1.addImage(branchImg4);
                break;
         case 2: branches1.addImage(branchImg3);
                 break;
        default: break;
        
      }
      branchesGroup.add(branches1);
    }
    
}

function spawnObstacles(){
   if(frameCount%200 === 0){
     var obstacles1 = createSprite(random(120,130),-50, 80, 10)
     obstacles1.addImage("snake", snakeImg);
     //obstacles1.debug = true;
     obstacles1.velocityY = 4;
     obstacles1.scale = 0.3
     obstacles1.setCollider("rectangle",0,0,960,10);
     obstaclesGroup.add(obstacles1);
     
   }
   if(frameCount%273 === 0){
    var obstacles2 = createSprite(random(610,620),-50, 80, 10)
    obstacles2.addImage("eagle", eagleImg);
   // obstacles2.debug = true;
    obstacles2.velocityY = 4;
    obstacles2.scale = 0.3;
    obstaclesGroup.add(obstacles2);
    obstacles2.setCollider("rectangle",0,0,1200,10);
}
  }
  
  