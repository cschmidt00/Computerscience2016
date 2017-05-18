var myCanvas = document.getElementById("myCanvas");
var i;
var player = {
    x:myCanvas.width/2,
    y:500,
    width:15,
    height:15,
    score:0
};
var points=[{
    x:Math.floor((Math.random() * 480) + 1),
    y:-25,
    width:10,
    height:10,
    speed: 2
}];
var enemy=[{
    x:Math.floor((Math.random() * 480) + 1),
    y:Math.floor(Math.random() * 30) -100,
    width:30,
    height:30,
    speed:3
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:Math.floor((Math.random() * 30) -100),
    width:30,
    height:30,
    speed:3
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:Math.floor((Math.random() * 30) -100),
    width:30,
    height:30,
    speed:3
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:Math.floor((Math.random() * 30) -100),
    width:30,
    height:30,
    speed:3
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:Math.floor((Math.random() * 30) -100),
    width:30,
    height:30,
    speed:3
}];
var ctx = myCanvas.getContext("2d");
var keys=[];
var isalive=true;
console.log(player.x);
console.log(player.x);
update();
function update(){
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    
    //localstorage for scoreboard
var scoreboard = localStorage.getItem("scoreboard");
        if (player.score >= scoreboard) {
            localStorage.setItem("scoreboard", player.score);      
      }



//This checks to see if the enemy touches the bottom and moves them back uptop 
    for(i=0;i<enemy.length;i++){
        if(enemy[i].y>=myCanvas.height){
            enemy[i].y=Math.floor(Math.random() * 200) -300;
            enemy[i].x= Math.floor((Math.random() * 480) + 1);
        }
        
//Same as above, for the sides of the canvas
        if(enemy[i].x>480 || enemy[i].x<0){
            enemy[i].y=Math.floor(Math.random() * 200) -300;
            enemy[i].x= Math.floor((Math.random() * 480) + 1);
        }
//This checks if the player touches the enemy and sets isalive to false if its true
        if(colCheck(enemy[i],player)){
            isalive=false;
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
            ctx.fillStyle ="White";
            ctx.font = "60px Arial";
            ctx.fillText("Game Over!",myCanvas.width/5,myCanvas.height/8);
            ctx.font = "40px Arial";
            ctx.fillText("Score: " + player.score , myCanvas.width/5, myCanvas.height/3);
            ctx.font = "40px Arial";
            ctx.fillText("Highscore: " + scoreboard , myCanvas.width/5, myCanvas.height/2);
            document.getElementById("respawn").style.top = "450px";
        }
        enemy[i].y+=enemy[i].speed;
        ctx.fillStyle="red";
        ctx.fillRect(enemy[i].x,enemy[i].y,enemy[i].width,enemy[i].height)
    }
    
    //collision check between player and points, adds 1 score
    for(i=0;i<points.length;i++){
        if(colCheck(points[i], player)){
            points[i].y=-25;
            points[i].x= Math.floor((Math.random() * 480) + 1);
            player.score+=1;
        }
    }
    //checks to see if the points go off the bottom of the canvas and -3 score 
    for(i=0;i<points.length;i++){
        if(points[i].y>=myCanvas.height){
            points[i].y=-255;
            points[i].x= Math.floor((Math.random() * 480) + 3);
            player.score-=1;
        }
            ctx.fillStyle ="White";
            ctx.font = "20px Arial";
            ctx.fillText("Score: "+player.score, myCanvas.width/20, 20);
        points[i].y+=points[i].speed;
         ctx.fillStyle="#7CFC00";
        ctx.fillRect(points[i].x,points[i].y,points[i].width,points[i].height);
    }
    //once your at 5points the enemies speed up
    for(i=0;i<enemy.length;i++){
        if(player.score>=5){
            enemy[i].speed=4;
        }
    }
    //once your at 10points 2 enemies start coming slanted and speed up
    for(i=0;i<enemy.length;i++){
        if(player.score>=10){
            enemy[i].speed=5;
            enemy[2].x+=0.1;
            enemy[1].x+=-0.1;
        }
    }
    //at 15 points the enemies move faster
    for(i=0;i<enemy.length;i++){
        if(player.score>=15){
            enemy[i].speed=6;
        }
    }
    //at 20points 2 more enemies start to go slanted and go even faster
    for(i=0;i<enemy.length;i++){
        if(player.score>=20){
            enemy[i].speed=7;
            enemy[3].x+=0.1;
            enemy[4].x+=-0.1;
        }
    }
    //at 25points the enemies speed up yet again
    for(i=0;i<enemy.length;i++){
        if(player.score>=25){
            enemy[i].speed=8;
        }
    }
    //at 30points the enemies speed up yet again
    for(i=0;i<enemy.length;i++){
        if(player.score>=30){
            enemy[i].speed=9;
        }
    }
    //at 35points the enemies speed up yet again
    for(i=0;i<enemy.length;i++){
        if(player.score>=35){
            enemy[i].speed=10;
        }
    }
    if(keys[87]&&!colCheck(player,enemy)&&player.y>0){
        console.log(player.y);
        player.y-=4;
        console.log(player.y);
    }
     if(keys[83]&&!colCheck(player,enemy)&&player.y<myCanvas.height-15){
         console.log(player.y);
        player.y+=4;
        console.log(player.y);
    }
     if(keys[65]&&!colCheck(player,enemy)&&player.x>0){
        console.log(player.x);
        player.x-=4;
        console.log(player.x);
    }
    if(keys[68]&&!colCheck(player,enemy)&&player.x<myCanvas.width-15){
        console.log(player.x);
        player.x+=4;
        console.log(player.x);
    }
    if(keys[38]&&!colCheck(player,enemy)&&player.y>0){
        console.log(player.y);
        player.y-=4;
        console.log(player.y);
    }
     if(keys[40]&&!colCheck(player,enemy)&&player.y<myCanvas.height-15){
         console.log(player.y);
        player.y+=4;
        console.log(player.y);
    }
     if(keys[37]&&!colCheck(player,enemy)&&player.x>0){
        console.log(player.x);
        player.x-=4;
        console.log(player.x);
    }
    if(keys[39]&&!colCheck(player,enemy)&&player.x<myCanvas.width-15){
        console.log(player.x);
        player.x+=4;
        console.log(player.x);
    }
    
    console.log(player);
     ctx.fillStyle="blue";
    ctx.fillRect(player.x,player.y,player.width,player.height);
    if(isalive){
    window.requestAnimationFrame(update);
    }else{
        ctx.fillStyle ="black";
        ctx.fillRect(20, 3, myCanvas.width/4, myCanvas.height/20);
    }
}
function colCheck(shapeA, shapeB) {
    console.log("checking col");
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = false;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = true;
                shapeA.y += oY;
            } else {
                colDir = true;
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = true;
                shapeA.x += oX;
            } else {
                colDir = true;
                shapeA.x -= oX;
            }
        }
    }
//     console.log(colDir)
    return colDir;
}


document.body.addEventListener("keydown",function(e){
    keys[e.keyCode]=true;
});
document.body.addEventListener("keyup",function(e){
    keys[e.keyCode]=false;
});







