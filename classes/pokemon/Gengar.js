import Pokemon from "./Pokemon.js";
import Psychic from "../attacks/Psychic.js";
import NightShade from "../attacks/NightShade.js";
import Hypnosis from "../attacks/Hypnosis.js";
import MegaDrain from "../attacks/MegaDrain.js";

export default class Gengar extends Pokemon {
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

    this.attacks = attacks;
    this.moves = {};
    this.moves["PSYCHIC"] = new Psychic(attacks[0]);
    this.moves["MEGA DRAIN"] = new MegaDrain(attacks[1]);
    this.moves["HYPNOSIS"] = new Hypnosis(attacks[2]);
    this.moves["NIGHT SHADE"] = new NightShade(attacks[3]);
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
          this.position,
          this.stats[3],
          mult,
          recipient,
          renderedSprites
        );
        break;
      case "MEGA DRAIN":
        mult = this.getMultiplier(this.stages[3]);
        this.didHit = this.moves["MEGA DRAIN"].useMove(
          this.position,
          this.stats[3],
          mult,
          recipient,
          renderedSprites
        );
        break;
      case "HYPNOSIS":
        this.didHit = this.moves["HYPNOSIS"].useMove(recipient);
        break;
      case "NIGHT SHADE":
        this.didHit = this.moves["NIGHT SHADE"].useMove(recipient);
        break;
    }

    if (this.didHit != 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Ground":
      case "Psychic":
      case "Ghost":
        return 2;
      case "Bug":
      case "Grass":
        return 0.5;
      case "Poison":
        return 0.25;
      case "Normal":
      case "Fighting":
        return 0;
      default:
        return 1;
    }
  }

  getHpToAbsorb() {
    return this.megaDrain.healthToAbsorb;
  }
}
