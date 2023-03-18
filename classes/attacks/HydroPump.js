import Sprite from "../Sprite.js";
import Attack from "./Attack.js";
import { hydroPump } from "../../data/audio.js";

export default class HydroPump extends Attack {
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
  useMove(attackStat, mult, recipient, renderedSprites) {
    let moveHit = 1;

    // use up pp
    this.pp -= 1;

    if (!this.hit(this.acc)) moveHit = 0;

    // calc damage
    let damage = this.damageCalc(attackStat, mult, this.type, recipient);

    if (damage <= 0) moveHit = 2;

    if (moveHit !== 1) return moveHit;

    let x = 100;

    if (recipient.size === 2) x = 60;

    const hydroPumpImage = new Image();
    hydroPumpImage.src = "./images/attacks/hydropumpStart.png";
    const hydroPumpBeg = new Sprite({
      position: {
        x: recipient.position.x,
        y: recipient.position.y + 25,
      },
      backSprite: hydroPumpImage,
      size: recipient.size,
      frames: {
        max: 5,
        hold: 10,
      },
      animate: true,
    });

    const hydroPumpEndImage = new Image();
    hydroPumpEndImage.src = "./images/attacks/hydropumpEnd.png";
    const hydroPumpEnd = new Sprite({
      position: {
        x: recipient.position.x,
        y: recipient.position.y + 25,
      },
      backSprite: hydroPumpEndImage,
      size: recipient.size,
      frames: {
        max: 2,
        hold: 10,
      },
      animate: true,
    });
    hydroPumpEnd.opacity = 0;

    const hydroPump2 = new Sprite({
      position: {
        x: hydroPumpBeg.position.x + x,
        y: recipient.position.y + 25,
      },
      backSprite: hydroPumpImage,
      size: recipient.size,
      frames: {
        max: 5,
        hold: 10,
      },
      animate: true,
    });

    const hydroPumpEnd2 = new Sprite({
      position: {
        x: hydroPumpBeg.position.x + x,
        y: recipient.position.y + 25,
      },
      backSprite: hydroPumpEndImage,
      size: recipient.size,
      frames: {
        max: 2,
        hold: 10,
      },
      animate: true,
    });
    hydroPumpEnd2.opacity = 0;

    renderedSprites.splice(2, 0, hydroPumpEnd);
    renderedSprites.splice(2, 0, hydroPumpBeg);
    renderedSprites.splice(2, 0, hydroPumpEnd2);
    renderedSprites.splice(2, 0, hydroPump2);

    hydroPump.play();

    const t = gsap.timeline();
    t.to(hydroPumpBeg, {
      duration: 0.2,
      repeat: 1,
      onComplete: () => {
        hydroPumpBeg.opacity = 0;
        hydroPumpEnd.opacity = 1;

        gsap.to(hydroPumpEnd, {
          duration: 1,
          repeat: 1,
          onComplete: () => {
            hydroPumpEnd.opacity = 0;
            hydroPumpBeg.opacity = 1;
          },
        });
      },
    }).to(
      hydroPump2,
      {
        duration: 0.2,
        repeat: 1,
        onComplete: () => {
          hydroPump2.opacity = 0;
          hydroPumpEnd2.opacity = 1;

          gsap.to(hydroPumpEnd2, {
            duration: 1,
            repeat: 1,
            onComplete: () => {
              hydroPumpEnd2.opacity = 0;
              hydroPump2.opacity = 1;

              this.hitAndDamage(recipient, damage);

              renderedSprites.splice(2, 1);
              renderedSprites.splice(2, 1);
              renderedSprites.splice(2, 1);
              renderedSprites.splice(2, 1);
            },
          });
        },
      },
      "<"
    );

    return moveHit;
  }
}
