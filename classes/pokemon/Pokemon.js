import Sprite from "../Sprite.js";

export default class Pokemon extends Sprite {
  constructor({
    name,
    health,
    types,
    status = "healthy",
    stats,
    isEnemy = false,
    position,
    frontSprite,
    backSprite,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    size,
  }) {
    super({
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

    this.name = name;
    this.health = health;
    this.types = types;
    this.status = status;
    this.stats = stats;
    this.didHit = false;
    this.gotCrit = false;
    this.stages = [0, 0, 0, 0, 0];
    this.sleepCounter = 0;
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
