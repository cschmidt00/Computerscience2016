var myCanvas = document.getElementById("myCanvas");
var i;
var localStorage;
var player = {
    x: myCanvas.width / 2,
    y: 500,
    width: 15,
    height: 15,
    score: 0,
    lifes: 3,
};
var points = [{
    x: Math.floor((Math.random() * 470)),
    y: -25,
    width: 10,
    height: 10,
    speed: 2.25
}];
//This is my enemy array. The first 2 are the enemies you see at the start of the game. The other enemies have their speed set
//to 0 theirfor they stay off the canvas until the player gets to a certain score. their x and y values are randomized
//the y value randomizes a number between 1-150 and subtracts 200 to get the y value(always negative), the x value is just somewhere between 1-470
var enemy = [{
    x: Math.floor((Math.random() * 470)),
    y: Math.floor((Math.random() * 150) - 200),
    width: 30,
    height: 30,
    speed: 4,
}, {
    x: Math.floor((Math.random() * 470)),
    y: Math.floor((Math.random() * 150) - 200),
    width: 30,
    height: 30,
    speed: 4,
}, {
    x: Math.floor((Math.random() * 470)),
    y: Math.floor((Math.random() * 150) - 200),
    width: 30,
    height: 30,
    speed: 0,
}, {
    x: Math.floor((Math.random() * 470)),
    y: Math.floor((Math.random() * 150) - 200),
    width: 30,
    height: 30,
    speed: 0,
}, {
    x: Math.floor((Math.random() * 470)),
    y: Math.floor((Math.random() * 150) - 200),
    width: 30,
    height: 30,
    speed: 0,
}, {
    x: Math.floor((Math.random() * 470)),
    y: Math.floor((Math.random() * 150) - 200),
    width: 30,
    height: 30,
    speed: 0,
}];
var ctx = myCanvas.getContext("2d");
var keys = [];
var isalive = true;
console.log(player.x);
console.log(player.x);
update();

function update() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    //localstorage for the highscore, it checks if my players score is greater than the current highscore and if so it sets my
    //players score to the highscore
    var highscore = localStorage.getItem("topscore");
    if (player.score >= highscore) {
        localStorage.setItem("topscore", player.score);
    }
    //This checks to see if the enemy touches the bottom and moves them back uptop 
    for (i = 0; i < enemy.length; i++) {
        if (enemy[i].y >= myCanvas.height) {
            enemy[i].y = Math.floor((Math.random() * 150) - 200),
                enemy[i].x = Math.floor((Math.random() * 470));
        }

        //Same as above, for the sides of the canvas
        //if enemy's x value is more than 470 or less than 0 (my canvas is 500px wide) it will set their y to a 
        //number between 1-60 and subtract 100, giving you a negative y value so they come from offscreen.
        //Their x value is randomized so they come down from random spots
        if (enemy[i].x > 470 || enemy[i].x < 0) {
            enemy[i].y = Math.floor((Math.random() * 150) - 200),
                enemy[i].x = Math.floor((Math.random() * 470));
        }
        //This checks if the player touches the enemy and sets isalive to false if its true
        //This piece of cosealso writes gameover, the players score, and the highscore
        if (colCheck(enemy[i], player)) {
            isalive = false;
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            ctx.fillStyle = "White";
            ctx.font = "60px Arial";
            ctx.fillText("Game Over!", myCanvas.width / 5, myCanvas.height / 8);
            ctx.font = "40px Arial";
            ctx.fillText("Score: " + player.score, myCanvas.width / 5, myCanvas.height / 3);
            ctx.font = "40px Arial";
            ctx.fillText("Highscore: " + highscore, myCanvas.width / 5, myCanvas.height / 2);
            document.getElementById("respawn").style.top = "450px";
        }
        enemy[i].y += enemy[i].speed;
        ctx.fillStyle = "red";
        ctx.fillRect(enemy[i].x, enemy[i].y, enemy[i].width, enemy[i].height);
    }
    //collision check between player and points, adds 1 score and resets the point
    for (i = 0; i < points.length; i++) {
        if (colCheck(points[i], player)) {
            points[i].y = -25;
            points[i].x = Math.floor((Math.random() * 470));
            player.score += 1;
        }
    }
    //checks to see if the points go off the bottom of the canvas and -1 lives
    //resets the points to the top and randomizes x and y value
    for (i = 0; i < points.length; i++) {
        if (points[i].y >= myCanvas.height) {
            points[i].y = -25;
            points[i].x = Math.floor((Math.random() * 470));
            player.lifes -= 1;
        }
        ctx.fillStyle = "White";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + player.score, myCanvas.width / 20, 20);
        ctx.fillText("lifes: " + player.lifes, myCanvas.width / 20, 60);
        points[i].y += points[i].speed;
        ctx.fillStyle = "#7CFC00";
        ctx.fillRect(points[i].x, points[i].y, points[i].width, points[i].height);
    }
    for (i = 0; i < enemy.length; i++) {
        //if you have less than or equal to 0 lives it sets isalive to false, killing the player
        if (player.lifes <= 0) {
            isalive = false;
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            ctx.fillStyle = "White";
            ctx.font = "60px Arial";
            ctx.fillText("Game Over!", myCanvas.width / 5, myCanvas.height / 8);
            ctx.fillText("Score: " + player.score, myCanvas.width / 5, myCanvas.height / 3);
            ctx.font = "40px Arial";
            ctx.font = "40px Arial";
            ctx.fillText("Highscore: " + highscore, myCanvas.width / 5, myCanvas.height / 2);
            document.getElementById("respawn").style.top = "450px";
        }
        //If the players score gets to 5, it speeds up 2 of the enemies and makes 2 of them start to move.
        //before this point there are only 2 enemies with movement
        if (player.score >= 5) {
            enemy[0].speed = 4.75;
            enemy[1].speed = 4.75;
            enemy[2].speed = 4.75;
            enemy[3].speed = 4.75;
        }
        //once the player has 10 points 2 enemies move diagonally, it makes all of the currently 
        if (player.score >= 10) {
            enemy[0].x += 0.1;
            enemy[1].x += -0.1;
            enemy[0].speed = 5.5;
            enemy[1].speed = 5.5;
            enemy[2].speed = 5.5;
            enemy[3].speed = 5.5;
        }
        //once the player has 15 points the bots move even faster
        if (player.score >= 15) {
            enemy[0].speed = 6.25;
            enemy[1].speed = 6.25;
            enemy[2].speed = 6.25;
            enemy[3].speed = 6.25;
        }
        //once the player has 20 points the last 2 enemies start to move and 2 more enemies move diagonally
        if (player.score >= 20) {
            enemy[i].speed = 7;
            enemy[2].x += 0.1;
            enemy[3].x += -0.1;
        }
        // at 25 points the enemies all move quicker
        if (player.score >= 25) {
            enemy[i].speed = 7.75;
        }
        //at 30 points the last 2 enemies move diagonally and the enemies all speed up again
        if (player.score >= 30) {
            enemy[i].speed = 8;
            enemy[4].x += 0.2;
            enemy[5].x += -0.2;
        }
    }

    //This allows my player to move up down left and right with arrow keys/wasd
    if (keys[87] && !colCheck(player, enemy) && player.y > 0) {
        console.log(player.y);
        player.y -= 4;
        console.log(player.y);
    }
    if (keys[83] && !colCheck(player, enemy) && player.y < myCanvas.height - 15) {
        console.log(player.y);
        player.y += 4;
        console.log(player.y);
    }
    if (keys[65] && !colCheck(player, enemy) && player.x > 0) {
        console.log(player.x);
        player.x -= 4;
        console.log(player.x);
    }
    if (keys[68] && !colCheck(player, enemy) && player.x < myCanvas.width - 15) {
        console.log(player.x);
        player.x += 4;
        console.log(player.x);
    }
    if (keys[38] && !colCheck(player, enemy) && player.y > 0) {
        console.log(player.y);
        player.y -= 4;
        console.log(player.y);
    }
    if (keys[40] && !colCheck(player, enemy) && player.y < myCanvas.height - 15) {
        console.log(player.y);
        player.y += 4;
        console.log(player.y);
    }
    if (keys[37] && !colCheck(player, enemy) && player.x > 0) {
        console.log(player.x);
        player.x -= 4;
        console.log(player.x);
    }
    if (keys[39] && !colCheck(player, enemy) && player.x < myCanvas.width - 15) {
        console.log(player.x);
        player.x += 4;
        console.log(player.x);
    }

    console.log(player);
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    if (isalive) {
        window.requestAnimationFrame(update);
    }
    else {
        ctx.fillStyle = "black";
        ctx.fillRect(20, 3, myCanvas.width / 4, myCanvas.height / 20);
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
            }
            else {
                colDir = true;
                shapeA.y -= oY;
            }
        }
        else {
            if (vX > 0) {
                colDir = true;
                shapeA.x += oX;
            }
            else {
                colDir = true;
                shapeA.x -= oX;
            }
        }
    }
    //     console.log(colDir)
    return colDir;
}
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});
//--github info--
//cschmidt00
//comp