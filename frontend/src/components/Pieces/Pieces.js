import "./Pieces.css";
import Piece from "./Piece";
import { useEffect, useRef, useState } from "react";
import { copyPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { makeNewMove } from "../../reducer/actions/move";
import axios from "axios";
import { getLegalMoves } from "./Piece";
import { getCorrectMove, generateStartingPossibleMoves } from "./PiecesHelper";
import { faThermometerThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import { useOpening } from "../../contexts/OpeningContext";
import { usePerspective } from "../../contexts/PerspectiveContext";
import { useToken } from "./../../contexts/TokenContext";
import { getDefaultPosition } from "./PiecesHelper";

const Pieces = ({ initializeGameState }) => {
  const ref = useRef();
  const { appState, dispatch } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const { currentOpening } = useOpening();
  const [isSequenceEnded, setIsSequenceEnded] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const { currentToken } = useToken();
  const { perspective, setPerspective } = usePerspective();
  const defaultPosition = getDefaultPosition();
  const [mistakes, setMistakes] = useState(0);
  let finishEarly = false;
  const [openingSuccess, setOpeningSuccess] = useState(false);
  console.log("CURRENT OPENING");

  let humanMove = true;
  const config = {
    headers: {
      Authorization: `Bearer ${currentToken}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (openingSuccess) {
      setNotification({
        type: "success",
        message: "Sequence completed successfully",
      });
      axios
        .get("http://localhost:8080/game/new", config)
        .then((response) => {
          console.log("NEW GAME");
        })
        .catch((error) => {
          console.error(error);
        });

      setOpeningSuccess(false);
    }
  }, [openingSuccess]);

  console.log("OPENING");
  console.log(currentOpening);

  let currentPosition = null;
  if (appState.position) {
    currentPosition = appState.position[appState.position.length - 1];
    console.log("CURRENT POSITION");
    console.log(currentPosition);
  } else {
    currentPosition = defaultPosition;
  }
  // setPerspective("white");

  async function handleButtonClick() {
    try {
      initializeGameState();
      let openingId = currentOpening.id;
      console.log("OPENING ID");
      console.log(openingId);
      console.log(currentPosition);
      console.log(currentOpening);
      axios
        .get(`http://localhost:8080/game/new/${openingId}`, config)
        .then((response) => {
          console.log("newgame");
          console.log(response.data);
          setResponseData(response.data);
          currentPosition = defaultPosition;
        })
        .catch((error) => {
          console.error("Error starting game:", error);
        });
    } catch (error) {
      console.error("Error starting game:", error);
    }
  }

  function getFromTo(file, rank, x, y) {
    console.log("GETTING FROM TO");
    let newRank = rank;
    let newFile = file;
    let newX = x;
    let newY = y;

    console.log(perspective);
    if (perspective === "black") {
      newRank = 7 - rank;
      newFile = 7 - file;
      newX = 7 - x;
      newY = 7 - y;
    }
    const from = `${String.fromCharCode(97 + Number(newFile))}${
      Number(newRank) + 1
    }`;
    const to = `${String.fromCharCode(97 + newY)}${newX + 1}`;

    return { from, to, newRank, newFile, newX, newY };
  }

  function fetchSequence(currentOpening) {
    console.log("currentOpenings");
    console.log(currentOpening);
    currentOpening = currentOpening;
    if (currentOpening && currentOpening.moves) {

      return currentOpening.moves;
    } else {
      console.error("currentOpening or currentOpening.moves is undefined");
      return null;
    }
  }



  let counter = 0;
  /**
   * Retrieves the correct move based on the provided JSON data and human move flag.
   * @param {Object} jsonData - The JSON data containing the sequence of moves.
   * @param {boolean} [humanMove=true] - Flag indicating whether the move is made by a human player.
   * @returns {Array} - The correct move as an array of two elements representing the source and destination squares.
   */
  async function getCorrectMove(jsonData, humanMove = true) {
    let sequence = await fetchSequence(currentOpening);
    console.log("SEQUENCi ");
    console.log(humanMove);
    console.log(sequence);
    console.log(jsonData)
    try {
      let moves = sequence
        .match(/.{5}/g)
        .map((move) => [move.slice(0, 2), move.slice(3)]);

        let allMoves = jsonData.sequence
        .match(/.{5}/g)
        .map((move) => [move.slice(0, 2), move.slice(3)]);

        console.log("MOVES");
        console.log(moves);
      console.log("ALL MOVES");
      console.log(allMoves);

      let lastMove = allMoves[allMoves.length - 1];
      console.log("LAST MOVE");
      console.log(lastMove);
      let lastMoveIndex = moves.findIndex(
        (move) => move[0] === lastMove[0] && move[1] === lastMove[1]
      );

      if (humanMove) {
        console.log(lastMoveIndex)
        if (lastMoveIndex === 0) {
          return moves[0];
        }
        return moves[lastMoveIndex + 1];
      } else {
        console.log(moves);
        return allMoves[allMoves.length - 1];
      }
    } catch (error) {
      console.error(error);

      let moves = sequence
        .match(/.{5}/g)
        .map((move) => [move.slice(0, 2), move.slice(3)]);
      return moves[0];
    }
  }

  const calculateCoords = (e) => {
    const { top, left, width } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const x = 7 - Math.floor((e.clientY - top) / size);
    const y = Math.floor((e.clientX - left) / size);

    return { x, y };
  };

  const makeComputerMove = async (data, position) => {
    console.log("MAKING COMPUTER MOVE");
    console.log("--------------------------------------");
    if (finishEarly) {
      return position;
    }
    let newPos = JSON.parse(JSON.stringify(position));
    const computerMove = await getCorrectMove(data, false, currentToken);

    console.log("COMPUTER MOVE");
    console.log(computerMove);

    let from = computerMove[0];
    let to = computerMove[1];

    let rank = from.charCodeAt(0) - 97;
    let file = from[1] - 1;

    let x = to.charCodeAt(0) - 97;
    let y = to[1] - 1;

    console.log(newPos);
    const p = newPos[file][rank];
    console.log("PIECE");
    console.log(p);
    newPos[file][rank] = "";
    newPos[y][x] = p;

    return newPos;
  };

  const makeMove = async (e, position) => {
    e.preventDefault();
    let [p, rank, file] = e.dataTransfer.getData("text").split(",");
    let { x, y } = calculateCoords(e);
    // const from = `${String.fromCharCode(97 + Number(file))}${Number(rank) + 1}`;
    // const to = `${String.fromCharCode(97 + y)}${x + 1}`;
    console.log(rank, file, x, y);
    let { from, to, newRank, newFile, newX, newY } = getFromTo(
      file,
      rank,
      x,
      y
    );
    const legalMoves = getLegalMoves(rank, file, responseData, perspective);

    console.log("position:", position);
    console.log("newRank:", newRank);
    console.log("newFile:", newFile);
    console.log("newX:", newX);
    console.log("newY:", newY);
    console.log("from", from);
    console.log("to", to);

    position[newRank][newFile] = "";

    const correctMove = await getCorrectMove(responseData, true);
    console.log("CORRECT MOVEwork");
    console.log(correctMove);
    if (!validateMove(from, to, correctMove)) {
      setMistakes(mistakes + 1);

      if (mistakes === 0) {
        axios
          .put("http://localhost:8080/game/mistake", {}, config)
          .then((response) => {
            console.log("MISTAKE", response.data);
          })
          .catch(console.error);
        setOpeningSuccess(false);
      }

      return;
    }

    console.log(from);
    console.log(to);

    position[newRank][newFile] = "";
    position[newX][newY] = p;

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
    console.log("CURRENT POSITION 2");
    console.log(currentPosition);
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
    console.log("NEW POSITIONi");
    console.log(newPosition);

    console.log("opening");
    console.log(currentOpening);

    axios
      .put(`http://localhost:8080/game/${from}-${to}`, {}, config)
      .then(async (response) => {
        {
          setResponseData(response.data);
          console.log("RESPONSE DATA");
          console.log(response.data);
          if (response.data.winner == "Player") {
            setIsSequenceEnded(true);
            setOpeningSuccess(true);
            finishEarly = true;
          }
          console.log("RESPONSE DATA");
          console.log(response.data);
          console.log("NEW POSITION");
          console.log(newPosition);
          console.log("FINISH EARLY");
          console.log(finishEarly);
          const newPos = await makeComputerMove(
            response.data,
            newPosition,
            finishEarly
          );
          console.log("NEW POSa");
          console.log(newPos);
          dispatch({ type: "NEW_MOVE", payload: { newPosition: newPos } });
        }
      });
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} onDrop={onDrop} onDragOver={onDragOver} className="pieces">
      {currentPosition !== undefined &&
        (perspective === "white"
          ? currentPosition
          : currentPosition
              .slice()
              .reverse()
              .map((row) => row.slice().reverse())
        ).map((r, rank) =>
          r.map((f, file) =>
            f ? (
              <Piece
                key={rank + "-" + file}
                rank={rank}
                file={file}
                piece={f}
                gameState={responseData}
                perspective={perspective}
              />
            ) : null
          )
        )}
      <button onClick={handleButtonClick} className="reset-button">
        Reset Game
      </button>
      <button
        onClick={() =>
          setPerspective(perspective === "white" ? "black" : "white")
        }
        className="flip-button"
      >
        Flip Perspective
      </button>
    </div>
  );
};

export default Pieces;
