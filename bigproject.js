var myCanvas = document.getElementById("myCanvas");
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
    y:-30,
    width:30,
    height:30,
    speed:Math.floor((Math.random() * 4) + 3),
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:-30,
    width:30,
    height:30,
    speed:Math.floor((Math.random() * 4) + 3),
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:-30,
    width:30,
    height:30,
    speed:Math.floor((Math.random() * 4) + 3),
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:-30,
    width:30,
    height:30,
    speed:Math.floor((Math.random() * 4) + 3),
},{
    x:Math.floor((Math.random() * 480) + 1),
    y:-15,
    width:30,
    height:30,
    speed:Math.floor((Math.random() * 4) + 3),
}];
var ctx = myCanvas.getContext("2d");
var keys=[];
var isalive=true;
console.log(player.x);
console.log(player.x);
update();
function update(){
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    // console.log("Is w being pressed?: " + keys[87])
    // console.log("Is a being pressed?: " + keys[65])
    // console.log("Is d being pressed?: " + keys[68])
    // console.log("Is s being pressed?: " + keys[83])
    for(i=0;i<enemy.length;i++){
        if(enemy[i].y>=myCanvas.height){
            enemy[i].y=-30;
            enemy[i].x= Math.floor((Math.random() * 480) + 1);
        }
        if(colCheck(enemy[i],player)){
            isalive=false;
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
            ctx.fillStyle ="White";
            ctx.font = "60px Arial";
            ctx.fillText("Game Over!  ",myCanvas.width/5,myCanvas.height/4);
            ctx.font = "40px Arial";
            ctx.fillText("Score: " + player.score , myCanvas.width/5, myCanvas.height/2);
            document.getElementById("respawn").style.top = "450px";
        }
        enemy[i].y+=enemy[i].speed;
        ctx.fillStyle="red";
        ctx.fillRect(enemy[i].x,enemy[i].y,enemy[i].width,enemy[i].height)
    }
    for(i=0;i<points.length;i++){
        if(colCheck(points[i], player)){
            points[i].y=-25;
            points[i].x= Math.floor((Math.random() * 480) + 1);
            player.score+=1;
        }
    }
    for(i=0;i<points.length;i++){
        if(points[i].y>=myCanvas.height){
            points[i].y=-255;
            points[i].x= Math.floor((Math.random() * 480) + 1);
            player.score-=1;
        }
            ctx.fillStyle ="White";
            ctx.font = "20px Arial";
            ctx.fillText("Score: "+player.score, myCanvas.width/20, 20);
        points[i].y+=points[i].speed;
         ctx.fillStyle="#7CFC00";
        ctx.fillRect(points[i].x,points[i].y,points[i].width,points[i].height)
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