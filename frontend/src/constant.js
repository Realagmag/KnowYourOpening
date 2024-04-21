import { CreatePosition } from "./helper";

export const initGameState = {
  position: [await CreatePosition()],
  turn: "w",
};
