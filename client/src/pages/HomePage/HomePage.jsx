import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.scss";
import ItemCard from "../../components/ItemCard/ItemCard";
import AddIcon from "@mui/icons-material/Add";
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
      <Link to="/piece/add">
        <span>Add Piece</span>
        <AddIcon />
      </Link>
      <div className="pieces">
        {pieces.map((entry) => (
          <ItemCard key={entry.id} entry={entry} />
        ))}
      </div>
      <Footer />
    </>
  );
}
