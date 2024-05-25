import axios from "axios";

const config = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export async function getOpenings(token) {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/opening",
      config(token)
    );
    const openings = {};
    data.forEach((el) => {
      openings[el.id] = {
        name: el.name,
        description: el.description,
        moves: el.moveSequence,
      };
    });
    return openings;
  } catch (error) {
    console.error("Error fetching openings:", error);
    throw error;
  }
}

export async function deleteOpening(id, token) {
  axios
    .delete(`http://localhost:8080/opening/${id}`, config(token))
    .then((response) => {
      console.log(`deleted opening ${id}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function PublishOpening(name, moves, info, token) {
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
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
