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

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const SPACEBAR = 32;

var spelerX = 200; // x-positie van speler
var spelerY = 575; // y-positie van speler
var spelerSize = 25;
var hp = 3; // levens speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 300;   // x-positie van vijand
var vijandY = 300;   // y-positie van vijand

var score = 0; // aantal behaalde punten





/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill(43, 47, 119);
  rect(20, 20, width - 2 * 20, height - 2 * 20);

  /* dit is de grond*/
  fill("green");
  rect(20, 600, width - 2 * 20, height - 2 * 20 - 575);

  fill(150, 0, 0);
  rect (500, 500, 100, 100);
};

var borders = function () {
    if (spelerX < 20 + spelerSize/2) {spelerX = 20 + spelerSize/2;}
    if (spelerX > 1260 - spelerSize/2) {spelerX = 1260 - spelerSize/2;}
    if (spelerY < 20 + spelerSize/2) {spelerY = 20 + spelerSize/2;}
    if (spelerY > 600 - spelerSize/2) {spelerY = 600 - spelerSize/2;};
};

var platform = function(platformX, platformY) {
if (spelerX > platformX - spelerSize/2 &&
    spelerX < platformX + 100 + spelerSize/2 &&
    spelerY > platformY - spelerSize/2 &&
    spelerY < platformY + spelerSize/2) 
     
     {spelerY = platformY - spelerSize/2;
     };

if (spelerX > platformX - spelerSize/2 &&
    spelerX < platformX + 100 + spelerSize/2 &&
    spelerY > platformY - spelerSize/2 &&
    spelerY < platformY + 10 + spelerSize/2) 
     
     {spelerY = platformY + 10 + spelerSize/2;
     };

    fill("orange")
    rect(platformX, platformY, 100, 10)
};

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    /*fill(150, 0, 0)
    rect(x, y, 100, 100);*/

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

      if (spelerY > 600 - spelerSize/2) {
        jumpHoogte = 8.5 + 2.5;
        speedJump= 0;
      }
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
    if (spelerX > 500 - spelerSize/2 && spelerX < 600 + spelerSize/2 && spelerY > 500 - spelerSize/2 && spelerY < 600)
    {return true;}
    else return false;
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
        hp -= hp;
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      /*dash();*/
      jumpSpeler();
      borders()
      platform(300, 550)

      spelerY += 2.5

      if (checkGameOver()) {
        // spelStatus = GAMEOVER;
        spelerX = 35;
        hp = 3;
      }
      break;
  }
}
