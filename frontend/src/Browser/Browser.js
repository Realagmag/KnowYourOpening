import "./Browser.css";
import Opening from "./Opening";
import Search from "./Search";
import { getOpenings, deleteOpening } from "./BackendCom";
import React, { useEffect, useState } from "react";

const Browser = () => {
  const [openings, setOpenings] = useState([]);

  const handleDelete = async (id) => {
    const filteredOpenings = Object.keys(openings)
      .filter((idDel) => id !== idDel)
      .reduce((obj, key) => {
        obj[key] = openings[key];
        return obj;
      }, {});
    setOpenings(filteredOpenings);
    await deleteOpening(id);
  };

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const response = await getOpenings();
        setOpenings(response);
      } catch (error) {
        console.error("Error fetching openings:", error);
      }
    };
    fetchOpenings();
  }, []);

  return (
    <form className="Browser">
      <Search />
      {openings &&
        Object.entries(openings)
          .sort(([idA], [idB]) => idA.localeCompare(idB))
          .map(([id, opening]) => (
            <Opening
              key={id}
              id={id}
              name={opening.name}
              description={opening.description}
              deleteOpening={handleDelete}
            />
          ))}
    </form>
  );
};

export default Browser;
