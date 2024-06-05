import axios from "axios";

const config = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export function getOpenings(token) {
  console.log("Getting openings");
  console.log(token);
  const config = {
    headers: { Authorization: "Bearer " + token },
  };
  return axios
    .get("http://localhost:8080/opening", config)
    .then((response) => {
      const openings = {};
      console.log(response.data)
      response.data.forEach((el) => {
        openings[el.id] = {
          name: el.name,
          description: el.description,
          moves: el.moveSequence,
        };
      });
      return openings;
    })
    .catch((error) => {
      console.error("Error fetching openings:", error);
      throw error;
    });
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
  axios
    .post(
      "http://localhost:8080/opening",
      {
        name: name,
        moveSequence: moves,
        description: info,
        playerSide: "white",
      },
      config(token)
    )
    .then((response) => {
      console.log("Response:", response.data);

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}