import Pokemon from "./Pokemon.js";
import BodySlam from "../attacks/BodySlam.js";
import Earthquake from "../attacks/Earthquake.js";
import SeismicToss from "../attacks/SeismicToss.js";
import LowKick from "../attacks/LowKick.js";

export default class Machamp extends Pokemon {
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
    frames = { max: 8, hold: 8 },
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
    this.moves["EARTHQUAKE"] = new Earthquake(attacks[0]);
    this.moves["BODY SLAM"] = new BodySlam(attacks[1]);
    this.moves["SEISMIC TOSS"] = new SeismicToss(attacks[2]);
    this.moves["LOW KICK"] = new LowKick({ ...attacks[3], isStab: true });
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
      case "BODY SLAM":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["BODY SLAM"].useMove(
          this.position,
          this.stats[1],
          mult,
          recipient
        );
        break;
      case "EARTHQUAKE":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["EARTHQUAKE"].useMove(
          this.position,
          this.stats[1],
          mult,
          recipient
        );
        break;
      case "SEISMIC TOSS":
        this.didHit = this.moves["SEISMIC TOSS"].useMove(
          recipient,
          renderedSprites
        );
        break;
      case "LOW KICK":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["LOW KICK"].useMove(
          this.stats[1],
          mult,
          recipient,
          renderedSprites
        );
        break;
    }

    if (this.didHit !== 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Psychic":
      case "Flying":
        return 2;
      case "Bug":
      case "Rock":
      case "Dark":
        return 0.5;
      default:
        return 1;
    }
  }

  chooseMove() {
    return Math.floor(Math.random() * 4);
  }
}
