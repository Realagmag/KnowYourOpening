import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleInfo,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useState } from "react";
import { useOpening } from "./../contexts/OpeningContext";

const Opening = ({ name, id, moves, description, deleteOpening }) => {
  const [anchor, setAnchor] = useState(null);
  console.log("Openingpls", id, name, moves, description);
  const { playOpening } = useOpening();

  const handleClick = (e) => setAnchor(anchor ? null : e.currentTarget);

  const handleClickAway = () => setAnchor(null);

  const open = Boolean(anchor);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="Opening">
        <p>
          {id} : {name}
        </p>
        <div>
          <FontAwesomeIcon
            icon={faCirclePlay}
            onClick={() => playOpening({ id, name, moves, description })}
          />
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteOpening(id)} />
          <FontAwesomeIcon icon={faCircleInfo} onClick={handleClick} />
          {open && (
            <BasePopup id={id} open={open} anchor={anchor}>
              <PopupBody>{description}</PopupBody>
            </BasePopup>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Opening;

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  background-color: brown;
  color: rgb(0 0 0 / 0.7);
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`
);
