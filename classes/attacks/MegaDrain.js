import Sprite from "../Sprite.js";
import Attack from "./Attack.js";
import { megaDrain } from "../../data/audio.js";

export default class MegaDrain extends Attack {
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

    this.healthToAbsorb = 1;
  }

  // us the move
  useMove(attackerPos, attackStat, mult, recipient, renderedSprites) {
    let moveHit = 1;

    // use up pp
    this.pp -= 1;

    if (!this.hit(this.acc)) moveHit = 0;

    // calc damage
    let damage = this.damageCalc(attackStat, mult, this.type, recipient);

    if (damage <= 0) moveHit = 2;

    if (moveHit !== 1) return moveHit;

    if (damage > recipient.health)
      this.healthToAbsorb = Math.floor(recipient.health * 0.5);
    else this.healthToAbsorb = Math.floor(damage * 0.5);

    if (this.healthToAbsorb === 0) this.healthToAbsorb = 1;

    let x = 60;
    let y = 40;

    if (!recipient.isEnemy) {
      x = 40;
      y = 80;
    }

    // create attack sprite
    const megaDrainImage = new Image();
    megaDrainImage.src = "./images/attacks/MegaDrain.png";
    const megaDrainSprite = new Sprite({
      position: {
        x: recipient.position.x + x,
        y: recipient.position.y + y,
      },
      backSprite: megaDrainImage,
      size: recipient.size,
    });

    renderedSprites.splice(2, 0, megaDrainSprite);

    megaDrain.play();

    // animate sprite
    gsap.to(megaDrainSprite.position, {
      x: attackerPos.x + 60,
      y: attackerPos.y + 20,
      repeat: 1,

      onComplete: () => {
        // Enemy actually gets hit
        this.hitAndDamage(recipient, damage);
        renderedSprites.splice(2, 1);
      },
    });

    return moveHit;
  }
}
