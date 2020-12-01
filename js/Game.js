class Game {
  constructor(){}

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
    car1 = createSprite(200,200,100,100);
    car1.addImage(car1_img);
    car2 = createSprite(400,200,100,100);
    car2.addImage(car2_img);
    car3 = createSprite(600,200,100,100);
    car3.addImage(car3_img);
    car4 = createSprite(800,200,100,100);
    car4.addImage(car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
     // var display_position = 130;
     background(ground_img);
     image(track_img, 0, -displayHeight*4, displayWidth, displayHeight*5);
     var index = 0;
     var x = 200;
     var y = 0;
      for(var plr in allPlayers){
       index = index+1;
       x = x+200;
       y = displayHeight-allPlayers[plr].distance;
       cars[index-1].x = x;
       cars[index-1].y = y;
        if (index === player.index){
          stroke(10);
          fill("Green");
          ellipse(x,y,60,60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
      }
        else
         cars[index-1].shapeColor = "black";

         

       
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>3860){
      gameState = 2;
    }
    drawSprites();
  }
  end(){
    rectMode (CENTER);
    textSize (35);
    textFont("Times New Roman");
    fill("skyblue");
    //strokeWeight (5);
    //stroke("red");
     rect(displayWidth/2, cars[player.index-1].y+50,500,300); 
    fill("Black");
   text("Game End", displayWidth/2-80, cars[player.index-1].y+50);


  }
}
