import { c, reDraw } from "./canvas.js";
import { attacks } from "./data/attacks.js";
import { pokemon } from "./data/pokemon.js";
import Charizard from "./classes/pokemon/Charizard.js";
import Blastoise from "./classes/pokemon/Blastoise.js";

let renderedSprites;
let queue;
let battleAnimationId;

let playerTeam;
let currentPlayer = 0;
let numPlayerLeft = 6;
let enemyTeam;
let currentEnemy = 0;
let numEnemyLeft = 6;

playerTeam = [new Charizard(pokemon.Charizard)];
enemyTeam = [new Blastoise({ ...pokemon.Blastoise, isEnemy: true })];

let userInterface = document.querySelector("#userInterface");
let dialogueBox = document.querySelector("#dialogueBox");
let playerHealth = document.querySelector("#enemyHealthBar");
let enemyHealth = document.querySelector("#playerHealthBar");

/* resize pokemon sprites to fit screen */
window.addEventListener("resize", reSizeSprites, false);

function reSizeSprites() {
  if (window.innerWidth < 500) {
    enemyTeam[currentEnemy].reDraw(2, 175, 10);
    playerTeam[currentPlayer].reDraw(2, 15, 108);
  } else {
    enemyTeam[currentEnemy].reDraw(3, 280, 10);
    playerTeam[currentPlayer].reDraw(3, 25, 152);
  }

  reDraw();
}

reSizeSprites();

export function initBattle() {
  userInterface.style.display = "block";
  dialogueBox.style.display = "none";
  playerHealth.style.width = "100%";
  enemyHealth.style.width = "100%";

  renderedSprites = [playerTeam[currentPlayer], enemyTeam[currentEnemy]];

  enemyTeam[0].animateEntrance();
}

export function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);

  reDraw();
  renderedSprites.forEach((sprite) => {
    sprite.draw(c);
  });
}

addEventListener("pointerdown", () => {});
