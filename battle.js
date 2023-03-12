import Messages from "./classes/Messages.js";

const messages = new Messages();

let attacksContainer = document.querySelector("#attacksBox");
let dialogueBox = document.querySelector("#dialogueBox");

export function createAttacks(pokemon) {
  attacksContainer.replaceChildren();

  // add a button for each of the player's attacks
  pokemon.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    button.classList.add("attack");
    button.id = attack.id;
    attacksContainer.append(button);
  });
}

// pokemon takes their turn
export function takeTurn(attacker, move, recipient, renderedSprites, queue) {
  attacker.attack({
    attack: move,
    recipient: recipient,
    renderedSprites,
  });

  // check if pokemon missed
  if (attacker.didHit === 0) {
  }
  // if move hit
  else {
    // show crit message
    if (recipient.gotCrit) {
      recipient.gotCrit = false;
    }
  }
}
