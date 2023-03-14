export const battle = new Howl({
  src: "./audio/battleTheme.mp3",
  html5: true,
  volume: 0.3,
  loop: true,
});

export const bodySlam = new Howl({
  src: "./audio/attacks/body-slam.wav",
  html5: true,
  volume: 0.3,
  loop: false,
});

export const earthquake = new Howl({
  src: "./audio/attacks/earthquake.wav",
  html5: true,
  volume: 0.3,
  loop: false,
});

export const hit = new Howl({
  src: "./audio/other/get-hit.wav",
  html5: true,
  volume: 0.3,
  loop: false,
});

export const pokemonCry = {
  BLASTOISE: new Howl({
    src: "./audio/pokemon/audio_blastoise.wav",
    html5: true,
    volume: 0.3,
    loop: false,
  }),
};
