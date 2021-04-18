//Create variables here
var dog,happyDog,database,foodS,foodStock,lastFed,fedTime,feedDog,addFood;
var foodObj;

function preload()
{
  //load images here
  dog= loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 1000);
  
  dog1 = createSprite(400,400,50,50);
  dog1.addImage(dog);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readstock);

    feed = createButton("Feed The Dog ")
    feed.position(700,95);
    feed.mousePressed(feedDog)

    addFood =  createButton("Add The Food")
    addFood.position(800,95)
    addFood.mousePressed(addFood)
  
}


function draw() {  
  background(46,139,87)

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();

  });

  drawSprites();
  //add styles here
  textSize(15);
  fill(2555,255,254);

  if(lastFed>=12 ){
    text("Last Feed :"+ lastFed%12 + "PM", 350,30)
  }else if (lastFed == 0 ){
    text("Last Feed: 12 AM")
  }else {
    text("lastFeed:"+ lastFed + "AM",350,30)
  }
  

  /*text("Number of milk bottles left :    " + foodS,100,100);
  text("note:press UP_ARROW key to feed milk to the dog",0,700);*/

}
//function to read values from DB
function readstock (data){
    foodS = data.val();
}

//function to write values in DB
function writeStock(x){
 
  if(x<=0){
    x = 0;
  }
    else {
      x = x-1 ;
    }
    database.ref("/").update({
     Food :x 
    })
}

function addFood(){
  foodS ++ ;
  database.ref('/').update({
    Food: foodS
  })

}

function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime: hour()
  })
}