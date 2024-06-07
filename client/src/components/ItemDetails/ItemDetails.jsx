import { useParams } from "react-router-dom";
import "./ItemDetails.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function ItemDetails() {
  const pieceId = useParams().id;

  const [piece, setPiece] = useState({});

  async function getPiece() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/pieces/${pieceId}`
      );
      console.log(response.data);
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
      <div>
        <h1>{piece.title}</h1>
        <p>{piece.clay_type}</p>
        <p>{piece.description}</p>
        <p>{piece.glaze}</p>
      </div>
      <Footer />
    </>
  );
}
