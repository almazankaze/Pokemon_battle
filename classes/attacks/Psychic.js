import Sprite from "../Sprite.js";
import Attack from "./Attack.js";
import { psychic } from "../../data/audio.js";

export default class Psychic extends Attack {
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

  // us the move
  useMove(position, attackStat, mult, recipient, renderedSprites) {
    let moveHit = 1;

    // use up pp
    this.pp -= 1;

    if (!this.hit(this.acc)) moveHit = 0;

    // calc damage
    let damage = this.damageCalc(attackStat, mult, this.type, recipient);

    if (damage <= 0) moveHit = 2;

    if (moveHit !== 1) return moveHit;

    let y = 80;

    if (recipient.size === 2) y = 40;

    // create attack sprite
    const psychicImage = new Image();
    psychicImage.src = "./images/attacks/psychic.png";
    const psychicObj = new Sprite({
      position: {
        x: position.x + 10,
        y: position.y + y,
      },
      backSprite: psychicImage,
      size: recipient.size,
      frames: {
        max: 5,
        hold: 10,
      },
      animate: true,
    });

    renderedSprites.splice(2, 0, psychicObj);

    psychic.play();

    // animate sprite
    gsap.to(psychicObj.position, {
      x: recipient.position.x + 80,
      y: recipient.position.y + 20,
      duration: 0.3,
      repeat: 4,

      onComplete: () => {
        // Enemy actually gets hit
        this.hitAndDamage(recipient, damage);
        renderedSprites.splice(2, 1);
      },
    });
    return moveHit;
  }
}
