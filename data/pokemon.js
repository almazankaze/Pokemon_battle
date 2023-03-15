import { attacks } from "./attacks.js";
import { Types } from "../constants/Types.js";

export const pokemon = {
  Charizard: {
    position: {
      x: 25,
      y: 152,
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
      x: 280,
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
};
