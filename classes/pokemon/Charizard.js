import Pokemon from "./Pokemon.js";
import BodySlam from "../attacks/BodySlam.js";
import Earthquake from "../attacks/Earthquake.js";
import SwordDance from "../attacks/SwordDance.js";
import Flamethrower from "../attacks/Flamethrower.js";

export default class Charizard extends Pokemon {
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
    this.moves["BODY SLAM"] = new BodySlam(attacks[0]);
    this.moves["FLAMETHROWER"] = new Flamethrower({
      ...attacks[1],
      isStab: true,
    });
    this.moves["EARTHQUAKE"] = new Earthquake(attacks[2]);
    this.moves["SWORD DANCE"] = new SwordDance(attacks[3]);
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
      case "FLAMETHROWER":
        mult = this.getMultiplier(this.stages[3]);
        this.didHit = this.moves["FLAMETHROWER"].useMove(
          this.position,
          this.stats[3],
          mult,
          recipient,
          renderedSprites
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
      case "SWORD DANCE":
        this.stages[1] = this.moves["SWORD DANCE"].useMove(
          this.position,
          this.size,
          this.stages[1],
          renderedSprites
        );
        this.didHit = 1;
        break;
    }

    if (this.didHit !== 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Rock":
        return 4;
      case "Water":
      case "Electric":
        return 2;
      case "Ground":
        return 0;
      case "Bug":
      case "Grass":
        return 0.25;
      case "Fighting":
      case "Steel":
      case "Fire":
      case "Fairy":
        return 0.5;
      default:
        return 1;
    }
  }
}
