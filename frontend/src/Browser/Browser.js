import "./Browser.css";
import Opening from "./Opening";
import Search from "./Search";
import { getOpenings, deleteOpening } from "./BackendCom";
import React, { useEffect, useState } from "react";
import AddBtn from "./AddBtn";

const Browser = () => {
  const [openings, setOpenings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(true);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOpening(id);
      setTimeout(fetchOpenings, 20);
    } catch (error) {
      console.error("Error deleting opening:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const fetchOpenings = async () => {
    try {
      const response = await getOpenings();
      setOpenings(response);
    } catch (error) {
      console.error("Error fetching openings:", error);
    }
  };

  useEffect(() => {
    fetchOpenings();
  }, []);

  const filteredOpenings = Object.entries(openings)
    .filter(
      ([id, opening]) =>
        opening.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reduce((obj, [id, opening]) => {
      obj[id] = opening;
      return obj;
    }, {});

  return (
    <form className="Browser">
      <Search onSearch={handleSearch} showSearch={showSearch} />
      <AddBtn
        onAdd={() => {
          setTimeout(fetchOpenings, 20);
          toggleSearch();
        }}
      />
      {filteredOpenings &&
        Object.entries(filteredOpenings)
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
