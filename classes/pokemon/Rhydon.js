import Pokemon from "./Pokemon.js";
import BodySlam from "../attacks/BodySlam.js";
import Earthquake from "../attacks/Earthquake.js";
import RockSlide from "../attacks/RockSlide.js";
import Rest from "../attacks/Rest.js";

export default class Rhydon extends Pokemon {
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
    frames = { max: 5, hold: 15 },
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
    this.moves["EARTHQUAKE"] = new Earthquake({ ...attacks[0], isStab: true });
    this.moves["BODY SLAM"] = new BodySlam(attacks[1]);
    this.moves["ROCK SLIDE"] = new RockSlide({ ...attacks[2], isStab: true });
    this.moves["REST"] = new Rest(attacks[3]);
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
      case "ROCK SLIDE":
        mult = this.getMultiplier(this.stages[1]);
        this.didHit = this.moves["ROCK SLIDE"].useMove(
          this.position,
          this.stats[1],
          mult,
          recipient,
          renderedSprites
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
    }

    if (this.didHit !== 1) {
      document.querySelector("#menu").classList.remove("loading");
    }
  }

  getWeakness(attackType) {
    switch (attackType) {
      case "Grass":
      case "Water":
        return 4;
      case "Fighting":
      case "Ground":
      case "Ice":
        return 2;
      case "Electric":
        return 0;
      case "Normal":
      case "Flying":
      case "Fire":
      case "Rock":
        return 0.5;
      case "Poison":
        return 0.25;
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
