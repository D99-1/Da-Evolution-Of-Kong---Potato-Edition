var dog,sadDog,happyDog, database;
var DeadM,M,DiddyM,DonkeyM,KK
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed

function preload(){
M=loadImage("000_96317895_gettyimages-164067218.png");
DeadM=loadImage("-000baboon-simia-hamadryas-front-white-260nw-750090535.webp.png");
DiddyM = loadImage("f29f9d7c8209798ad1e51ba8ad67ab32.png");
DonkeyM = loadImage("main.webp.png");
KK = loadImage("Ddhwmga-9e355de0-8a3e-45d8-a3e5-4f8d7c00aa1b.png");
}

function setup() {

  createCanvas(1000,400);
  database= firebase.database();
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(850,200,150,150);
  dog.addImage(M);
  dog.scale=0.15;

  //create feed the dog button here
  foodDog = createButton("Feed The Monkey")
  foodDog.position(650,95)
  foodDog.mousePressed(feedDog);

  playWDog = createButton("Play With Monkey")
  playWDog.position(900,95)
  playWDog.mousePressed(playDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
}
function draw() {
  background(46,139,87);
  foodObj.display();

  textSize(20)
  fill("white")
text("Food Stock: "+foodS,100,100)
  //write code to read fedtime value from the database 
  //changing level
 if(foodS > 1 && foodS < 5 ){
   dog.addImage(M);
   dog.scale=0.15
 }
 else if(foodS > 6 && foodS < 10){
dog.addImage(DiddyM);
dog.scale=0.15
 }
 else if(foodS > 11 && foodS < 15){
   dog.addImage(DonkeyM)
   dog.scale = 0.15
 }
 else if(foodS < 0){
   dog.addImage(DeadM)
   dog.scale= 1
 }
 else if (foodS > 16){
   dog.addImage(KK)
   dog.scale = 0.35
 }
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function playDog(){


  foodS--;
  database.ref('/').update({
    Food:foodS})

var food_stock_val = foodObj.setFoodStock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val*0)
}else{
  foodObj.updateFoodStock(food_stock_val-1)
}


}


function feedDog(){

  //write code here to update food stock and last fed time

  foodS--;
  database.ref('/').update({
    Food:foodS})

var food_stock_val = foodObj.setFoodStock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val*0)
}else{
  foodObj.updateFoodStock(food_stock_val-1)
}
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
