import React, { useState } from "react";
import { PublishOpening } from "./BackendCom";
import { useToken } from "./../contexts/TokenContext";
import "./Browser.css";

const AddOpening = ({ setShowAddOpening, onAdd }) => {
  const [openingName, setOpeningName] = useState("");
  const [moves, setMoves] = useState("");
  const [description, setDescription] = useState("");
  const { currentToken } = useToken();

  const handleInputChange = (event) => {
    setOpeningName(event.target.value);
  };

  const handleMovesChange = (event) => {
    setMoves(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOpening = await PublishOpening(openingName, moves, description, currentToken);
    console.log(`Adding opening: ${openingName}`);
    console.log(`Moves: ${moves}`);
    console.log(`Description: ${description}`);
    setOpeningName("");
    setMoves("");
    setDescription("");
    onAdd(newOpening);
    setShowAddOpening(false);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    onAdd();
    setShowAddOpening(false);
  };

  return (
    <div className="AddOpening">
      <form>
        <div className="form-group">
          <label htmlFor="openingName">Opening Name:</label>
          <input
            type="text"
            id="openingName"
            value={openingName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="moves">Moves:</label>
          <input
            type="text"
            id="moves"
            value={moves}
            onChange={handleMovesChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="buttons">
          <button type="submit" onClick={handleSubmit}>
            Add
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOpening;
