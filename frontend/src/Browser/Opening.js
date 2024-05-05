import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const Opening = ({ name, id, description, deleteOpening }) => {
  const info = () => window.alert(description);

  return (
    <div className="Opening">
      <p>
        {id} : {name}
      </p>
      <div>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteOpening(id)} />
        <FontAwesomeIcon icon={faCircleInfo} onClick={info} />
      </div>
    </div>
  );
};

export default Opening;
