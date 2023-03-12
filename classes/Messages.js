export default class Messages {
  startMessage() {
    return "Enemy Trainer wants to battle!";
  }

  sendOutPokemon(name, isEnemy) {
    if (isEnemy) return `Enemy trainer sent out ${name}!`;

    return `Go ${name}!`;
  }

  useMove(name, moveName, isEnemy) {
    let enemy = "";

    if (isEnemy) enemy = "Enemy";

    return enemy + ` ${name} used ${moveName}!`;
  }

  moveMissed(name, isEnemy) {
    let enemy = "";

    if (isEnemy) enemy = "Enemy";

    return enemy + ` ${name} missed!`;
  }
}
