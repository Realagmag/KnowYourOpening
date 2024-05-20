import "./Pieces.css";
import { generatePossibleMoves } from "./PiecesHelper";


export const getLegalMoves = (rank, file, gameState) => {
  const from = `${String.fromCharCode(97 + Number(file))}${Number(rank) + 1}`;
  try {
    const pieceData = gameState.pieces.find(p => p.position === from);

    return pieceData.possibleMoves;
  } catch (error) {
    const pieceData = generatePossibleMoves(from);
    return pieceData;
  }
};

const Piece = ({ rank, file, piece, gameState}) => {
  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    console.log(gameState);
    try {
      const legalMoves =  getLegalMoves(rank, file, gameState);
      console.log("Legal moves " + legalMoves);
      legalMoves.forEach(move => {
        const square = document.querySelector(`.square-${move}`);
        console.log(square)
        if (square) {
          square.classList.add('highlight');
        }
      });
    } catch (error) {
      console.error(error);
    }
    // setTimeout(() => (e.target.style.display = "none"), 0);
  };

  const onDragEnd = (e) => {
    const highlightedSquares = document.querySelectorAll('.highlight');
    highlightedSquares.forEach(square => {
      square.classList.remove('highlight');
    });
  };

  return (
    <div
      className={`piece ${piece} p-${file}${rank}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Piece;
