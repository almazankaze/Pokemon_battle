import Pokemon from "./Pokemon.js";
import IceBeam from "../attacks/IceBeam.js";
import Recover from "../attacks/Recover.js";
import Psychic from "../attacks/Psychic.js";
import Amnesia from "../attacks/Amnesia.js";

export default class MewTwo extends Pokemon {
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
    frames = { max: 6, hold: 10 },
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

    this.attacks = attacks;
    this.moves = {};
    this.moves["PSYCHIC"] = new Psychic({ ...attacks[0], isStab: true });
    this.moves["ICE BEAM"] = new IceBeam(attacks[1]);
    this.moves["AMNESIA"] = new Amnesia(attacks[2]);
    this.moves["RECOVER"] = new Recover(attacks[3]);
  }

  getMovePP(attack) {
    return this.moves[attack.name].pp;
  }

  attack({ attack, recipient, renderedSprites }) {
    // display dialogueBox
    let a = recipient.isEnemy ? "" : "Enemy";
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").innerHTML =
      a + " " + this.name + " used " + attack.name + "!";

    document.querySelector("#menu").classList.add("loading");

    let rotation = 1;
    if (this.isEnemy) rotation = -2.2;

    let mult;

    switch (attack.name) {
      case "PSYCHIC":
        mult = this.getMultiplier(this.stages[3]);
        this.didHit = this.moves["PSYCHIC"].useMove(
          this.stats[3],
          mult,
          recipient
        );
        break;
      case "ICE BEAM":
        mult = this.getMultiplier(this.stages[3]);
        this.didHit = this.moves["ICE BEAM"].useMove(
          this.position,
          this.stats[3],
          mult,
          recipient,
          renderedSprites
        );
        break;
      case "AMNESIA":
        this.stages[3] = this.moves["AMNESIA"].useMove(
          this.position,
          this.size,
          this.stages[3],
          renderedSprites
        );
        this.didHit = 1;
        break;
      case "RECOVER":
        this.didHit = this.moves["RECOVER"].useMove(this.health, this.stats[0]);

        if (this.didHit === 1) {
          gsap.to(this, {
            opacity: 0,
            repeat: 10,
            yoyo: true,
            duration: 0.1,
            onComplete: () => {
              this.opacity = 1;
              this.recoverHealth(Math.floor(this.stats[0] / 2));
            },
          });
        }
        break;
    }

    if (this.didHit != 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Bug":
      case "Ghost":
        return 2;
      case "Fighting":
      case "Psychic":
        return 0.5;
      default:
        return 1;
    }
  }

  chooseMove() {
    let dangerHealth = Math.floor(this.stats[0] * 0.25);

    if (this.health <= dangerHealth) {
      return 3;
    }

    return Math.floor(Math.random() * 3);
  }
}
