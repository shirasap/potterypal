import { Link } from "react-router-dom";
import "./ItemCard.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function ItemCard({ entry }) {
  return (
    <>
      <div className="piece">
        <div className="piece__card">
          <Link to={`/piece/${entry.piece_id}`}>
            <div>
              {entry.images ? (
                <div className="piece__img-container">
                  {" "}
                  <img
                    src={`${import.meta.env.VITE_LOCALHOST}/images/${
                      entry.images
                    }`}
                    alt="piece image"
                    className="piece__img"
                  />{" "}
                </div>
              ) : null}
              <div className="piece__info">
                <h2 className="piece__title">{entry.title}</h2>
              </div>
            </div>
          </Link>
          <div className="piece__actions">
            <Link to={`/piece/edit/${entry.piece_id}`} className="piece__edit">
              <EditIcon fontSize="small" />
            </Link>
            <DeleteModal pieceId={entry.piece_id} piece={entry} className="piece__delete"/>
          </div>
        </div>
      </div>
    </>
  );
}
