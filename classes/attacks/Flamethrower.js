import Sprite from "../Sprite.js";
import Attack from "./Attack.js";
import { flamethrower } from "../../data/audio.js";

export default class Flamethrower extends Attack {
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
  useMove(attackerPos, attackStat, mult, recipient, renderedSprites) {
    let moveHit = 1;

    // use up pp
    this.pp -= 1;

    if (!this.hit(this.acc)) moveHit = 0;

    // calc damage
    let damage = this.damageCalc(attackStat, mult, this.type, recipient);

    if (damage <= 0) moveHit = 2;

    if (moveHit !== 1) return moveHit;

    let y = 100;

    if (recipient.size === 2) y = 80;

    // create attack sprite
    const fireballImage = new Image();
    fireballImage.src = "./images/attacks/Fire.png";
    const fireball = new Sprite({
      position: {
        x: attackerPos.x + 40,
        y: attackerPos.y + y,
      },
      backSprite: fireballImage,
      size: recipient.size,
    });

    const twinFireImage = new Image();
    twinFireImage.src = "./images/attacks/twinFire.png";
    const twinFire = new Sprite({
      position: {
        x: recipient.position.x,
        y: recipient.position.y + 40,
      },
      backSprite: twinFireImage,
      size: recipient.size,
    });

    renderedSprites.splice(2, 0, fireball);

    flamethrower.play();

    // animate sprite
    gsap.to(fireball.position, {
      x: recipient.position.x + 60,
      y: recipient.position.y + 20,
      repeat: 2,

      onComplete: () => {
        renderedSprites.splice(2, 1);
        renderedSprites.splice(2, 0, twinFire);
        gsap.to(twinFire.position, {
          x: recipient.position.x + 80,

          onComplete: () => {
            // Enemy actually gets hit
            this.hitAndDamage(recipient, damage);
            renderedSprites.splice(2, 1);
          },
        });
      },
    });

    return moveHit;
  }
}
