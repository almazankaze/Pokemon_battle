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
};
