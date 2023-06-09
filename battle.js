import { battle, victory } from "./data/audio.js";
import Messages from "./classes/Messages.js";

const messages = new Messages();

let dialogueBox = document.querySelector("#dialogueBox");

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shouldStatus(effChance, type, status) {
  if (type === "Fire" && status === "burn") return false;

  if (type === "Electric" && status === "para") return false;

  if (type === "Ice" && status === "freeze") return false;

  return randomIntFromInterval(1, 100) <= effChance;
}

function applyStatus(recipient, status) {
  if (recipient.health === 0) return;

  switch (status) {
    case "para":
      applyPara(recipient);
      break;
    case "burn":
      applyBurn(recipient);
      break;
    case "freeze":
      applyFreeze(recipient);
      break;
    case "sleep":
      applySleep(recipient);
      break;
  }
}

function applyPara(recipient) {
  document.querySelector("#menu").classList.add("loading");
  recipient.status = "paralyzed";
  statusShake(recipient, "paralyzed", "PAR");
}

function applyBurn(recipient) {
  document.querySelector("#menu").classList.add("loading");
  recipient.status = "burned";
  statusShake(recipient, "burned", "BRN");
}

function applyFreeze(recipient) {
  document.querySelector("#menu").classList.add("loading");
  recipient.status = "frozen";
  statusShake(recipient, "frozen", "FRZ");
}

function applySleep(recipient) {
  document.querySelector("#menu").classList.add("loading");
  recipient.status = "sleeping";

  let count = randomIntFromInterval(1, 3);
  recipient.sleepCounter = count;
  statusShake(recipient, "sleep", "SLP");
}

// shake pokemon if affected with status
function statusShake(pokemon, status, statusText) {
  // shake pokemon
  TweenMax.fromTo(
    pokemon.position,
    0.15,
    { x: pokemon.position.x - 5 },
    {
      x: pokemon.position.x + 5,
      repeat: 3,
      yoyo: true,
      ease: Sine.easeInOut,

      // after shaking
      onComplete: () => {
        // display status message
        let enemy = pokemon.isEnemy ? "Enemy " : "";
        let midMess = " got ";
        if (status === "sleep") midMess = " went to ";
        dialogueBox.style.display = "block";
        dialogueBox.innerHTML = enemy + pokemon.name + midMess + status + "!";
        document.querySelector("#menu").classList.remove("loading");

        if (pokemon.isEnemy)
          document.querySelector("#enemyStatus").innerHTML = statusText;
        else document.querySelector("#playerStatus").innerHTML = statusText;
        // return pokemon to old position
        TweenMax.to(pokemon.position, 1.5, {
          x: pokemon.position.x + 5,
          ease: Elastic.easeOut,
        });
      },
    }
  );
}

// check pre-attack conditions
function breakStatus(attacker, renderedSprites) {
  let canAttack = true;

  switch (attacker.status) {
    case "paralyzed":
      canAttack = attacker.canAttack("paralyzed");

      if (!canAttack) {
        messages.paraMess(attacker);
      }

      break;
    case "sleeping":
      canAttack = attacker.canAttack("sleeping");
      messages.sleepMess(attacker, canAttack, renderedSprites);

      break;
    case "frozen":
      canAttack = attacker.canAttack("frozen");
      messages.frozenMess(attacker, canAttack, renderedSprites);

      break;

    default:
      break;
  }

  return canAttack;
}

// pokemon takes their turn
export function takeTurn(attacker, move, recipient, renderedSprites, queue) {
  if (move === 5) {
    messages.recharge(attacker.name);
  }

  // can pokemon break out of condition
  else if (breakStatus(attacker, renderedSprites)) {
    attacker.attack({
      attack: move,
      recipient: recipient,
      renderedSprites,
    });

    // check if pokemon missed
    if (attacker.didHit === 0) {
      queue.push(() => {
        messages.missedMess(attacker);
      });
    }
    // check if foe was immune
    else if (attacker.didHit === 2) {
      queue.push(() => {
        messages.immuneMess(recipient);
      });
    }
    // check if move failed
    else if (attacker.didHit === 3) {
      queue.push(() => {
        messages.failMess();
      });
    }
    // if move hit
    else {
      let effectiveness = 1;
      if (move.moveType === 0) effectiveness = 1;
      else effectiveness = recipient.getWeakness(move.type);

      // show text describing move effectiveness
      if (effectiveness !== 1) {
        queue.push(() => {
          messages.effectivenessMess(effectiveness);
        });
      }

      // show crit message
      if (recipient.gotCrit) {
        recipient.gotCrit = false;
        queue.push(() => {
          messages.criticalMess();
        });
      }

      // was move mega drain
      if (move.name === "MEGA DRAIN" && attacker.health != attacker.stats[0]) {
        queue.push(() => {
          document.querySelector("#menu").classList.add("loading");
          let enemy = attacker.isEnemy ? "Enemy " : "";
          dialogueBox.innerHTML = enemy + attacker.name + " recovered health!";
          attacker.recoverHealth(attacker.getHpToAbsorb());
        });
      }

      // check if move should inflict status
      if (move.status.canStatus && recipient.status === "healthy") {
        if (
          shouldStatus(move.status.chance, recipient.types[0], move.status.type)
        ) {
          queue.push(() => {
            applyStatus(recipient, move.status.type);
          });
        }
      }
    }
  }
}

export function applyEndDamage(pokemon, renderedSprites) {
  messages.burnEffect(pokemon, renderedSprites);
}

export function faintPokemon(pokemon) {
  pokemon.faint();
}

// end the battle
export function finishBattle(battleAnimationId, winner) {
  if (winner === 1) {
    cancelAnimationFrame(battleAnimationId);
    document.querySelector(".enemy-info").style.display = "none";
    document.querySelector(".player-info").style.display = "none";
    document.querySelector("#menu").classList.add("loading");
    dialogueBox.innerHTML = "Enemy defeated! Thanks for playing!";
    battle.stop();
    victory.play();
  } else {
    gsap.to("#transitionBg", {
      opacity: 1,
      onComplete: () => {
        cancelAnimationFrame(battleAnimationId);
        document.querySelector("#userInterface").style.display = "none";
        document.querySelector("#restart-screen").style.display = "flex";
        battle.stop();
      },
    });
  }
}
