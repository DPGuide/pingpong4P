
/*  Brew.js example for Nintendo Switch: PONG  */
// main code XorTroll ( 2 Player )
// 4 Player added by Toshiva

var sdl = require("sdl");
var game = require("game");
var input = require("input");

// This vars will hold the scores.
var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;

sdl.setFPS(60);

// This will print the score.
var text = new sdl.Text("Score", 30);
text.x(500);
text.y(300);
text.depth(1);
text.color({ R: 60, G: 60, B: 60, A: 255 });
text.show();

// We create the player 1 bar. (a rectangle)
var bar1 = new sdl.Object(__dirname + "/Bar1.png");
bar1.x(0);
bar1.y(200);
bar1.show();

// We create the player 2 bar. (a rectangle again)
var bar2 = new sdl.Object(__dirname + "/Bar2.png");
bar2.x(1208);
bar2.y(200);
bar2.show();

// We create the player 3 bar. (a rectangle again)
var bar3 = new sdl.Object(__dirname + "/Bar3.png");
bar3.y(0);
bar3.x(200);
bar3.show();

// We create the player 4 bar. (a rectangle again)
var bar4 = new sdl.Object(__dirname + "/Bar4.png");
bar4.y(646);
bar4.x(200);
bar4.show();

// We create the ball, a small square.
var ball = new sdl.Object(__dirname + "/Ball.png");
ball.usesPhysics(true);
ball.depth(1);
ball.x(640);
ball.y(360);
// We set its speeds in order to achieve a random direction to start with.
var rnd = randRange(-2, 2);
ball.vspeed(rnd);
ball.hspeed(3);
ball.show();

// The function to restart the game. It doesn't wait 1 seconds...
function restart()
{
    ball.x(1280 / 2);
    ball.y(720 / 2);
    var rnd = randRange(-1, 1);
    ball.vspeed(ball.vspeed() + rnd);
    ball.hspeed(1);
}

game.mainLoop(function()
{
    // Get held inputs: L and ZL move the left bar, while R and ZR move the right bar, Y and X move the top bar, B and A move the bottom bar
    var key = input.getHeld();
    if(key == input.L)
    {
        var cy = bar1.y();
        if(!bar1.topCollide()) bar1.y(cy - 4);
    }
    else if(key == input.ZL)
    {
        var cy = bar1.y();
        if(!bar1.bottomCollide()) bar1.y(cy + 4);
    }
    else if(key == input.R)
    {
        var cy = bar2.y();
        if(!bar2.topCollide()) bar2.y(cy - 4);
    }
    else if(key == input.ZR)
    {
        var cy = bar2.y();
        if(!bar2.bottomCollide()) bar2.y(cy + 4);
    }
	else if(key == input.Y)
    {
        var cx = bar3.x();
        if(!bar3.leftCollide()) bar3.x(cx - 4);
    }
    else if(key == input.X)
    {
        var cx = bar3.x();
        if(!bar3.rightCollide()) bar3.x(cx + 4);
    }
	else if(key == input.B)
    {
        var cx = bar4.x();
        if(!bar4.leftCollide()) bar4.x(cx - 4);
    }
    else if(key == input.A)
    {
        var cx = bar4.x();
        if(!bar4.rightCollide()) bar4.x(cx + 4);
    }
    else if(key == input.Plus) game.exitLoop();
	
    // If the ball collides with any of the bars...
    if(ball.checkCollide(bar1))
    {
        var rnd = randRange(-2, 2);
        ball.vspeed(ball.vspeed() + rnd);
        if(ball.hspeed() < 0) ball.hspeed(-ball.hspeed());
    }
    else if(ball.checkCollide(bar2))
    {
        var rnd = randRange(-2, 2);
        ball.vspeed(ball.vspeed() + rnd);
        if(ball.hspeed() > 0) ball.hspeed(-ball.hspeed());
    }
	    else if(ball.checkCollide(bar3))
    {
        var rnd = randRange(-2, 2);
        ball.vspeed(ball.vspeed() + rnd);
        if(ball.hspeed() > 0) ball.hspeed(-ball.hspeed());
    }
	    else if(ball.checkCollide(bar4))
    {
        var rnd = randRange(-2, 2);
        ball.vspeed(ball.vspeed() + rnd);
        if(ball.hspeed() > 0) ball.hspeed(-ball.hspeed());
    }
    // If the ball collides with the top part of the screen...
    else if(ball.topCollide())
    {
        p1++, p2++, p4++; 
        restart();
    }
    // If the ball collides with the left part of the screen...
    else if(ball.leftCollide())
    {
        p2++, p3++, p4++;
        restart();
    }
    // If the ball collides with the right part of the screen...
    else if(ball.rightCollide())
    {
        p1++, p3++, p4++;
        restart();
    }
	// If the ball collides with the bottom part of the screen...
    else if(ball.bottomCollide())
    {
        p1++, p2++, p3++; 
        restart();
    }
    // Update every frame the score.
    text.text("Score: " + p1 + " - " + p2 + " - " + p3 + " - " + p4);
});