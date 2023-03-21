import Sprite from "../Sprite.js";
import Attack from "./Attack.js";
import { hyperBeam } from "../../data/audio.js";

export default class HyperBeam extends Attack {
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

    let rotation = 0;
    let pX = 140;
    let pY = -40;

    if (recipient.size === 2) pX = 100;

    if (!recipient.isEnemy) {
      rotation = -3.15;
      pX = 10;
      pY = 180;

      if (recipient.size === 2) {
        pY = 110;
        pX = -50;
      }
    }

    const beamImg = new Image();
    beamImg.src = "./images/attacks/hyperBeam.png";
    const beam = new Sprite({
      position: {
        x: attackerPos.x + pX,
        y: attackerPos.y + pY,
      },
      backSprite: beamImg,
      size: recipient.size,
      rotation,
      frames: {
        max: 4,
        hold: 10,
      },
      animate: true,
    });

    const beam2Img = new Image();
    beam2Img.src = "./images/attacks/hyperBeam2.png";
    const beam2 = new Sprite({
      position: {
        x: attackerPos.x + pX,
        y: attackerPos.y + pY,
      },
      backSprite: beam2Img,
      size: recipient.size,
      rotation,
      frames: {
        max: 8,
        hold: 7,
      },
      animate: true,
    });

    renderedSprites.splice(2, 0, beam);

    hyperBeam.play();

    gsap.to(recipient.position, {
      x: recipient.position.x + 10,
      yoyo: true,
      repeat: 13,
      duration: 0.08,
    });

    gsap.to(attackerPos, {
      x: attackerPos.x + 10,
      yoyo: true,
      repeat: 13,
      duration: 0.08,
    });

    gsap.to(beam, {
      duration: 0.45,
      onComplete: () => {
        renderedSprites.splice(2, 1);
        renderedSprites.splice(2, 0, beam2);

        gsap.to(beam2, {
          duration: 0.8,
          onComplete: () => {
            this.hitAndDamage(recipient, damage);
            renderedSprites.splice(2, 1);
          },
        });
      },
    });

    return moveHit;
  }
}
