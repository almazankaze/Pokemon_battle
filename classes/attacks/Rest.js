import Sprite from "../Sprite.js";
import Attack from "./Attack.js";
import { sleeping } from "../../data/audio.js";

export default class Rest extends Attack {
  constructor({
    name,
    type,
    pp,
    acc,
    power,
    moveType,
    targetStat,
    status,
    isStab = false,
  }) {
    super({
      name,
      type,
      pp,
      acc,
      power,
      moveType,
      targetStat,
      status,
      isStab,
    });
  }

  useMove(currHealth, maxHealth, position, size, isEnemy, renderedSprites) {
    let moveHit = 1;

    // use up pp
    this.pp -= 1;

    if (currHealth >= maxHealth) {
      moveHit = 3;
      return moveHit;
    }

    let pos = 180;

    if (isEnemy) pos = -60;

    if (size === 2) {
      pos = 120;

      if (isEnemy) pos = -40;
    }

    const sleepImg = new Image();
    sleepImg.src = "./images/effects/sleepIcon.png";
    const sleep = new Sprite({
      position: {
        x: position.x + pos,
        y: position.y,
      },
      backSprite: sleepImg,
      size: size,
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
      },
    });

    document.querySelector("#dialogueBox").innerHTML += " Then went to sleep!";

    return moveHit;
  }
}
