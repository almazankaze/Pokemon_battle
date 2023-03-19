import Pokemon from "./Pokemon.js";
import Rest from "../attacks/Rest.js";
import ThunderBolt from "../attacks/ThunderBolt.js";
import DoubleKick from "../attacks/DoubleKick.js";

export default class Jolteon extends Pokemon {
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
    this.moves["REST"] = new Rest(attacks[0]);
    this.moves["THUNDERBOLT"] = new ThunderBolt({
      ...attacks[1],
      isStab: true,
    });
    this.moves["DOUBLE KICK"] = new DoubleKick(attacks[2]);
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
      case "REST":
        this.didHit = this.moves["REST"].useMove(this.health, this.stats[0]);

        if (this.didHit === 1) {
          this.recoverHealth(this.stats[0]);
          this.status = "sleeping";
          this.sleepCounter = 2;

          if (this.isEnemy)
            document.querySelector("#enemyStatus").innerHTML = "SLP";
          else document.querySelector("#playerStatus").innerHTML = "SLP";
        }

        break;
      case "THUNDERBOLT":
        mult = this.getMultiplier(this.stages[3]);
        this.didHit = this.moves["THUNDERBOLT"].useMove(
          this.stats[3],
          mult,
          recipient,
          renderedSprites
        );
        break;
      case "DOUBLE KICK":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["DOUBLE KICK"].useMove(
          this.stats[1],
          mult,
          recipient,
          renderedSprites
        );

        break;
      case "THUNDERWAVE":
        this.didHit = this.moves["THUNDERWAVE"].useMove(
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
      case "Ground":
        return 2;
      case "Flying":
      case "Electric":
        return 0.5;
      default:
        return 1;
    }
  }
}
