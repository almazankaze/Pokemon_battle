import { attacks } from "./attacks.js";
import { Types } from "../constants/Types.js";

export const pokemon = {
  Charizard: {
    position: {
      x: 25,
      y: 128,
    },
    name: "CHARIZARD",
    health: 152,
    stats: [152, 104, 98, 105, 120],
    backSprite: {
      src: "../images/pokemon/charBack.png",
    },
    frontSprite: {
      src: "../images/pokemon/charizard.png",
    },
    types: [Types.FIRE, Types.FLYING],
    attacks: [
      attacks.BODYSLAM,
      attacks.FLAMETHROWER,
      attacks.EARTHQUAKE,
      attacks.SWORDDANCE,
    ],
    size: 3,
  },
  Blastoise: {
    position: {
      x: 290,
      y: 10,
    },
    name: "BLASTOISE",
    health: 154,
    stats: [154, 103, 120, 105, 98],
    backSprite: {
      src: "../images/pokemon/blastBack.png",
    },
    frontSprite: {
      src: "../images/pokemon/blastoise.png",
    },
    types: [Types.WATER],
    attacks: [
      attacks.EARTHQUAKE,
      attacks.HYDROPUMP,
      attacks.ICEBEAM,
      attacks.REST,
    ],
    size: 3,
  },
  Rhydon: {
    position: {
      x: 290,
      y: 10,
    },
    name: "RHYDON",
    health: 180,
    stats: [180, 150, 140, 65, 60],
    backSprite: {
      src: "../images/pokemon/rhydon.png",
    },
    frontSprite: {
      src: "../images/pokemon/rhydon.png",
    },
    types: [Types.ROCK],
    attacks: [
      attacks.EARTHQUAKE,
      attacks.BODYSLAM,
      attacks.ROCKSLIDE,
      attacks.REST,
    ],
    size: 3,
  },

  Mew: {
    position: {
      x: 25,
      y: 128,
    },
    name: "MEW",
    health: 175,
    stats: [175, 120, 120, 120, 120],
    backSprite: {
      src: "./images/pokemon/MewBack.png",
    },
    frontSprite: {
      src: "./images/pokemon/Mew.png",
    },
    types: [Types.PSYCHIC],
    attacks: [
      attacks.SWORDDANCE,
      attacks.EARTHQUAKE,
      attacks.BODYSLAM,
      attacks.RECOVER,
    ],
    size: 3,
  },
  Snorlax: {
    position: {
      x: 25,
      y: 128,
    },
    name: "SNORLAX",
    health: 245,
    stats: [245, 130, 85, 85, 50],
    backSprite: {
      src: "./images/pokemon/snorlaxBack.png",
    },
    frontSprite: {
      src: "./images/pokemon/snorlaxFront.png",
    },
    types: [Types.NORMAL],
    attacks: [
      attacks.EARTHQUAKE,
      attacks.REST,
      attacks.BODYSLAM,
      attacks.ICEBEAM,
    ],
    size: 3,
  },
  Exeggutor: {
    position: {
      x: 290,
      y: 10,
    },
    name: "EXEGGUTOR",
    health: 170,
    stats: [170, 115, 105, 145, 75],
    backSprite: {
      src: "./images/pokemon/exeggutor.png",
    },
    frontSprite: {
      src: "./images/pokemon/exeggutor.png",
    },
    types: [Types.GRASS, Types.PSYCHIC],
    attacks: [
      attacks.PSYCHIC,
      attacks.STOMP,
      attacks.SLEEPPOWDER,
      attacks.MEGADRAIN,
    ],
    size: 3,
  },
  Mewtwo: {
    position: {
      x: 290,
      y: 10,
    },
    name: "MEWTWO",
    health: 181,
    stats: [181, 130, 110, 174, 150],
    backSprite: {
      src: "./images/pokemon/mewtwo.png",
    },
    frontSprite: {
      src: "./images/pokemon/mewtwo.png",
    },
    types: [Types.PSYCHIC],
    attacks: [
      attacks.PSYCHIC,
      attacks.ICEBEAM,
      attacks.AMNESIA,
      attacks.RECOVER,
    ],
    size: 3,
  },
  Jolteon: {
    position: {
      x: 25,
      y: 128,
    },
    name: "JOLTEON",
    health: 140,
    stats: [140, 85, 80, 130, 150],
    backSprite: {
      src: "./images/pokemon/joltBack.png",
    },
    frontSprite: {
      src: "./images/pokemon/jolteon.png",
    },
    types: [Types.ELECTRIC],
    attacks: [
      attacks.REST,
      attacks.THUNDERBOLT,
      attacks.DOUBLEKICK,
      attacks.THUNDERWAVE,
    ],
    size: 3,
  },
};
