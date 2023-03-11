import { c, reDraw } from "./canvas.js";
import { attacks } from "./data/attacks.js";
import { pokemon } from "./data/pokemon.js";
import Charizard from "./classes/pokemon/Charizard.js";

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
enemyTeam = [new Charizard({ ...pokemon.Charizard, isEnemy: true })];

let userInterface = document.querySelector("#userInterface");
let dialogueBox = document.querySelector("#dialogueBox");
let playerHealth = document.querySelector("#enemyHealthBar");
let enemyHealth = document.querySelector("#playerHealthBar");

export function initBattle() {
  userInterface.style.display = "block";
  dialogueBox.style.display = "none";
  playerHealth.style.width = "100%";
  enemyHealth.style.width = "100%";

  renderedSprites = [playerTeam[currentPlayer], enemyTeam[currentEnemy]];
}

export function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);

  reDraw();
  renderedSprites.forEach((sprite) => {
    sprite.draw(c);
  });
}
