import Pokemon from "./Pokemon.js";
import Psychic from "../attacks/Psychic.js";
import Stomp from "../attacks/Stomp.js";
import SleepPowder from "../attacks/SleepPowder.js";
import MegaDrain from "../attacks/MegaDrain.js";

export default class Exeggutor extends Pokemon {
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
    frames = { max: 3, hold: 15 },
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
    this.moves["STOMP"] = new Stomp(attacks[1]);
    this.moves["SLEEP POWDER"] = new SleepPowder(attacks[2]);
    this.moves["MEGA DRAIN"] = new MegaDrain({ ...attacks[3], isStab: true });
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
      case "STOMP":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["STOMP"].useMove(
          this.stats[1],
          mult,
          recipient,
          renderedSprites
        );
        break;
      case "SLEEP POWDER":
        this.didHit = this.moves["SLEEP POWDER"].useMove(
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
    }

    if (this.didHit != 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Bug":
        return 4;
      case "Fire":
      case "Ice":
      case "Poison":
      case "Flying":
      case "Ghost":
        return 2;
      case "Water":
      case "Electric":
      case "Grass":
      case "Fighting":
      case "Ground":
      case "Psychic":
        return 0.5;
      default:
        return 1;
    }
  }

  chooseMove() {
    return Math.floor(Math.random() * 4);
  }

  getHpToAbsorb() {
    return this.moves["MEGA DRAIN"].healthToAbsorb;
  }
}
