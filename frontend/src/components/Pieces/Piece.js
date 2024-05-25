import "./Pieces.css";
import { generatePossibleMoves } from "./PiecesHelper";

const pieceColorMap = {
  w: "White",
  b: "Black",
};

export const getLegalMoves = (rank, file, gameState) => {
  const from = `${String.fromCharCode(97 + Number(file))}${Number(rank) + 1}`;
  try {
    const pieceData = gameState.pieces.find((p) => p.position === from);

    return pieceData.possibleMoves;
  } catch (error) {
    const pieceData = generatePossibleMoves(from);
    return pieceData;
  }
};

const isDraggable = (piece, gameState) => {
  let pieceToMove = pieceColorMap[piece[0]];
  if (!gameState) {
    if (pieceToMove === "White") {
      return true;
    }
    return false;
  }

  return gameState.onMove === pieceColorMap[piece[0]];
};

const Piece = ({ rank, file, piece, gameState }) => {
  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    console.log(gameState);
    try {
      const legalMoves = getLegalMoves(rank, file, gameState);
      console.log("Legal moves " + legalMoves);
      legalMoves.forEach((move) => {
        const square = document.querySelector(`.square-${move}`);
        console.log(square);
        if (square) {
          square.classList.add("highlight");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDragEnd = (e) => {
    const highlightedSquares = document.querySelectorAll(".highlight");
    console.log("Game state is");
    console.log(gameState);
    console.log("Highlighted squares are");
    console.log(piece);
    highlightedSquares.forEach((square) => {
      square.classList.remove("highlight");
    });
  };

  return (
    <div
      className={`piece ${piece} p-${file}${rank}`}
      draggable={isDraggable(piece, gameState)}
      onDragStart={isDraggable(piece, gameState) ? onDragStart : null}
      onDragEnd={isDraggable(piece, gameState) ? onDragEnd : null}
    />
  );
};

export default Piece;
