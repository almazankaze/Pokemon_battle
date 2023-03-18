import Pokemon from "./Pokemon.js";
import Rest from "../attacks/Rest.js";
import BodySlam from "../attacks/BodySlam.js";
import Earthquake from "../attacks/Earthquake.js";
import IceBeam from "../attacks/IceBeam.js";

export default class Snorlax extends Pokemon {
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
    this.moves["EARTHQUAKE"] = new Earthquake(attacks[0]);
    this.moves["REST"] = new Rest(attacks[1]);
    this.moves["BODY SLAM"] = new BodySlam({
      ...attacks[2],
      isStab: true,
    });
    this.moves["ICE BEAM"] = new IceBeam(attacks[3]);
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
      case "EARTHQUAKE":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["EARTHQUAKE"].useMove(
          this.position,
          this.stats[1],
          mult,
          recipient
        );
        break;
      case "REST":
        this.didHit = this.moves["REST"].useMove(
          this.health,
          this.stats[0],
          this.position,
          this.size,
          this.isEnemy,
          renderedSprites
        );

        if (this.didHit === 1) {
          this.recoverHealth(this.stats[0]);
          this.status = "sleeping";
          this.sleepCounter = 2;

          if (this.isEnemy)
            document.querySelector("#enemyStatus").innerHTML = "SLP";
          else document.querySelector("#playerStatus").innerHTML = "SLP";
        }
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
    }

    if (this.didHit !== 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Fighting":
        return 2;
      case "Ghost":
        return 0;
      default:
        return 1;
    }
  }
}
