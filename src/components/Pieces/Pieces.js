import "./Pieces.css";
import Piece from "./Piece";
import { useRef } from "react";
import { copyPosition } from "../../helper";
import { useAppContext } from "../../contexts/Context";
import { makeNewMove } from "../../reducer/actions/move";

const Pieces = () => {
  const ref = useRef();

  const { appState, dispatch } = useAppContext();

  const currentPosition = appState.position[appState.position.length - 1];
  console.log(currentPosition);

  const calculateCoords = (e) => {
    const { top, left, width } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const x = 7 - Math.floor((e.clientY - top) / size);
    const y = Math.floor((e.clientX - left) / size);
    return { x, y };
  };

  const onDrop = (e) => {
    e.preventDefault();
    const newPosition = copyPosition(currentPosition);
    const { x, y } = calculateCoords(e);
    const [p, rank, file] = e.dataTransfer.getData("text").split(",");
    newPosition[Number(rank)][Number(file)] = "";
    newPosition[x][y] = p;
    if (newPosition === currentPosition) return;
    dispatch(makeNewMove({ newPosition }));
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
