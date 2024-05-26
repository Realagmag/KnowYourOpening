import axios from "axios";

export const getCharacter = (file) => String.fromCharCode(file + 96);

export async function fetchGameState(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get("http://localhost:8080/game/new", config);
  const pieces = processPiecesData(data.pieces);
  return {
    position: [pieces],
    turn: "w",
  };
}

export function processPiecesData(data) {
  const chessboard = new Array(8).fill("").map(() => new Array(8).fill(""));

  data.forEach((piece) => {
    const file = piece.position.charCodeAt(0) - 97;
    const rank = parseInt(piece.position.charAt(1)) - 1;

    chessboard[rank][file] =
      piece.color.charAt(0).toLowerCase() +
      (piece.type.charAt(0).toLowerCase() === "k"
        ? piece.type.charAt(1) === "i"
          ? "K"
          : "N"
        : piece.type.charAt(0).toUpperCase());
  });

  return chessboard;
}

export const copyPosition = (position) => {
  const newPosition = new Array(8)
    .fill(null)
    .map((x) => new Array(8).fill(null));

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++)
      newPosition[rank][file] = position[rank][file];
  }
  return newPosition;
};
