import { useParams, useNavigate } from "react-router-dom";
import "./ItemDetails.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

export default function ItemDetails() {
  const pieceId = useParams().id;
  const navigate = useNavigate();

  const [piece, setPiece] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  async function deletePiece() {
    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/api/pieces/${pieceId}`
      );
      navigate(`/`);
    } catch (error) {}
  }

  useEffect(() => {
    getPiece();
  }, []);

  const handleDelete = () => {
    console.log("Delete item");
    deletePiece()
  };

  return (
    <>
      <Header />
      <div>
        <Link to={`/piece/edit/${pieceId}`}>
          <EditIcon />
        </Link>
        <h1>{piece.title}</h1>
        {/* make this a conditional thing.... */}
        <img src={`${import.meta.env.VITE_LOCALHOST}/images/${piece.images}`} alt="piece image" />
        <p>{piece.clay_type}</p>
        <p>{piece.description}</p>
        <p>{piece.glaze}</p>
        <div>
          <button onClick={handleOpen}>
            <DeleteIcon />
          </button>
          <Modal open={open} onClose={handleClose} className="modal">
            <Box className="modal__content">
              <p>
                Are you sure you would like to delete "{piece.title}" from your
                pottery log?
              </p>
              <div className="modal__functions">
                <button className="modal__delete-cancel" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="modal__delete-confirm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button className="modal__exit" onClick={handleClose}>
                  <CloseIcon />
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
}
