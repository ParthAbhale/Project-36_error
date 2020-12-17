var dog,dogImg,dog2Img,database,foodStock;
var Foods = 20;
var botton,bot;
var foodObj;
function preload()
{
  dogImg = loadImage("dogImg.png")
  dog2Img = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(1200, 800);
  database = firebase.database()

  foodStock = database.ref("Food")
  foodStock.on("value",function(data){
       foodStock  = data.val();
  });

  feedTime = database.ref('feedTime')
  feedTime.on("value",function(data){
    feedTime = data.val();
  });


  dog = createSprite(1000,height/2+50,10,10)
  dog.addImage(dogImg)
  dog.scale=0.2

  botton = createButton("Feed the Dog")
  botton.position(900,100)

  bot = createButton("Add Food")
  bot.position(1000,100)

  foodObj = new Food()

}


function draw() {  
 background("green")

 

 if (keyWentDown(UP_ARROW)){
   writeStocks(Foods)
  dog.addImage(dog2Img)
 } if (keyWentUp(UP_ARROW)){
  //  writeStocks(Foods)
  dog.addImage(dogImg)
 }

 if (Foods === 0){
   Foods = 20
 }

 foodObj.display();
 drawSprites();
 textSize(30)
 fill("yellow")
//  text("Food Remeaning: "+Foods,width/2-100,height/2-100)
//  text("Note: Press UP_ARROW Key To Feed Drogo Milk",width/2-350,30)
}



function writeStocks(x){
    if (x<=0){
        x=0
    }else{
      x=x-1
    }
    database.ref('/').update({
      Food:x
    })
  
}


