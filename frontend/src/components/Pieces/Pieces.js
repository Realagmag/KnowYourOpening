import "./Pieces.css";
import Piece from "./Piece";
import { useRef } from "react";
import { copyPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { makeNewMove } from "../../reducer/actions/move";
import axios from 'axios';


const Pieces = () => {
  const ref = useRef();

  const { appState, dispatch } = useAppContext();

  const currentPosition = appState.position[appState.position.length - 1];
  console.log(currentPosition);

  /**
   * Converts rank and file to coordinates of board array.
   *
   * @param {number} rank - The rank value.
   * @param {number} file - The file value.
   * @returns {Object} - The coordinates object with x and y properties.
   */
  function convertRankFileToCoords(rank, file) {
    const x = 8 - Number(rank);
    const y = 8 - Number(file);
    return { x, y };
}

  const calculateCoords = (e) => {
    const { top, left, width } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const x = 7 - Math.floor((e.clientY - top) / size);
    const y = Math.floor((e.clientX - left) / size);

    return { x, y };
  };

  const onDrop = (e) => {
    e.preventDefault();

    const newPosition = JSON.parse(JSON.stringify(currentPosition));
    const { x, y } = calculateCoords(e);

    const [p, rank, file] = e.dataTransfer.getData("text").split(",");

    const { x: newRank, y: newFile } = convertRankFileToCoords(rank, file);

    console.log(newRank, newFile);
    console.log(x, y);
    newPosition[newFile][newRank] = "";
    newPosition[x][y] = p;
    console.log(currentPosition);
    console.log(newPosition);

    const from = `${String.fromCharCode(97 + Number(file))}${Number(rank) + 1}`;
    const to = `${String.fromCharCode(97 + y)}${x + 1}`;
    console.log(from, to);

    axios.put(`http://localhost:8080/game/${from}-${to}`)

    .then(response => {
      if (response.data.winner == null || response.data.winner === "Computer") {
        console.log(response.data);

        if (newPosition === currentPosition) return;
        dispatch({ type: 'NEW_MOVE', payload: { newPosition } });
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
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
              />
            ) : null
          )
        )}
    </div>
  );
};

export default Pieces;
