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
        <h1>{piece.title}</h1>
        {piece.images ? (
          <img
            src={`${import.meta.env.VITE_LOCALHOST}/images/${piece.images}`}
            alt="piece image"
            className="detail__img"
          />
        ) : null}
        <p>{piece.clay_type}</p>
        <p>{piece.description}</p>
        <p>{piece.glaze}</p>
        <Link to={`/piece/edit/${pieceId}`} className="detail__edit">
          Edit <EditIcon />
        </Link>
        <DeleteModal pieceId={pieceId} piece={piece} text="Delete"/>
      </div>
      <Footer />
    </>
  );
}
