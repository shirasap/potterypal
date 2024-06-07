import { Link } from "react-router-dom";
import "./ItemCard.scss";

export default function ItemCard({ entry }) {
  return (
    <>
      <Link to={`/piece/${entry.id}`}>
        <div className="piece__card">
          <h1 className="piece__title">{entry.title}</h1>
          <p className="piece__description">{entry.description}</p>
        </div>
      </Link>
    </>
  );
}
