﻿//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
bagImage = new Image();
bagImage.src = "img/gru.png";
ctx.font = GAME_FONTS;
var arrBitGameFieldy = [];
var arrBitGameFieldx = [];
for (var i = 0; i < 481; i++) {
    arrBitGameFieldy[i] = 0;

}
for (var i = 0; i < 641; i++) {
    arrBitGameFieldx[i] = 0;

}
var bitEmpty = 0x0;	//00000000 0000000
var bitFull = 0xFFFF;	//11111111 1111111
//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
var charImage,
charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR
//charImage = {

//    x: 200,
//    y: 200
//};


var borImage = new Image();
borImage.ready = false;
borImage.onload = setAssetReady;
borImage.src = bor;
var bor2Image = new Image();
bor2Image.ready = false;
bor2Image.onload = setAssetReady;
bor2Image.src = bor;
var palsx;
var palsy;
function setAssetReady() {
    this.ready = true;
}
//Display Preloading
ctx.fillRect(0, 0, stage.width, stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, currX, currY, charX, charY, isMoving;

function preloading() {
    if (charImage.ready) {
        clearInterval(preloader);

        //Initialise game
        facing = "E"; //N = North, E = East, S = South, W = West
        isMoving = false;

        gameloop = setInterval(update, TIME_PER_FRAME);
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
    }
}

//------------
//Key Handlers
//------------
function keyDownHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    if (keyPressed == "W") {
        facing = "N";
        isMoving = true;
    }
    else if (keyPressed == "D") {
        facing = "E";
        isMoving = true;
    }
    else if (keyPressed == "S") {
        facing = "S";
        isMoving = true;
    }
    else if (keyPressed == "A") {
        facing = "W";
        isMoving = true;
    }
}

function keyUpHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    if ((keyPressed == "W") || (keyPressed == "A") ||
		(keyPressed == "S") || (keyPressed == "D")) {
        isMoving = false;
    }
}

//------------
//Game Loop
//------------
charX = CHAR_START_X;
charY = CHAR_START_Y;
CHAR_Y = charY;
CHAR_X = charX;
borcharX = borCHAR_START_X;
borcharY = borCHAR_START_Y;
POS_SPEED = 10;
currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;

borcurrX = borIMAGE_START_X;
borcurrY = borIMAGE_START_EAST_Y;

function update() {
    //Clear Canvas
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, stage.width, stage.height);

    if (isMoving) {
        if (facing == "N") {
            charY -= CHAR_SPEED;
            CHAR_Y -= POS_SPEED;
            currY = IMAGE_START_NORTH_Y;
            charImage.y -= CHAR_SPEED;

        }
        else if (facing == "E") {
            charX += CHAR_SPEED;
            CHAR_X += POS_SPEED;
            currY = IMAGE_START_EAST_Y;
            charImage.x += CHAR_SPEED;
        }
        else if (facing == "S") {

            charY += CHAR_SPEED;
            CHAR_Y += POS_SPEED;
            currY = IMAGE_START_SOUTH_Y;
            charImage.y += CHAR_SPEED;

        }
        else if (facing == "W") {
            charX -= CHAR_SPEED;
            CHAR_X -= POS_SPEED;
            currY = IMAGE_START_WEST_Y;
            charImage.x -= CHAR_SPEED;
        }

        currX += CHAR_WIDTH;

        if (currX >= SPRITE_WIDTH)
            currX = 0;
    }
    // Are they touching?


    if (arrBitGameFieldy[charY] != bitEmpty && arrBitGameFieldx[charX] != bitEmpty) {
        
            if (facing == "N") {
                charY = 150;
                charY += CHAR_SPEED;
                CHAR_Y += POS_SPEED;
                currY = IMAGE_START_SOUTH_Y;

            }
            else if (facing == "E") {
                charX = 150;
                charX -= CHAR_SPEED;
                CHAR_X -= POS_SPEED;
                currY = IMAGE_START_WEST_Y;
            }
            else if (facing == "S") {
                charY = 150;
                charY -= CHAR_SPEED;
                CHAR_Y -= POS_SPEED;
                currY = IMAGE_START_NORTH_Y;

            }
            else if (facing == "W") {
                charX = 150;
                charX += CHAR_SPEED;
                CHAR_X += POS_SPEED;
                currY = IMAGE_START_EAST_Y;

            }
        
       

    }
    else {


    }








    //Draw Image
    ctx.drawImage(bagImage, 0, 0, 640, 480, 0, 0, 640, 480);
    var pals = 0, palsII = 400;
    for (var i = 0; i < 5; i++) {
        ctx.drawImage(borImage, borcurrX, borcurrY, bor_width, bor_height, pals, borcharY, bor_width, bor_height);
        y = borcharY;
        x = pals;
        pals = pals + 50;       
            arrBitGameFieldy[y] = arrBitGameFieldy[y] | (1 << x);
        
        for(var j = x; j <= pals; j++)
        {
            arrBitGameFieldx[j] = arrBitGameFieldx[x] | (1 << y);
        
        }

    }
    
    for (var i = 0; i < 5; i++) {
        ctx.drawImage(bor2Image, borcurrX, borcurrY, bor_width, bor_height, palsII, borcharY, bor_width, bor_height);
        y = borcharY;
        x = palsII;
        palsII = palsII + 50;        
            arrBitGameFieldy[y] = arrBitGameFieldy[y] | (1 << x);        
        if (x == 400) {
            for (var j = 350; j <= palsII; j++) {
                arrBitGameFieldx[j] = arrBitGameFieldx[x] | (1 << y);

            }
        }
        else {
            for (var j = x; j <= palsII; j++) {
                arrBitGameFieldx[j] = arrBitGameFieldx[x] | (1 << y);

            }
        }

    }


    ctx.drawImage(charImage, currX, currY, CHAR_WIDTH, CHAR_HEIGHT,
					charX, charY, CHAR_WIDTH, CHAR_HEIGHT);



}






