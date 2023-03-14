export default class Messages {
  constructor() {
    this.dialogueBox = document.querySelector("#dialogueBox");
  }

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

  missedMess(pokemon) {
    let enemy = pokemon.isEnemy ? "Enemy" : "";
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML = enemy + " " + pokemon.name + " Missed!";
  }

  effectivenessMess(effectiveness) {
    this.dialogueBox.style.display = "block";

    if (effectiveness > 1) this.dialogueBox.innerHTML = "It's super effective!";
    else if (effectiveness === 0)
      this.dialogueBox.innerHTML = "It had no effect!";
    else if (effectiveness > 0 && effectiveness < 1)
      this.dialogueBox.innerHTML = "It's not very effective!";
  }

  immuneMess(pokemon) {
    let enemy = pokemon.isEnemy ? "Enemy" : "";
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML =
      " It doesn't affect " + enemy + " " + pokemon.name;
    document.querySelector("#menu").classList.remove("loading");
  }

  failMess() {
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML = "The move failed!";
    document.querySelector("#menu").classList.remove("loading");
  }

  criticalMess() {
    this.dialogueBox.style.display = "block";
    this.dialogueBox.innerHTML = "It's a critical hit!";
  }
}
