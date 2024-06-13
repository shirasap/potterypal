import { useParams, useNavigate } from "react-router-dom";
import "./ItemDetails.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function ItemDetails() {
  const pieceId = useParams().id;

  const [piece, setPiece] = useState({});

  async function getPiece() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/pieces/${pieceId}`
      );
      setPiece(response.data);
    } catch (error) {
      console.error(`Could not fetch piece data, ${error}`);
    }
  }

  useEffect(() => {
    getPiece();
  }, []);

  return (
    <>
      <Header />
      <div className="detail">
        <h2 className="detail__heading">{piece.title}</h2>
        {piece.images ? (
          <img
            src={`${import.meta.env.VITE_LOCALHOST}/images/${piece.images}`}
            alt="piece image"
            className="detail__img"
          />
        ) : null}
        <p><span className="detail__title">Clay type: </span>{piece.clay_type}</p>
        <p><span className="detail__title">Stage: </span>{piece.stage}</p>
        <p><span className="detail__title">Description: </span>{piece.description}</p>
        <p><span className="detail__title">Glaze description: </span>{piece.glaze}</p>
        <div className="detail__actions">
        <Link to={`/piece/edit/${pieceId}`} className="detail__edit">
          <span>Edit </span><EditIcon fontSize="medium" />
        </Link>
        <DeleteModal pieceId={pieceId} piece={piece} text="Delete" passedClass="detail__delete"/>
        </div>
      </div>
      <Footer />
    </>
  );
}
