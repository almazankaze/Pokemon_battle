import Pokemon from "./Pokemon.js";
import HydroPump from "../attacks/HydroPump.js";
import ThunderBolt from "../attacks/ThunderBolt.js";
import DragonRage from "../attacks/DragonRage.js";
import IceBeam from "../attacks/IceBeam.js";

export default class Gyarados extends Pokemon {
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
    this.moves["THUNDERBOLT"] = new ThunderBolt(attacks[0]);
    this.moves["HYDRO PUMP"] = new HydroPump({ ...attacks[1], isStab: true });
    this.moves["ICE BEAM"] = new IceBeam(attacks[2]);
    this.moves["DRAGON RAGE"] = new DragonRage(attacks[3]);
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
      case "HYDRO PUMP":
        mult = this.getMultiplier(this.stages[3]);
        this.didHit = this.moves["HYDRO PUMP"].useMove(
          this.stats[3],
          mult,
          recipient,
          renderedSprites
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
      case "DRAGON RAGE":
        this.didHit = this.moves["DRAGON RAGE"].useMove(
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
      case "Electric":
        return 4;
      case "Rock":
        return 2;
      case "Water":
      case "Bug":
      case "Fire":
      case "Fighting":
        return 0.5;
      case "Ground":
        return 0;
      default:
        return 1;
    }
  }
}
