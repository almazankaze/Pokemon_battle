import Attack from "./Attack.js";
import { hypnosis } from "../../data/audio.js";

export default class Hypnosis extends Attack {
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
  useMove(recipient) {
    let moveHit = 1;

    // use up pp
    this.pp -= 1;

    if (!this.hit(this.acc)) moveHit = 0;

    if (recipient.status != "healthy") moveHit = 3;

    if (moveHit !== 1) return moveHit;

    hypnosis.play();

    gsap.to("#transitionBg", {
      opacity: 1,
      repeat: 1,
      yoyo: true,
      duration: 0.4,
      onComplete: () => {
        gsap.to("#transitionBg", {
          opacity: 1,
          duration: 0.4,
          onComplete: () => {
            document.querySelector("#menu").classList.remove("loading");
            gsap.to("#transitionBg", {
              opacity: 0,
              duration: 0.4,
            });
          },
        });
      },
    });

    return moveHit;
  }
}
