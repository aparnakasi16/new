class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
        
      }
    car1 = createSprite(100,200);
    car1.addImage(car1img)
    car1.scale = 0.08 
    car2 = createSprite(300,400);
    car2.addImage(car2img)
    car2.scale = 0.15
    car3 = createSprite(500,600);
    car3.addImage(car3img)
    car3.scale = 0.2
    car4 = createSprite(700,800);
    car4.addImage(car4img);
    car4.scale =0.15
   // road = createSprite(displayWidth/2,displayHeight/2);
    //road.addImage(roadimg)

   
    
   /* car1.depth = road.depth;
    car1.depth+=1;
    car2.depth = road.depth;
    car2.depth+=1;
    car3.depth = road.depth;
    car3.depth+=1;
    car4.depth = road.depth;
    car4.depth+=1;

    */
      cars = [car1,car2,car3,car4]


    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      player.getCarsAtEnd();
      
  
      if(allPlayers !== undefined){
       // background(rgb(198,135,103));
       image(roadimg,  0, -900*12.8, displayWidth, 900*15);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 50 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
           x = 200 + (index * 200) + allPlayers[plr].xPos;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
         // console.log(index, player.index)
  
        
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
     
      if (keyIsDown(37)) {
        player.xPos-=20;
          player.update();
        }
    
        if (keyIsDown(39)) {
          player.xPos+=20;
            player.update();
          }
      if(player.distance > 3020){
        gameState = 2;
        player.rank += 1
        Player.updateCarsAtEnd(player.rank)
      }

      if (frameCount % 80 === 0) {
        energy = createSprite(random(100, 1000), 200, 100, 100);
        energy.velocityY = 6;
        energy.addImage("energy",powerimg);
        energyGroup.add(energy);
        energy.scale = 0.1;
        
    }

    if(cars[index-1].isTouching(energyGroup)&& player.index !== null)
    {
      energyGroup.destroy();
    }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
    }
  }
  
  