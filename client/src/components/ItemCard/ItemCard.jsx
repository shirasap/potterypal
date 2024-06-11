import { Link } from "react-router-dom";
import "./ItemCard.scss";

export default function ItemCard({ entry }) {
  return (
    <>
      <Link to={`/piece/${entry.piece_id}`}>
        <div className="piece__card">
          <h1 className="piece__title">{entry.title}</h1>
          {entry.images ? <img src={`${import.meta.env.VITE_LOCALHOST}/images/${entry.images}`} alt="piece image" className="piece__img" /> : null}
          <p className="piece__description">{entry.description}</p>
        </div>
      </Link>
    </>
  );
}
