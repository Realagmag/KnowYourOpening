import "./Pieces.css";
import Piece from "./Piece";
import { useRef, useState } from "react";
import { copyPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { makeNewMove } from "../../reducer/actions/move";
import axios from "axios";
import { getLegalMoves } from "./Piece";
import { getCorrectMove, generateStartingPossibleMoves } from "./PiecesHelper";
import { faThermometerThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext"; // adjust the path as needed

const Pieces = () => {
  const ref = useRef();
  const { appState, dispatch } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [isSequenceEnded, setIsSequenceEnded] = useState(false);
  const { setNotification } = useContext(NotificationContext);

  const currentPosition = appState.position[appState.position.length - 1];
  /**
   * Converts rank and file to coordinates of board array.
   *
   * @param {number} rank - The rank value.
   * @param {number} file - The file value.
   * @returns {Object} - The coordinates object with x and y properties.
   */
  function convertRankFileToCoords(rank, file) {
    const x = Number(rank);
    const y = Number(file);
    return { x, y };
  }

  const calculateCoords = (e) => {
    const { top, left, width } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const x = 7 - Math.floor((e.clientY - top) / size);
    const y = Math.floor((e.clientX - left) / size);

    return { x, y };
  };

  const makeComputerMove = async (responseData, position) => {
    let newPos = JSON.parse(JSON.stringify(position));

    const computerMove = await getCorrectMove(responseData, false);
    console.log("The computer move isaaa");
    console.log(computerMove);

    const from = computerMove[0];
    const to = computerMove[1];

    const rank = from.charCodeAt(0) - 97;
    const file = from[1] - 1;

    const p = newPos[file][rank];

    const x = to.charCodeAt(0) - 97;
    const y = to[1] - 1;

    newPos[file][rank] = "";
    newPos[y][x] = p;

    return newPos;
  };

  const makeMove = async (e, position) => {
    e.preventDefault();
    const [p, rank, file] = e.dataTransfer.getData("text").split(",");
    const { x, y } = calculateCoords(e);
    const from = `${String.fromCharCode(97 + Number(file))}${Number(rank) + 1}`;
    const to = `${String.fromCharCode(97 + y)}${x + 1}`;

    const legalMoves = getLegalMoves(rank, file, responseData);
    console.log("Legal moves are");
    console.log(legalMoves);
    console.log(responseData);
    const correctMove = await getCorrectMove(responseData);
    console.log("The correct move is");
    console.log(correctMove);

    console.log("The correct move is");
    console.log(correctMove);

    if (!validateMove(from, to, correctMove)) {
      return;
    }

    position[rank][file] = "";
    position[x][y] = p;
    return { newPosition: position, from, to };
  };

  const validateMove = (from, to, correctMove) => {
    if (from === correctMove[0] && to === correctMove[1]) {
      return true;
    }
    return false;
  };

  const onDrop = async (e) => {
    e.preventDefault();
    let newPosition = JSON.parse(JSON.stringify(currentPosition));
    let from = "";
    let to = "";

    const result = await makeMove(e, newPosition);
    if (!result) {
      setNotification({ type: "error", message: "Incorrect move" });
      return;
    } else {
      setNotification({ type: "success", message: "Correct move" });
    }

    ({ newPosition, from, to } = result);

    axios
      .put(`http://localhost:8080/game/${from}-${to}`)
      .then(async (response) => {
        if (
          response.data.winner == null ||
          response.data.winner === "Computer"
        ) {
          console.log("The response data is");
          console.log(response.data);
          setResponseData(response.data);

          console.log(response.data.winner);
          if (response.data.winner) {
            console.log("THE END");
            setIsSequenceEnded(true);
          }

          const newPos = await makeComputerMove(response.data, newPosition);
          dispatch({ type: "NEW_MOVE", payload: { newPosition: newPos } });
        }
      });
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} onDrop={onDrop} onDragOver={onDragOver} className="pieces">
      {currentPosition !== undefined &&
        currentPosition.map((r, rank) =>
          r.map((f, file) =>
            currentPosition[rank][file] ? (
              <Piece
                key={rank + "-" + file}
                rank={rank}
                file={file}
                piece={currentPosition[rank][file]}
                gameState={responseData}
              />
            ) : null
          )
        )}
    </div>
  );
};

export default Pieces;
