import axios from "axios";

export async function getOpenings() {
  const { data } = await axios.get("http://localhost:8080/opening");
  const openings = {};
  data.forEach((el) => {
    openings[el.id] = {
      name: el.name,
      description: el.description,
    };
  });
  return openings;
}

export async function deleteOpening(id) {
  axios.delete(`http://localhost:8080/opening/${id}`);
}
