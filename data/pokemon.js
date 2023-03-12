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
      attacks.BODYSLAM,
      attacks.HYDROPUMP,
      attacks.ICEBEAM,
      attacks.REST,
    ],
    size: 3,
  },
};
