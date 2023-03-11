import { initBattle, animateBattle } from "./battleScene.js";
import { battle } from "./data/audio.js";

let clicked = false;

// starts everything
function startGame() {
  gsap.to("#transitionBg", {
    opacity: 1,
    repeat: 3,
    yoyo: true,
    duration: 0.4,
    onComplete() {
      gsap.to("#transitionBg", {
        opacity: 1,
        duration: 0.4,
        onComplete() {
          // activate a new animation loop
          initBattle();
          animateBattle();
          gsap.to("#transitionBg", {
            opacity: 0,
            duration: 0.4,
          });
        },
      });
    },
  });
}

// starts game when user clicks screen
addEventListener("pointerdown", () => {
  if (!clicked) {
    battle.play();
    clicked = true;
    startGame();
  }
});
