import Sprite from "./Sprite.js";
import { sleeping } from "../data/audio.js";

export default class Messages {
  constructor() {
    this.dialogueBox = document.querySelector("#dialogueBox");
  }

  startMessage() {
    return "Enemy Trainer wants to battle!";
  }

  sendOutPokemon(name, isEnemy) {
    if (isEnemy) return `Enemy trainer sent out ${name}!`;

    return `Go ${name}!`;
  }

  useMove(name, moveName, isEnemy) {
    let enemy = "";

    if (isEnemy) enemy = "Enemy";

    return enemy + ` ${name} used ${moveName}!`;
  }

  missedMess(pokemon) {
    let enemy = pokemon.isEnemy ? "Enemy" : "";
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML = enemy + " " + pokemon.name + " Missed!";
  }

  effectivenessMess(effectiveness) {
    this.dialogueBox.style.display = "block";

    if (effectiveness > 1) this.dialogueBox.innerHTML = "It's super effective!";
    else if (effectiveness === 0)
      this.dialogueBox.innerHTML = "It had no effect!";
    else if (effectiveness > 0 && effectiveness < 1)
      this.dialogueBox.innerHTML = "It's not very effective!";
  }

  immuneMess(pokemon) {
    let enemy = pokemon.isEnemy ? "Enemy" : "";
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML =
      " It doesn't affect " + enemy + " " + pokemon.name;
    document.querySelector("#menu").classList.remove("loading");
  }

  failMess() {
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML = "The move failed!";
    document.querySelector("#menu").classList.remove("loading");
  }

  criticalMess() {
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML = "It's a critical hit!";
  }

  sleepMess(pokemon, wokeUp, renderedSprites) {
    // display status message
    let enemy = pokemon.isEnemy ? "Enemy " : "";
    this.dialogueBox.style.display = "block";

    if (wokeUp) {
      this.dialogueBox.innerHTML = enemy + pokemon.name + " woke up!";

      document.querySelector("#menu").classList.remove("loading");

      if (pokemon.isEnemy)
        document.querySelector("#enemyStatus").innerHTML = ":L50";
      else document.querySelector("#playerStatus").innerHTML = ":L50";
    } else {
      document.querySelector("#menu").classList.add("loading");
      this.dialogueBox.innerHTML = enemy + pokemon.name + " is fast asleep!";

      this.sleepEffect(pokemon, renderedSprites);
    }
  }

  paraMess(pokemon) {
    // display status message
    let enemy = pokemon.isEnemy ? "Enemy " : "";
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML = enemy + pokemon.name + " is fully Paralyzed!";
    document.querySelector("#menu").classList.remove("loading");
  }

  frozenMess(pokemon, defrost, renderedSprites) {
    // display status message
    let enemy = pokemon.isEnemy ? "Enemy " : "";
    this.dialogueBox.style.display = "block";

    if (defrost) {
      this.dialogueBox.innerHTML = enemy + pokemon.name + " defrosted!";

      document.querySelector("#menu").classList.remove("loading");

      if (pokemon.isEnemy)
        document.querySelector("#enemyStatus").innerHTML = ":L50";
      else document.querySelector("#playerStatus").innerHTML = ":L50";
    } else {
      document.querySelector("#menu").classList.add("loading");
      this.dialogueBox.innerHTML = enemy + pokemon.name + " is frozen solid!";

      this.freezeEffect(pokemon, renderedSprites);
    }
  }

  sleepEffect(pokemon, renderedSprites) {
    let pos = 180;

    if (pokemon.isEnemy) pos = -60;

    if (pokemon.size === 2) {
      pos = 120;

      if (pokemon.isEnemy) pos = -40;
    }

    const sleepImg = new Image();
    sleepImg.src = "./images/effects/sleepIcon.png";
    const sleep = new Sprite({
      position: {
        x: pokemon.position.x + pos,
        y: pokemon.position.y,
      },
      backSprite: sleepImg,
      size: pokemon.size,
    });

    renderedSprites.splice(2, 0, sleep);

    sleeping.play();

    gsap.to(sleep.position, {
      x: sleep.position.x,
      y: sleep.position.y + 40,
      duration: 1,
      repeat: 1,
      onComplete: () => {
        renderedSprites.splice(2, 1);
        document.querySelector("#menu").classList.remove("loading");
      },
    });
  }

  burnEffect(pokemon, renderedSprites) {
    this.dialogueBox.style.display = "block";
    document.querySelector("#menu").classList.add("loading");

    this.dialogueBox.innerHTML = pokemon.name + " was hurt by burn!";

    let burnDamage = Math.floor(pokemon.stats[0] / 16);

    let pos = 180;

    if (pokemon.isEnemy) pos = -60;

    if (pokemon.size === 2) {
      pos = 110;

      if (pokemon.isEnemy) pos = -40;
    }

    // create burn sprite
    const burnImage = new Image();
    burnImage.src = "./img/effects/poison.png";
    const burn = new Sprite({
      position: {
        x: pokemon.position.x + pos,
        y: pokemon.position.y,
      },
      backSprite: burnImage,
      size: pokemon.size,
    });

    renderedSprites.splice(2, 0, burn);

    audio.burnEffect.play();

    gsap.to(burn.position, {
      x: burn.position.x,
      y: burn.position.y + 40,

      onComplete: () => {
        renderedSprites.splice(2, 1);
        pokemon.reduceHealth(burnDamage);
      },
    });
  }

  freezeEffect(pokemon, renderedSprites) {
    let y = 75;

    if (pokemon.size === 2) y = 45;

    const iceImg = new Image();
    iceImg.src = "./img/effects/frozen.png";
    const ice = new Sprite({
      position: {
        x: pokemon.position.x,
        y: pokemon.position.y + y,
      },
      backSprite: iceImg,
      size: pokemon.size,
    });

    renderedSprites.splice(2, 0, ice);

    audio.frozen.play();

    const t = gsap.timeline({
      onComplete: () => {
        audio.frozen.play();
        renderedSprites.splice(2, 1);
        document.querySelector("#menu").classList.remove("loading");
      },
    });

    t.to(ice, 0.5, { opacity: 0 }).to(ice, 0.5, { opacity: 1 });
    return;
  }
}
