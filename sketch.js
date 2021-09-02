var balloon,balloonImage1,balloonImage2;
var database
var Store

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);


  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonposition = database.ref("Position")
  balloonposition.on("value",function(data){
  Store=data.val()
  console.log(Store)
  balloon.x=Store.x
  balloon.y=Store.y
  })

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown("A")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    write(-1,0)
  }
  else if(keyDown("D")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    write(1,0)
  }
  else if(keyDown("W")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   write(0,-1)
  }
  else if(keyDown("S")){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    write(0,1)
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function write(h,v) {
    database.ref("Position").update({
      x:balloon.x+h,
      y:balloon.y+v
    })
}

