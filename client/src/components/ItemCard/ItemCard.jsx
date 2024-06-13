import { Link } from "react-router-dom";
import "./ItemCard.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function ItemCard({ entry }) {
  return (
    <>
      <div className="piece">
        <Link to={`/piece/${entry.piece_id}`} className="piece__card">
          {entry.images ? (
            <div className="piece__img-container">
              {" "}
              <img
                src={`${import.meta.env.VITE_LOCALHOST}/images/${entry.images}`}
                alt="piece image"
                className="piece__img"
              />{" "}
            </div>
          ) : null}
          <div className="piece__info">
            <div className="piece__title-wrapper">
              <h2 className="piece__title">{entry.title}</h2>
            </div>
            <p className="piece__clay">
              <span className="piece__clay-descriptor">Clay type: </span>
              {entry.clay_type}
            </p>
            <div className="piece__description-wrapper">
              <p className="piece__description">{entry.description}</p>
            </div>
          </div>
        </Link>
        <div className="piece__actions">
          <Link to={`/piece/edit/${entry.piece_id}`} className="piece__edit">
            <EditIcon fontSize="medium" />
          </Link>
          <DeleteModal
            pieceId={entry.piece_id}
            piece={entry}
            passedClass="piece__delete"
          />
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
