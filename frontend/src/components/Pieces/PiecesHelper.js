import axios from "axios";

let sequence = null;

function fetchSequence() {
  if (!sequence) {
    console.log("Fetching sequence");
    return axios
      .get("http://localhost:8080/opening")
      .then((response) => {
        sequence = response.data[0].moveSequence;
        return sequence;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  } else {
    return Promise.resolve(sequence);
  }
}


export async function getCorrectMove(jsonData, humanMove=true) {
  sequence = await fetchSequence();

  try {
    // console.log("aaaa");
    // console.log(jsonData);
    let moves = sequence
      .match(/.{5}/g)
      .map((move) => [move.slice(0, 2), move.slice(3)]);
    console.log(moves);

    let allMoves = jsonData.sequence
      .match(/.{5}/g)
      .map((move) => [move.slice(0, 2), move.slice(3)]);

    let lastMove = allMoves[allMoves.length - 1];
    let lastMoveIndex = moves.findIndex((move) => move[0] === lastMove[0] && move[1] === lastMove[1]);


    if (humanMove) {
      return moves[lastMoveIndex + 1];
    }
    else {
      return moves[lastMoveIndex];
    }
  } catch (error) {
    console.error(error);

    let moves = sequence
      .match(/.{5}/g)
      .map((move) => [move.slice(0, 2), move.slice(3)]);
    return moves[0];
  }
}

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
