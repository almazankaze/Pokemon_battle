import Pokemon from "./Pokemon.js";
import { blastoiseCry } from "../../data/audio.js";

export default class Blastoise extends Pokemon {
  constructor({
    name,
    health,
    attacks,
    types,
    status,
    stats,
    isEnemy,
    position,
    frontSprite,
    backSprite,
    frames,
    sprites,
    animate,
    rotation,
    size,
  }) {
    super({
      name,
      health,
      types,
      status,
      stats,
      isEnemy,
      position,
      frontSprite,
      backSprite,
      frames,
      sprites,
      animate,
      rotation,
      size,
    });

    if (this.isEnemy) {
      this.frames = { ...this.frames, max: 5, hold: 10 };
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Grass":
      case "Electric":
        return 2;
      case "Water":
      case "Steel":
      case "Fire":
      case "Ice":
        return 0.5;
      default:
        return 1;
    }
  }

  animateEntrance() {
    this.animate = true;
    blastoiseCry.play();

    const t = gsap.timeline();

    t.to(this.frontSprite, {
      duration: 0.4,
      repeat: 1,

      onComplete: () => {
        this.animate = false;
      },
    });
  }
}
