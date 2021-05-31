/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;
var levels = 0;

const EERSTELEVEL = 0;
const TWEEDELEVEL = 1;
const DERDELEVEL  = 2;
var level = EERSTELEVEL;

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const SPACEBAR = 32;

var spelerX = 100; // x-positie van speler
var spelerY = 500; // y-positie van speler
var spawnX = 100;
var spawnY = 500;

var platformSpeedY = [2, 2, 2, 2];
var platformSpeedX = [2, 2, 2, 2];

var platformX = [[50, 300, 550, 800, 1050], 
                 [300, 600]];

var platformY = [[500, 500, 500, 500, 500], 
                 [300, 600]];

var damagePlatformX = [[175, 425, 675, 925], [50]];
var damagePlatformY = [[250, 250, 250, 250], [50]];

var puntenX = [[300, 550, 800, 400, 700], [700]];
var puntenY = [[450, 450, 450, 600, 200], [700]];

var regenX = [300, 756, 600, 300, 200, 456, 784, 0, 0, 0, 0, 0 ,0 ,0 , 0];
var regenY = [100, 100, 100, 100, 100, 100, 100, 400, 400, 400, 400, 400, 400, 400];

var platformHoogte = 50;
var platformBreedte = 100;
var platformSize = [50, 100, 200, 400];


var spelerSize = 25;
var hp = 5; // levens speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 300;   // x-positie van vijand
var vijandY = 300;   // y-positie van vijand

var score = 0; // aantal behaalde punten
var hoogsteScore = 0;




/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/*var rain = function(x,y) {
   ellipse(regenX[x], regenY[y], 10, 10)

   if (regenY[y] > 700) {
       regenY[y] = random(0, 20)
       regenX[x] = random(-5, 1280)
   }

   regenX[x] += 2
   regenY[y] += 3.5
};*/

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill(43, 47, 119);
  rect(20, 20, width - 2 * 20, height - 2 * 20);

  /*var sterren = function(x, y) {
      fill(187,224,255)
      rect(x + 2.5, y, 5, 5);
      rect(x - 2.5, y, 5, 5);
      rect(x, y + 2.5, 5, 5);
      rect(x, y - 2.5, 5, 5);
      rect(x, y, 5, 5);
  };

  sterren(300, 800);
  sterren(600, 300);*/

  /* dit is de grond*/
  fill("green");
  rect(20, 600, width - 2 * 20, height - 2 * 20 - 575);
  if (spelerY > 600 - spelerSize/2) {
      spelerY = 600 - spelerSize/2;
      jumpHoogte = 8.5 + 2.5;
      speedJump= 0;}
};

var borders = function () {
    if (spelerX < 20 + spelerSize/2) {spelerX = 20 + spelerSize/2;}
    if (spelerX > 1260 - spelerSize/2) {spelerX = 1260 - spelerSize/2;}
    if (spelerY < 20 + spelerSize/2) {spelerY = 20 + spelerSize/2;}
    if (spelerY > 600 - spelerSize/2) {spelerY = 600 - spelerSize/2;};
};

var platform = function(x, y, w, h) {
if (spelerX > x - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + spelerSize/2
    ) 

     {spelerY = y - spelerSize/2;
        jumpHoogte = 8.5 + 2.5;
        speedJump = 0;
     };

if (spelerX > x - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + 5 + h + spelerSize/2
    ) 
     
     {spelerY = y + 5 + h + spelerSize/2;
      speedJump = 40;
     };

if (spelerX > x - spelerSize/2 &&
    spelerX < x + 5 + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + h + spelerSize/2
    ) 
     
     {spelerX = x + 5 + w + spelerSize/2;
     };

if (spelerX > x - 5 - spelerSize/2 &&
    spelerX < x + w + spelerSize/2 &&
    spelerY > y - spelerSize/2 &&
    spelerY < y + h + spelerSize/2
    ) 
     
     {spelerX = x - 5 - spelerSize/2;
     };
    
    fill("orange")
    rect(x, y, w, h)
};

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    /*fill(150, 0, 0);
    rect (x, y, 100, 100);

    vijandX = x;
    vijandY = y;*/
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("salmon");
  ellipse(x, y, spelerSize, spelerSize);
};

var tekenPlatform = function(x,y,w,h) {
  fill("orange");
  rect(platformX[0][0], y, w, h)
}

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
    if (keyIsPressed) {
        if (keyIsDown(KEY_LEFT)) {spelerX -= 5}
        else if (keyIsDown(KEY_RIGHT)) {spelerX += 5}
    }
};

var beweegPlatform = function(x,y) {
    // platformX[x] += platformSpeed;
    // damagePlatformY[y] += platformSpeedY[y];
    // damagePlatformX[x] += platformSpeedX[x];

    damagePlatformY[levels][y] += platformSpeedY[y];
    damagePlatformX[levels][x] += platformSpeedY[x];

    if (damagePlatformY[levels][y] > 550) {
        platformSpeedY[y] = -3;
    }
    
    if (damagePlatformY[levels][y] < 350) {
        platformSpeedY[y] = 3;
    }

    /*if (damagePlatformX[x] > 1000) {
        platformSpeedX[x] = -3;
    }
    
    if (damagePlatformX[x] < 350) {
        platformSpeedX[x] = 3;
    }*/

}

/*var dash = function() {if (keyIsPressed) {
        if (keyCode === SPACEBAR) {spelerX += 20}} 
};*/

var jumpHoogte = 8.5 + 2.5;
var speedJump = 0;

var jumpSpeler = function() {
      if (keyIsDown(KEY_UP)) {
         spelerY -= jumpHoogte;
         speedJump += 1
      }

      if (speedJump === 5) {jumpHoogte = 6 + 2.5;
      }

      if (speedJump === 10) {jumpHoogte = 4.5 + 2.5;
      }

      if (speedJump === 20) {jumpHoogte = 3 + 2.5;
      }

      if (speedJump === 25) {jumpHoogte = 1.5 + 2.5;
      }

      if (speedJump === 30) {jumpHoogte = 0.75 + 2.5;
      }

      if (speedJump === 35) {jumpHoogte = 0.25 + 2.5;
      }

      if (speedJump === 36) {jumpHoogte = 0.20 + 2.5;
      }

      if (speedJump === 37) {jumpHoogte = 0.15 + 2.5;
      }

      if (speedJump === 38) {jumpHoogte = 0.10 + 2.5;
      }

      if (speedJump === 39) {jumpHoogte = 0.5 + 2.5;
      }

      if (speedJump > 39) {jumpHoogte = 0;
      }

        // hij springt ongeveer 150 pixels hoog
      
};

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    /*if (spelerX > x - spelerSize/2 && 
        spelerX < x + 100 + spelerSize/2 && 
        spelerY > y - spelerSize/2 && 
        spelerY < y + 100 + spelerSize/2)

    {return true;}*/
    return false;

    /*fill(150, 0, 0);
    rect(x, y, 100, 100);*/
};

var damagePlatform = function(x, y, w, h)
{if (spelerX > x - spelerSize/2 && 
        spelerX < x + w + spelerSize/2 && 
        spelerY > y - spelerSize/2 && 
        spelerY < y + h + spelerSize/2)

        {hp -= 1;
        spelerX = spawnX;
        spelerY = spawnY;
        speedJump = 40;
    }
    fill(150, 0, 0);
    rect(x, y, w, h);
};

var punten = function(x, y, w, h, p)
{if (spelerX > x - 0.375*w && 
        spelerX < x + 1*w && 
        spelerY > y - 0.375*h && 
        spelerY < y + 1*w)

        {score += 1;
            puntenX[levels].splice(p, 1);
            puntenY[levels].splice(p, 1);
         
    }

      fill(187,224,255)
      ellipse(x, y, w, h);
      // rect(x - 0.375*w, y - 0.375*h, 0.625*w, 0.625*h)
};

/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    if (hp === 0)
    {return true}
    else return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('black');

}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case UITLEG:

    break;

    case SPELEN: 
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
        hp -= 1;
        spelerX = spawnX;
        spelerY = spawnY;
        speedJump = 40;
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      // tekenPlatform(platformX, platformY, 100, 50)
      /*dash();*/
      jumpSpeler();
      
      // dit zijn de borders
      platform(0, 0, 20, 300)
      platform(1260, 0, 20, 300)
      platform(0, 0, 1280, 20)
      platform(0, 700, 1280, 20)

      platform(0, 420, 20, 300)
      platform(1260, 420, 20, 300)
      // platform(x, y, w, h)
      // platformSize = [50, 100, 200, 400]

      /*for(var i = 0; i <regenX.length; i++) {
          rain(i,i)
      }*/

      switch(level) {

      case EERSTELEVEL:

      if (keyIsDown(SPACEBAR) && levels < 1) {levels += 1}

      for(var i = 0; i <damagePlatformX[levels].length; i++) {
      damagePlatform(damagePlatformX[levels][i], damagePlatformY[levels][i], 100, 50)
      }

      for(var i = 0; i <platformX[levels].length; i++) {
      platform(platformX[levels][i], platformY[levels][i], 100, 50)
      }

      for(var i = 0; i <puntenX[levels].length; i++) {
      punten(puntenX[levels][i], puntenY[levels][i], 20, 20, i)
      }

      for(var i = 0; i <damagePlatformY[levels].length; i++) {
      beweegPlatform(i,i)
    }
      
    damagePlatform(20, 600 - 5, width - 2*20, height - 2*20 - 575 + 5)
}
      
      /*if (spelerX < 20 + spelerSize/2) {
          level = DERDELEVEL;
          spawnX = 1280 - 100;
          spawnY = 500;
          spelerX = 1260 - spelerSize/2;
      }
      break;
    
      case TWEEDELEVEL:

      damagePlatform(300, 500, 300, 70)

      break;

      case DERDELEVEL:

      platform(550, 300, platformSize[1], platformSize[0])
      platform(1000, 40, platformSize[1], platformSize[0])
      platform(300, 500, platformSize[1], platformSize[0])
      damagePlatform(700, 500, 300, 70)
    }*/

      textSize(30)
      fill(200, 200, 200)
      text("hp = " + hp, 40, 40, 200, 200)
      text("score = " + score, 40, 80, 400, 200)
      spelerY += 3.25

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;

    case GAMEOVER:
        background(0,0,0);
        textSize(75)
        fill(255, 0, 0)
        text("game over", 640 - 175, 360, 700, 700);
        text("score: " + score, 640 - 175, 460, 700, 700);


        if (score > hoogsteScore) {
            hoogsteScore = score;
        }

        text ("Highscore: " + hoogsteScore, 640 - 175, 560, 700, 700);
        level = EERSTELEVEL;
        spelerX = 100;
        spelerY = 500;
        spawnX = 100;
        spawnY = 500

    if (keyIsPressed && keyCode === SPACEBAR) {
        spelStatus = SPELEN;
        hp = 5;
        score = 0;
        puntenX = [[700], [300, 550, 800, 400, 700]];
        puntenY = [[700], [450, 450, 450, 600, 200]];
    }
  }
}
