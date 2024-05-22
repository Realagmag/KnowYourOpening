import axios from "axios";

export async function getOpenings() {
  const { data } = await axios.get("http://localhost:8080/opening");
  const openings = {};
  data.forEach((el) => {
    openings[el.id] = {
      name: el.name,
      description: el.description,
      moves: el.moveSequence,
    };
  });
  return openings;
}

export async function deleteOpening(id) {
  axios
    .delete(`http://localhost:8080/opening/${id}`)
    .then((response) => {
      console.log(`deleted opening ${id}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function PublishOpening(name, moves, info) {
  const postData = {
    name: name,
    startingSide: "White",
    moveSequence: moves,
    description: info,
  };
  axios
    .post("http://localhost:8080/opening", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
