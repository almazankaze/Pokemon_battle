import { c, reDraw } from "./canvas.js";
import { attacks } from "./data/attacks.js";
import { pokemon } from "./data/pokemon.js";
import { createAttacks, takeTurn } from "./battle.js";
import Messages from "./classes/Messages.js";
import Charizard from "./classes/pokemon/Charizard.js";
import Blastoise from "./classes/pokemon/Blastoise.js";
import Rhydon from "./classes/pokemon/Rhydon.js";
import Mew from "./classes/pokemon/Mew.js";
import Snorlax from "./classes/pokemon/Snorlax.js";
import Exeggutor from "./classes/pokemon/Exeggutor.js";
import MewTwo from "./classes/pokemon/MewTwo.js";
import Jolteon from "./classes/pokemon/Jolteon.js";
import Gengar from "./classes/pokemon/Gengar.js";
import Gyarados from "./classes/pokemon/Gyarados.js";

let queue = [];
let renderedSprites;
let battleAnimationId;

let playerTeam;
let currentPlayer = 0;
let numPlayerLeft = 6;
let enemyTeam;
let currentEnemy = 0;
let numEnemyLeft = 6;

const messages = new Messages();

playerTeam = [
  new Gyarados(pokemon.Gyarados),
  new Jolteon(pokemon.Jolteon),
  new Gengar(pokemon.Gengar),
  new Snorlax(pokemon.Snorlax),
  new Mew(pokemon.Mew),
  new Charizard(pokemon.Charizard),
];
enemyTeam = [
  new MewTwo({ ...pokemon.Mewtwo, isEnemy: true }),
  new Exeggutor({ ...pokemon.Exeggutor, isEnemy: true }),
  new Blastoise({ ...pokemon.Blastoise, isEnemy: true }),
  new Rhydon({ ...pokemon.Rhydon, isEnemy: true }),
];

let userInterface = document.querySelector("#userInterface");
let dialogueBox = document.querySelector("#dialogueBox");
let playerHealth = document.querySelector("#enemyHealthBar");
let enemyHealth = document.querySelector("#playerHealthBar");
let attacksContainer = document.querySelector("#attacksBox");
let typesContainer = document.querySelector("#attackType");
let blankContainer = document.querySelector("#blankBox");
let choiceContainer = document.querySelector("#choiceBox");
let playerName = document.querySelector("#playerName");
let enemyName = document.querySelector("#enemyName");
let playerHP = document.querySelector("#playerHpNumber");

dialogueBox.addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});

/* resize pokemon sprites to fit screen */
window.addEventListener("resize", reSizeSprites, false);

function reSizeSprites() {
  if (window.innerWidth < 500) {
    enemyTeam[currentEnemy].reDraw(2, 190, 10);
    playerTeam[currentPlayer].reDraw(2, 10, 98);
  } else {
    enemyTeam[currentEnemy].reDraw(3, 290, 10);
    playerTeam[currentPlayer].reDraw(3, 25, 128);
  }

  reDraw();
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

reSizeSprites();

export function initBattle() {
  userInterface.style.display = "block";
  dialogueBox.style.display = "block";
  playerHealth.style.width = "100%";
  enemyHealth.style.width = "100%";

  // display names
  playerName.innerHTML = playerTeam[currentPlayer].name;
  enemyName.innerHTML = enemyTeam[currentEnemy].name;

  // display hp
  playerHP.innerHTML =
    playerTeam[currentPlayer].health +
    " / " +
    playerTeam[currentPlayer].stats[0];

  renderedSprites = [playerTeam[currentPlayer], enemyTeam[currentEnemy]];

  enemyTeam[currentEnemy].animateEntrance();

  dialogueBox.innerHTML = messages.startMessage();

  document.querySelector("#fightBtn").addEventListener("click", (e) => {
    blankContainer.style.display = "none";
    choiceContainer.style.display = "none";
    typesContainer.style.display = "block";
    attacksContainer.style.display = "grid";
  });

  typesContainer.addEventListener("click", (e) => {
    blankContainer.style.display = "block";
    choiceContainer.style.display = "grid";
    typesContainer.style.display = "none";
    attacksContainer.style.display = "none";
  });

  createAttacks(playerTeam[currentPlayer]);
  addEventsToAttacks();
}

function addEventsToAttacks() {
  document.querySelectorAll(".attack").forEach((b) => {
    b.addEventListener("click", (e) => {
      let speedWinner;
      const selectedAttack = attacks[e.currentTarget.id];

      // random attack
      let enemyAttack = enemyTeam[currentEnemy].chooseMove();
      const randomAttack = enemyTeam[currentEnemy].attacks[enemyAttack];

      if (
        playerTeam[currentPlayer].getSpeed() >
        enemyTeam[currentEnemy].getSpeed()
      )
        speedWinner = 1;
      else if (
        enemyTeam[currentEnemy].getSpeed() >
        playerTeam[currentPlayer].getSpeed()
      )
        speedWinner = 2;
      else speedWinner = randomIntFromInterval(1, 2);

      if (speedWinner === 1) {
        takeTurn(
          playerTeam[currentPlayer],
          selectedAttack,
          enemyTeam[currentEnemy],
          renderedSprites,
          queue,
          battleAnimationId
        );

        queue.push(() => {
          takeTurn(
            enemyTeam[currentEnemy],
            randomAttack,
            playerTeam[currentPlayer],
            renderedSprites,
            queue
          );
        });
      } else {
        takeTurn(
          enemyTeam[currentEnemy],
          randomAttack,
          playerTeam[currentPlayer],
          renderedSprites,
          queue,
          battleAnimationId
        );

        queue.push(() => {
          takeTurn(
            playerTeam[currentPlayer],
            selectedAttack,
            enemyTeam[currentEnemy],
            renderedSprites,
            queue
          );
        });
      }

      if (playerTeam[currentPlayer].getMovePP(selectedAttack) <= 0) {
        b.disabled = true;
      }

      blankContainer.style.display = "block";
      choiceContainer.style.display = "grid";
      typesContainer.style.display = "none";
      attacksContainer.style.display = "none";
    });

    b.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.id];
      typesContainer.innerHTML =
        "Type/" +
        selectedAttack.type +
        " " +
        playerTeam[currentPlayer].getMovePP(selectedAttack) +
        "/" +
        selectedAttack.pp;
    });
  });
}

export function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);

  reDraw();
  renderedSprites.forEach((sprite) => {
    sprite.draw(c);
  });
}

addEventListener("pointerdown", () => {});
