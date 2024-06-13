import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.scss";
import ItemCard from "../../components/ItemCard/ItemCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [pieces, setPieces] = useState([]);

  async function getPieces() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/pieces`
      );
      setPieces(response.data);
    } catch (error) {
      console.error(`ERROR: Could not fetch pieces data`, error);
    }
  }

  useEffect(() => {
    getPieces();
  }, []);
  return (
    <>
      <Header />
      <div className="dashboard__wrapper">
        <div className="dashboard__header">
          <p className="dashboard__user">Welcome Shirasa!</p>
          <div className="dash-actions">
            <h2 className="dash-actions__title">Your Pieces</h2>
            <Link to="/piece/add" className="dash-actions__add">
              + Add Piece
            </Link>
          </div>
        </div>
      </div>
      <div className="pieces">
        {pieces.map((entry) => (
          <ItemCard key={entry.piece_id} entry={entry} />
        ))}
      </div>

      <Footer />
    </>
  );
}
