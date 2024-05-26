import axios from "axios";
import { useOpening } from '../../contexts/OpeningContext';

let sequence = null;


export function generatePossibleMoves(startingSquare) {
  const file = startingSquare[0];
  const rank = startingSquare[1];

  if (rank === "2") {
    return [`${file}3`, `${file}4`];
  } else if (startingSquare === "b1") {
    return ["c3", "a3"];
  } else if (startingSquare === "g1") {
    return ["h3", "f3"];
  } else {
    return [];
  }
}
