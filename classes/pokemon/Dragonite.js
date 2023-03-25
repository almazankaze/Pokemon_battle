import Pokemon from "./Pokemon.js";
import BodySlam from "../attacks/BodySlam.js";
import ThunderBolt from "../attacks/ThunderBolt.js";
import IceBeam from "../attacks/IceBeam.js";
import HyperBeam from "../attacks/HyperBeam.js";

export default class Dragonite extends Pokemon {
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
    frames = { max: 7, hold: 9 },
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
    this.moves["BODY SLAM"] = new BodySlam(attacks[0]);
    this.moves["THUNDERBOLT"] = new ThunderBolt(attacks[1]);
    this.moves["ICE BEAM"] = new IceBeam(attacks[2]);
    this.moves["HYPERBEAM"] = new HyperBeam(attacks[3]);

    this.mustRecharge = false;
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
      case "THUNDERBOLT":
        mult = this.getMultiplier(this.stages[3]);
        this.didHit = this.moves["THUNDERBOLT"].useMove(
          this.stats[3],
          mult,
          recipient,
          renderedSprites
        );
        break;
      case "BODY SLAM":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["BODY SLAM"].useMove(
          this.position,
          this.stats[1],
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
      case "HYPERBEAM":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["HYPERBEAM"].useMove(
          this.position,
          this.stats[1],
          mult,
          recipient,
          renderedSprites
        );

        if (this.didHit) this.mustRecharge = true;
        break;
    }

    if (this.didHit != 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Ice":
        return 4;
      case "Rock":
      case "Dragon":
        return 2;
      case "Water":
      case "Bug":
      case "Fire":
      case "Fighting":
        return 0.5;
      case "Grass":
        return 0.25;
      case "Ground":
        return 0;
      default:
        return 1;
    }
  }

  chooseMove() {
    if (this.mustRecharge) {
      this.mustRecharge = false;
      return 5;
    }

    return Math.floor(Math.random() * 4);
  }
}
