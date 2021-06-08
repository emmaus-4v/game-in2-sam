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
const MOEILIJKHEIDKIEZEN = 1;
const SPELEN = 2;
const GAMEOVER = 3;
const WINSCHERM = 4;
var spelStatus = UITLEG;
var levels = 0;

var tijd = 0;
var snelstetijd = 10000;

var gameStatus = 0;
const UITGESPEELD = 1

const GEMIDDELD = 0;
const MAKKELIJK = 1;
const HARDMODE = 2;
var moeilijkheid = GEMIDDELD;

const ENTER = 13;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;
const SPACEBAR = 32;
const S_KEY = 83;

var spelerX = 100; // x-positie van speler
var spelerY = 500; // y-positie van speler

var jumpHoogte = 8.5 + 2.5;
var speedJump = 0;

var damagePlatformSpeedY = [[4, 4, 4, 4], 
                            [0], 
                            [0], 
                            [0], 
                            [], 
                            [], 
                            [10, 10, 10, 10, 10, 10, 10, 10]];
var damagePlatformSpeedX = [[4, 4, 4, 4], 
                            [8], 
                            [8], 
                            [10], 
                            [], 
                            [], 
                            [0, 0, 0, 0, 0, 0, 0, 0]];

var platformSpeedY = [[4, 4, 4, 4], 
                      [0], 
                      [0], 
                      [0],
                      [0, 2, 2, 2, 0],
                      [3.25, 3.25, 3.25, 3.25, 3.25],
                      []];
var platformSpeedX = [[4, 4, 4, 4], 
                      [0], 
                      [0], 
                      [0], 
                      [0, 2, 2, 2, 0], 
                      [0, 0, 0, 0, 0], 
                      []];

var platformX = [[50, 300, 550, 800, 1050],
                 [50, 250, 50, 250, 700, 950, 1125],
                 [50, 300, 550, 800, 1050], 
                 [50],
                 [50, 175, 700, 825],
                 [50, 300, 550, 800, 1050],
                 []];

var platformY = [[500, 500, 500, 500, 500],
                 [500, 400, 300, 200, 550, 550, 450],
                 [500, 500, 500, 500, 500], 
                 [500],
                 [500, 500, 500, 500],
                 [500, 500, 500, 500, 500],
                 []];

var damagePlatformX = [[175, 425, 675, 925],
                       [500, 600, 700, 800],
                       [300], 
                       [],
                       [],
                       [],
                       [540, 700, 800, 900, 1000, 1100]];
var damagePlatformY = [[350, 350, 350, 350],
                       [200, 250, 400, 200],
                       [450], 
                       [],
                       [],
                       [],
                       [500, 450, 400, 350, 300, 250]];


var stekelPlatformenX = [200, 500, 800];
var stekelPlatformenY = [450, 350, 250];

var stekelPlatformen2X = [350, 650];
var stekelPlatformen2Y = [400, 300];

var puntenX = [[100, 350, 600, 850, 1100],
               [100, 300, 100, 300, 650, 750],
               [100, 350, 600, 850, 1100],
               [250, 550, 850],
               [487.5, 812.5],
               [100, 350, 600, 850, 1100],
               []];
var puntenY = [[450, 450, 450, 450, 450],
               [450, 350, 250, 150, 425, 275],
               [450, 450, 450, 450, 450], 
               [400, 300, 200],
               [400, 400],
               [450, 450, 450, 450, 450],
               []];

var spelerSize = 25;
var hp = 5; // levens speler

var score = 0; // aantal behaalde punten
var hoogsteScore = 0;




/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */
var timer = function() {
tijd += (1/54)
}

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill(43, 47, 119);
  rect(20, 20, width - 2 * 20, height - 2 * 20);
};

var hardMode = function() {
        hp = 1;
        gameStatus = 0;
        strokeWeight(1.5)

        fill('black')
        rect(20, 20, width - 40, width - 40)

        fill(150, 100, 50)
        ellipse(width/2 + 2, 300, 225, 225)
        fill(150, 0, 0)
        ellipse(width/2 - 2, 300, 225, 225)
        fill('black')
        ellipse(width/2, 300, 220, 220)

        stroke('red')
        line(width/2, 350, width/2 + 25, 350 - 25)
        line(width/2, 350, width/2 - 25, 350 - 25)
        line(width/2, 300, width/2 + 25, 300 - 25)
        line(width/2, 300, width/2 - 25, 300 - 25)
        line(width/2, 300, width/2 + 25, 300 + 25)
        line(width/2, 300, width/2 - 25, 300 + 25)
        line(width/2 + 25, 275, width/2 + 12.5, 262.5)
        line(width/2 - 25, 275, width/2 - 12.5, 262.5)
        line(width/2, 350, width/2, 270)
}

var borders = function () {
    if (spelerX < 20 + spelerSize/2) {spelerX = 20 + spelerSize/2;}
    if (spelerY < 20 + spelerSize/2) {spelerY = 20 + spelerSize/2;}
    if (spelerY > 600 - spelerSize/2) {spelerY = 600 - spelerSize/2;};

    fill("orange")
    rect(0, 0, 20, 720)
    rect(0, 0, 1280, 20)
    rect(0, 700, 1280, 20)

    platform(1260, 0, 20, 300)
    platform(1260, 420, 20, 300)
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

var damagePlatform = function(x, y, w, h)
{if (spelerX > x - spelerSize/2 && 
        spelerX < x + w + spelerSize/2 && 
        spelerY > y - spelerSize/2 && 
        spelerY < y + h + spelerSize/2)

        {hp -= 1;
        spelerX = 100;
        spelerY = 500;
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
};

var stekelPlatform = function(x, y) {
    platform(x, y, 100, 50)
    damagePlatform(x, y - 20, 20, 20)
    damagePlatform(x + 80, y - 20, 20, 20)
}

var stekelPlatform2 = function(x, y) {
    platform(x, y, 100, 50)
    damagePlatform(x + 35, y - 20, 30, 20)
}


var eindScherm = function() {
    if (moeilijkheid === HARDMODE) {
            score *= 2
            moeilijkheid = GEMIDDELD;
        }

        if (score > hoogsteScore) {
            hoogsteScore = score;
        }

        levels = 0;
        spelerX = 100;
        spelerY = 500;
        
    if (keyIsDown(SPACEBAR)) {
        spelStatus = MOEILIJKHEIDKIEZEN;
        stroke('black');
        hp = 5;
        score = 0;
            puntenX = [[100, 350, 600, 850, 1100],
                       [100, 300, 100, 300, 650, 750],
                       [100, 350, 600, 850, 1100],
                       [250, 550, 850],
                       [487.5, 812.5],
                       [],
                       []];
            puntenY = [[450, 450, 450, 450, 450],
                       [450, 350, 250, 150, 425, 275],
                       [450, 450, 450, 450, 450], 
                       [400, 300, 200],
                       [400, 400],
                       [],
                       []];
    }
}

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
  rect(x, y, w, h)
}

var tekenPunten = function(x, y, w, h) {
 fill(187,224,255)
 ellipse(x, y, w, h);
}

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

var beweegDamagePlatform = function(x, y, speedX, speedY, linkerX, rechterX, benedenY, bovenY) {
    damagePlatformY[levels][y] += damagePlatformSpeedY[levels][y];
    damagePlatformX[levels][x] += damagePlatformSpeedX[levels][x];

    if (damagePlatformX[levels][x] > rechterX) {
        damagePlatformSpeedX[levels][x] = -speedX;
    }
    
    if (damagePlatformX[levels][x] < linkerX) {
        damagePlatformSpeedX[levels][x] = speedX;
    }

    if (damagePlatformY[levels][y] > benedenY) {
        damagePlatformSpeedY[levels][y] = -speedY;
    }
    
    if (damagePlatformY[levels][y] < bovenY) {
        damagePlatformSpeedY[levels][y] = speedY;
    }
}

var beweegPlatform = function(x, y, speedX, speedY, linkerX, rechterX, benedenY, bovenY) {

    platformY[levels][y] += platformSpeedY[levels][y];
    platformX[levels][x] += platformSpeedX[levels][x];

    if (platformX[levels][x] > rechterX) {
        platformSpeedX[levels][x] = -speedX;
    }
    
    if (platformX[levels][x] < linkerX) {
        platformSpeedX[levels][x] = speedX;
    }

    if (platformY[levels][y] > benedenY) {
        platformSpeedY[levels][y] = -speedY;
    }
    
    if (platformY[levels][y] < bovenY) {
        platformSpeedY[levels][y] = speedY;
    }
}

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
    return false;
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

  // Kleur de achtergrond black, zodat je het kunt zien
  background("black");
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case UITLEG:

    background('black');
    if (keyIsDown(ENTER)) {spelStatus = MOEILIJKHEIDKIEZEN;}
    fill(175, 175, 175)
    textSize(30)
    text("Gebruik de linker en rechter pijltjes om heen en weer te bewegen. Met pijltje omhoog kan je springen. De langer je het pijltje ingedrukt houd de hoger je karakter springt.", 40, 20, 1240, 700)
    text("Druk op enter om verder te gaan.", 40, 150, 1240, 700)

    text("Dit is een normaal platform waar je op kan springen", 325, 265, 700, 700)

    text("Dit is een damageplatform. Als je het platform aanraakt dan verlies je 1 hp en wordt je teruggestuurd naar het begin van het level. Bij een game over wordt je teruggestuurd naar het allereerste level", 325, 375, 900, 700 )

    text("Dit is een punt. als je deze oppakt dan gaat je score plus 1.", 325, 550, 1000, 700)

    platform(150, 250, 100, 50)
    damagePlatform(150, 375, 100, 50)
    punten(200, 550, 20, 20)

    break;

    case MOEILIJKHEIDKIEZEN:
    background('black')
    fill(175, 175, 175)
    textSize(30)
    tijd = 0;
    text("Druk op 1 voor makkelijk. Bij makkelijk heb je 20 hp.", 125, 165, 720, 700)

    text("Druk op 2 voor normaal. Bij normaal heb je 5 hp.", 125, 275, 920, 700 )

    text("Druk op 3 voor moeilijk. Bij moeilijk heb je maar 1 hp dus je moet heel het spel zonder gehit te worden uitspelen. Bij moeilijk veranderd het uiterlijk van de game ook.", 125, 400, 1020, 700)

    if (keyIsDown(49)) {
        moeilijkheid = MAKKELIJK;
        spelStatus = SPELEN;
    }
    if (keyIsDown(50)) {
        moeilijkheid = GEMIDDELD;
        spelStatus = SPELEN;
    }
    if (keyIsDown(51)) {
        moeilijkheid = HARDMODE;
        spelStatus = SPELEN;
    }
    break;

    case SPELEN: 

    background('black')
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
        hp -= 1;
        spelerX = 100;
        spelerY = 500;
        speedJump = 40;
      }

      switch (moeilijkheid) {
      case GEMIDDELD: 
      tekenVeld();
      break;

      case MAKKELIJK: 
      tekenVeld();
      hp = 20;
      moeilijkheid = GEMIDDELD;
      break;

      case HARDMODE: 
      hardMode();
      }

      tekenSpeler(spelerX, spelerY);
      jumpSpeler();
      
      // dit zijn de borders
      borders();

      if (keyIsDown(S_KEY)) {spelStatus = UITLEG;};

      if (gameStatus === UITGESPEELD) {
      for(var i = 0; i < 10; i++) {
      if (keyIsDown(49 + i) && levels !== i) {levels = i;
      spelerX = 100;
      spelerY = 500;}
      }
    }

      if (levels === 0) {
        for(var i = 0; i <damagePlatformX[levels].length; i++) {
          beweegDamagePlatform(i, i, 0, 4, 0, 0, 650, 350)
        }
      }

      if (levels === 1) {
          platform(500, 250, 100, 350)
          platform(800, 250, 100, 200)
      }

      if (levels === 2) {
          beweegDamagePlatform(0, 0, 8, 0, 300, 1050, 0, 0)
      }

      if (levels === 3) {
      for(var i = 0; i <stekelPlatformenX.length; i++) {
      stekelPlatform(stekelPlatformenX[i], stekelPlatformenY[i])
      }

      for(var i = 0; i <stekelPlatformen2X.length; i++) {
      stekelPlatform2(stekelPlatformen2X[i], stekelPlatformen2Y[i])
      }
    }

      if (levels === 4) {
        beweegPlatform(1, 1, 2, 0, 175, 375, 0, 0)
        beweegPlatform(2, 2, 2, 0, 500, 700, 0, 0)
        beweegPlatform(3, 3, 2, 0, 825, 1025, 0, 0)
      }

      if (levels === 5) {
          for(var i = 1; i < platformX[levels].length; i++) {
          beweegPlatform(i, i, 0, 3.25, 0, 0, 650, 500)
        }
      }

      if (levels === 6) {
          platform(20, 500, 1240, 50)
          platform(20, 200, 1240, 50)
          damagePlatform(220, 440, 50, 60)
          damagePlatform(220, 250, 50, 100)
          damagePlatform(320, 250, 50, 80) 
          damagePlatform(320, 420, 50, 80)
          damagePlatform(420, 475, 50, 25)
          damagePlatform(420, 250, 50, 135)
          beweegDamagePlatform(0, 0, 0, 10, 0, 0, 450, 250)
          for(var i = 1; i <damagePlatformX[levels].length; i++) {
          beweegDamagePlatform(i,i, 0, 3.5, 0, 0, 450, 250)}
        }

      for(var i = 0; i <damagePlatformX[levels].length; i++) {
      damagePlatform(damagePlatformX[levels][i], damagePlatformY[levels][i], 100, 50)
      }

      for(var i = 0; i <platformX[levels].length; i++) {
      platform(platformX[levels][i], platformY[levels][i], 100, 50)
      }

      for(var i = 0; i <puntenX[levels].length; i++) {
      punten(puntenX[levels][i], puntenY[levels][i], 20, 20, i)
      }
      
    damagePlatform(20, 600 - 5, width - 2*20, height - 2*20 - 575 + 5)

    for(var i = 0; i < 10; i++) {
      if (keyIsDown(49 + i) && levels !== i) {levels = i;
      spelerX = 100;
      spelerY = 500;}}
    
    if (spelerX > 1260) {
        spelerX = 100; 
        spelerY = 500;
        levels += 1;}

      textSize(30)
      fill(200, 200, 200)
      text("hp = " + hp, 40, 40, 200, 200)
      text("score = " + score, 40, 80, 400, 200)
      text("level " + (levels + 1), width/2 - 25, 40, 200, 200)

      timer()
      text("" + Math.round(tijd*100)/100, width - 125, 35, 200, 200)
      spelerY += 3.25

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }

      if (levels === 7) {
          spelStatus = WINSCHERM;
          gameStatus = UITGESPEELD;
      }
      break;

    case GAMEOVER:
    eindScherm();
    background('black');
    textSize(75)
    fill(255, 0, 0)
    text("Score: " + score, 640 - 175, 360, 700, 700);
    text("tijd: " + Math.round(tijd*100)/100, 640 - 175, 560, 700, 700)
    text("Highscore: " + hoogsteScore, 640 - 175, 460, 700, 700);
    text("GAME OVER", 640 - 175, 260, 700, 700);
    break;

     case WINSCHERM: 
     eindScherm();
     if (tijd < snelstetijd) {
            snelstetijd = tijd;
        }

    background('black');
    textSize(75)
    fill(255, 0, 0)
    text("Score: " + score, 640 - 175, 360, 700, 700);
    text("tijd: " + Math.round(tijd*100)/100, 640 - 175, 560, 700, 700)
    text("Highscore: " + hoogsteScore, 640 - 175, 460, 700, 700);
    text("snelste tijd: " + Math.round(snelstetijd*100)/100, 640 - 175, 660, 700, 700)
  }
}
