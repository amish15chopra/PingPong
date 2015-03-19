  //Global vars
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  var gWidth  = 500;
  var gHeight = 500;

  var pWidth  = 15;
  var pHeight = 200;

  var    upLeftKey = 81;
  var  downLeftKey = 65;
  var   upRightKey = 79;
  var downRightKey = 76;

  //Utility fns
  function inside(paddle, point){
    return point.x >= paddle.getX()        && 
           point.x <= paddle.getX()+pWidth && 
           point.y >= paddle.getY()        && 
           point.y <= paddle.getY()+pHeight;
  }

  function colliding(paddle, ball){
    var p1 = {x: ball.getX(),    y: ball.getY()};
    var p2 = {x: ball.getX()+15, y: ball.getY()};
    var p3 = {x: ball.getX(),    y: ball.getY()+15};
    var p4 = {x: ball.getX()+15, y: ball.getY()+15};

    return inside(paddle, p1) ||
           inside(paddle, p2) ||
           inside(paddle, p3) ||
           inside(paddle, p4); 
    }

  //Classes
  var Paddle = function(inX, inY){
     var x = inX;
     var y = inY;
     var yVel = 50;

    return {
      draw: function(){
        ctx.fillStyle = "rgb(0,0,200)";
        ctx.fillRect (x , y, pWidth, pHeight);
      },

      moveUp: function(){
          ctx.clearRect(x, y, pWidth, pHeight);
          y -= yVel;
      },

      moveDown: function(){
          ctx.clearRect(x, y, pWidth, pHeight);
          y += yVel;
      },
  
      getY: function(){
        return y;
      },
      
      getX: function(){
        return x;
      }
    };
  }

  var Ball = function(inX, inY) {
    var x = inX;
    var y = inY;

    var xVel = 2;
    var yVel = 2;
    
    return {
      draw: function(){
        ctx.fillStyle  = "rgb(0,200,0)";
        ctx.fillRect(x,y,15,15);
      },

      move: function(){
        ctx.clearRect(x,y,15,15);
        x += xVel;
        y += yVel;

        if(y+15 >= gHeight || y<=0){
            yVel=-yVel;
        }
      },

      getX: function(){
        return x;
      },

      getY: function(){
        return y;
      },

      getVel: function(){
        return {x: xVel, y: yVel};
      },

      setVel: function(xIn, yIn){
        xVel=xIn;
        yVel=yIn;
      }
    }
  };


  //Paddles
  var leftP = new Paddle(0, (gHeight-pHeight)/2);
  leftP.draw();

  var rightP = new Paddle(485, (gHeight-pHeight)/2);
  rightP.draw();

  //Ball
  var b = new Ball(100, 100);
  b.draw();

  var gameLoop = setInterval(function(){ 
    if(colliding(leftP,  b) || colliding(rightP, b)){
      delX = b.getVel().x && b.getVel().x/Math.abs(b.getVel().x);
      delY = b.getVel().y && b.getVel().y/Math.abs(b.getVel().y);

      b.setVel(-(b.getVel().x + delX), b.getVel().y + delY);
    }

    if(b.getX() < 0){
      document.getElementById("end").innerHTML="Game Over!";
      document.getElementById("winner").innerHTML="Computer Wins!";
      stopGame();
    }else if(b.getX() > 500){
      document.getElementById("end").innerHTML="Game Over!";
      document.getElementById("winner").innerHTML="You win!";
      stopGame();
    }

    //Paddle AI
    if(Math.random() < 0.4){
      if(b.getY()+15 <= rightP.getY()){
        rightP.moveUp();
        rightP.draw();
      }else if(b.getY() >= rightP.getY()+pHeight){
        rightP.moveDown();
        rightP.draw();
      }
    }

    b.move();
    b.draw();
  }, 17);

  function stopGame(){
    clearInterval(gameLoop);
  }
  
  document.onkeydown = function(evt){
    if(evt.keyCode == upLeftKey){
      if(leftP.getY() >= 0){
        leftP.moveUp();
        leftP.draw();
      }
    }else if(evt.keyCode == downLeftKey){
      if(leftP.getY() <= gHeight-200){
        leftP.moveDown();
        leftP.draw();
      }
    }
    //manual controls
    /*
    if(evt.keyCode == upRightKey){
      if(rightP.getY() >= 0){
        rightP.moveUp();
        rightP.draw();
      }
    }else if(evt.keyCode == downRightKey){
      if(rightP.getY() <= gHeight-200){
        rightP.moveDown();
        rightP.draw();
      }
    }
    */
  }
  
