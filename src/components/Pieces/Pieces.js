import "./Pieces.css";
import Piece from "./Piece";
import { useState, useRef } from "react";
import { CreatePosition, copyPosition } from "../../helper";

const Pieces = () => {
  const ref = useRef();
  const [state, setState] = useState(CreatePosition());

  const calculateCoords = (e) => {
    const { top, left, width } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const x = 7 - Math.floor((e.clientY - top) / size);
    const y = Math.floor((e.clientX - left) / size);
    return { x, y };
  };

  const onDrop = (e) => {
    console.log(e.clientX, e.clientY);
    console.log(ref.current.getBoundingClientRect());
    const newPosition = copyPosition(state);
    const { x, y } = calculateCoords(e);
    const [p, rank, file] = e.dataTransfer.getData("text").split(",");
    console.log(x, y);
    newPosition[rank][file] = "";
    newPosition[x][y] = p;

    setState(newPosition);
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} onDrop={onDrop} onDragOver={onDragOver} className="pieces">
      {state.map((r, rank) =>
        r.map((f, file) =>
          state[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={state[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;
