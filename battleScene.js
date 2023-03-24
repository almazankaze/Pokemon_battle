import { c, reDraw } from "./canvas.js";
import { attacks } from "./data/attacks.js";
import { pokemon } from "./data/pokemon.js";
import { takeTurn, faintPokemon, finishBattle } from "./battle.js";
import { pokemonCry, ball } from "./data/audio.js";
import Messages from "./classes/Messages.js";
import Sprite from "./classes/Sprite.js";
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
import Dragonite from "./classes/pokemon/Dragonite.js";
import Machamp from "./classes/pokemon/Machamp.js";

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
  new Snorlax(pokemon.Snorlax),
  new Gyarados(pokemon.Gyarados),
  new Jolteon(pokemon.Jolteon),
  new Gengar(pokemon.Gengar),
  new Mew(pokemon.Mew),
  new Charizard(pokemon.Charizard),
];
enemyTeam = [
  new Machamp({ ...pokemon.Machamp, isEnemy: true }),
  new Rhydon({ ...pokemon.Rhydon, isEnemy: true }),
  new Exeggutor({ ...pokemon.Exeggutor, isEnemy: true }),
  new Blastoise({ ...pokemon.Blastoise, isEnemy: true }),
  new Dragonite({ ...pokemon.Dragonite, isEnemy: true }),
  new MewTwo({ ...pokemon.Mewtwo, isEnemy: true }),
];

let userInterface = document.querySelector("#userInterface");
let dialogueBox = document.querySelector("#dialogueBox");
let playerHealth = document.querySelector("#playerHealthBar");
let enemyHealth = document.querySelector("#enemyHealthBar");
let attacksContainer = document.querySelector("#attacksBox");
let typesContainer = document.querySelector("#attackType");
let blankContainer = document.querySelector("#blankBox");
let choiceContainer = document.querySelector("#choiceBox");
let playerName = document.querySelector("#playerName");
let enemyName = document.querySelector("#enemyName");
let playerHP = document.querySelector("#playerHpNumber");
let selectScreen = document.querySelector("#pokeSelect");
let pokeContainer = document.querySelector("#pokeContainer");

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

  document.querySelector("#backBtn").addEventListener("click", (e) => {
    userInterface.style.display = "block";
    selectScreen.style.display = "none";
  });

  createPokemonSelectScreen();
  createAttacks();
  addEventsToAttacks();
}

function addEventsToAttacks() {
  document.querySelectorAll(".attack").forEach((b) => {
    b.addEventListener("click", (e) => {
      let speedWinner;
      const selectedAttack = attacks[e.currentTarget.id];

      const enemyAttack = enemyTeam[currentEnemy].chooseMove();

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
          enemyMove(true, enemyAttack);
        });
      } else {
        enemyMove(false, enemyAttack);

        queue.push(() => {
          if (playerTeam[currentPlayer].health >= 1) {
            takeTurn(
              playerTeam[currentPlayer],
              selectedAttack,
              enemyTeam[currentEnemy],
              renderedSprites,
              queue
            );

            queue.push(() => {
              enemyEndTurn();
            });
          } else {
            faintPokemon(playerTeam[currentPlayer], queue, battleAnimationId);

            numPlayerLeft -= 1;

            queue.push(() => {
              if (numPlayerLeft <= 0) finishBattle(battleAnimationId);
              else goToSelectScreen(true);
            });
          }
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

function createPokemonSelectScreen() {
  document.querySelector("#pokeBtn").addEventListener("click", (e) => {
    document.querySelector("#backBtn").disabled = false;

    goToSelectScreen(false);

    // add event listener to selecting pokemon
    document.querySelectorAll(".selectContainer").forEach((p, key) => {
      if (currentPlayer != key && playerTeam[key].status != "fainted")
        p.addEventListener("click", (e) => {
          userInterface.style.display = "block";

          selectScreen.style.display = "none";

          // send out next pokemon
          sendOutPlayerPoke(p.id);

          const enemyAttack = enemyTeam[currentEnemy].chooseMove();

          queue.push(() => enemyMove(true, enemyAttack));
        });
    });
  });
}

function goToSelectScreen(justFainted) {
  userInterface.style.display = "none";
  selectScreen.style.display = "block";

  pokeContainer.replaceChildren();

  playerTeam.forEach((p, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("selectContainer");
    newDiv.setAttribute("id", key);

    let newP = document.createElement("p");
    newP.innerHTML = p.name;

    let healthH2 = document.createElement("h2");
    healthH2.innerHTML = p.health + "/" + p.stats[0];

    let statusH2 = document.createElement("h2");
    statusH2.innerHTML = p.status;

    newDiv.appendChild(newP);
    newDiv.appendChild(healthH2);
    newDiv.appendChild(statusH2);

    pokeContainer.appendChild(newDiv);
  });

  if (justFainted) {
    document.querySelector("#backBtn").disabled = true;

    // add event listener to selecting pokemon
    document.querySelectorAll(".selectContainer").forEach((p, key) => {
      if (currentPlayer != key && playerTeam[key].status != "fainted")
        p.addEventListener("click", (e) => {
          userInterface.style.display = "block";

          selectScreen.style.display = "none";

          // send out next pokemon
          sendOutPlayerPoke(p.id);
        });
    });
  }
}

/**** Send out enemy pokemon ****/
function sendOutNext() {
  let s = enemyTeam[currentEnemy].size;
  let x = enemyTeam[currentEnemy].position.x;
  let y = enemyTeam[currentEnemy].position.y - 20;

  currentEnemy = currentEnemy + 1;

  enemyTeam[currentEnemy].reDraw(s, x, y);

  document.querySelector("#dialogueBox").style.display = "block";
  document.querySelector("#dialogueBox").innerHTML =
    "Enemy trainer sent out " + enemyTeam[currentEnemy].name + "!";

  document.querySelector("#enemyName").innerHTML = enemyTeam[currentEnemy].name;
  document.querySelector("#enemyHealthBar").style.width = "100%";

  document.querySelector("#enemyStatus").innerHTML = ":L50";

  const pokeballImg = new Image();
  pokeballImg.src = "./images/effects/pokeballEnter.png";

  const pokeball = new Sprite({
    position: {
      x: x - 10,
      y: y - 40,
    },
    backSprite: pokeballImg,
    size: enemyTeam[currentEnemy].size,
    frames: {
      max: 6,
      hold: 10,
    },
    animate: true,
  });

  renderedSprites.splice(1, 1);
  renderedSprites.splice(1, 1, pokeball);

  ball.play();

  gsap.to(pokeball, {
    duration: 0.6,
    onComplete: () => {
      if (currentEnemy === 1) pokemonCry.EXEGGUTOR.play();
      else if (currentEnemy === 2) pokemonCry.BLASTOISE.play();
      else if (currentEnemy === 3) pokemonCry.DRAGONITE.play();
      else if (currentEnemy === 4) pokemonCry.MEWTWO.play();

      renderedSprites.splice(1, 1);
      renderedSprites.splice(1, 1, enemyTeam[currentEnemy]);
      enemyTeam[currentEnemy].animateEntrance();
    },
  });
}

/**** Send out player pokemon ****/
function sendOutPlayerPoke(newPoke) {
  dialogueBox.style.display = "block";
  dialogueBox.innerHTML = playerTeam[currentPlayer].name + " return!";

  playerTeam[currentPlayer].stages = [0, 0, 0, 0, 0];

  let s = playerTeam[currentPlayer].size;
  let x = playerTeam[currentPlayer].position.x;
  let y = playerTeam[currentPlayer].position.y;

  if (playerTeam[currentPlayer].status === "fainted") y -= 20;

  const pokeballImg = new Image();
  pokeballImg.src = "./images/effects/pokeballEnter.png";

  const pokeball = new Sprite({
    position: {
      x: x,
      y: y - 20,
    },
    backSprite: pokeballImg,
    size: playerTeam[currentPlayer].size,
    frames: {
      max: 6,
      hold: 10,
    },
    animate: true,
  });

  queue.push(() => {
    document.querySelector("#menu").classList.add("loading");

    gsap.to(playerTeam[currentPlayer], {
      opacity: 0,
      onComplete: () => {
        currentPlayer = newPoke;

        dialogueBox.innerHTML = "Go " + playerTeam[currentPlayer].name + "!";

        playerName.innerHTML = playerTeam[currentPlayer].name;

        let currWidth = Math.floor(
          (playerTeam[currentPlayer].health /
            playerTeam[currentPlayer].stats[0]) *
            100
        );
        playerHealth.style.width = currWidth + "%";

        playerHP.innerHTML =
          playerTeam[currentPlayer].health +
          " / " +
          playerTeam[currentPlayer].stats[0];

        let currStatus = ":L50";

        if (playerTeam[currentPlayer].status === "paralyzed")
          currStatus = "PAR";
        else if (playerTeam[currentPlayer].status === "frozen")
          currStatus = "FRZ";
        else if (playerTeam[currentPlayer].status === "burned")
          currStatus = "BRN";
        else if (playerTeam[currentPlayer].status === "sleeping")
          currStatus = "SLP";

        document.querySelector("#playerStatus").innerHTML = currStatus;

        createAttacks();
        addEventsToAttacks();

        renderedSprites.splice(0, 1);
        renderedSprites.unshift(pokeball);

        ball.play();

        gsap.to(pokeball, {
          duration: 0.6,
          onComplete: () => {
            if (playerTeam[currentPlayer].name === "JOLTEON")
              pokemonCry.JOLTEON.play();
            else if (playerTeam[currentPlayer].name === "SNORLAX")
              pokemonCry.SNORLAX.play();
            else if (playerTeam[currentPlayer].name === "CHARIZARD")
              pokemonCry.CHARIZARD.play();
            else if (playerTeam[currentPlayer].name === "GYARADOS")
              pokemonCry.GYARADOS.play();
            else if (playerTeam[currentPlayer].name === "GENGAR")
              pokemonCry.GENGAR.play();
            else if (playerTeam[currentPlayer].name === "MEW")
              pokemonCry.MEW.play();

            playerTeam[currentPlayer].reDraw(s, x, y);

            renderedSprites.splice(0, 1);
            renderedSprites.unshift(playerTeam[currentPlayer]);

            playerTeam[currentPlayer].opacity = 1;

            document.querySelector("#menu").classList.remove("loading");
          },
        });
      },
    });
  });
}

/**** Prep attacks ****/
export function createAttacks() {
  attacksContainer.replaceChildren();

  // add a button for each of the player's attacks
  playerTeam[currentPlayer].attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    button.classList.add("attack");
    button.id = attack.id;
    attacksContainer.append(button);
  });
}

/***** Enemy turn ****/
function enemyMove(checkPlayerHealth, enemyAttack) {
  const randomAttack = enemyTeam[currentEnemy].attacks[enemyAttack];

  if (enemyTeam[currentEnemy].health >= 1) {
    takeTurn(
      enemyTeam[currentEnemy],
      randomAttack,
      playerTeam[currentPlayer],
      renderedSprites,
      queue
    );

    if (checkPlayerHealth) {
      queue.push(() => {
        playerEndTurn();
      });
    }
  } else {
    faintPokemon(enemyTeam[currentEnemy], queue, battleAnimationId);

    numEnemyLeft -= 1;

    queue.push(() => {
      // enemy sends out next pokemon if they can
      if (numEnemyLeft <= 0) {
        finishBattle(battleAnimationId);
      } else sendOutNext();
    });
  }
}

/**** Player end turn ****/
function playerEndTurn() {
  if (playerTeam[currentPlayer].health <= 0) {
    faintPokemon(playerTeam[currentPlayer], queue, battleAnimationId);

    numPlayerLeft -= 1;

    queue.push(() => {
      if (numPlayerLeft <= 0) finishBattle(battleAnimationId);
      else goToSelectScreen(true);
    });
  }
}

/**** Enemy end turn ****/
function enemyEndTurn() {
  if (enemyTeam[currentEnemy].health <= 0) {
    faintPokemon(enemyTeam[currentEnemy], queue, battleAnimationId);

    numEnemyLeft -= 1;

    queue.push(() => {
      // enemy sends out next pokemon if they can
      if (numEnemyLeft <= 0) {
        finishBattle(battleAnimationId);
      } else sendOutNext();
    });
  }
}

export function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);

  reDraw();
  renderedSprites.forEach((sprite) => {
    sprite.draw(c);
  });
}

addEventListener("pointerdown", () => {});
