import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import "./DeleteModal.scss";
import axios from "axios";

export default function DeleteModal({ pieceId, piece, text }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function deletePiece() {

    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/api/pieces/${pieceId}`
      );
      setOpen(false);
      navigate(`/`);
      window.location.reload();

    } catch (error) {}
  }

  const handleDelete = () => {
    deletePiece();
  };

  return (
    <>
      <button onClick={handleOpen} className="delete__button">
        <span className="delete__text">{text}</span><DeleteIcon fontSize="small" />
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
            <button className="modal__delete-confirm" onClick={handleDelete}>
              Delete
            </button>
            <button className="modal__exit" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
