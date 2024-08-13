import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./backdrop.css";
function Modal({ open, children, onClose }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        dialog.current.close();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const dialogStyle = {
    minWidth: "40rem",
    minHeight: "15rem",
    position: "fixed",
    padding: "0",
    zIndex: "2",
    color: "rgba(76, 0, 9)",
    background: "#cfa69b",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    animation: "slide-down-fade-in 0.3s ease-out forwards",
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <motion.dialog
        initial={{ opacity: 0, y: "100%" }} // Start with opacity 0 and y-position at 100% (off-screen)
        animate={{ opacity: 1, y: "0%" }} // Animate to opacity 1 and y-position 0% (on-screen)
        exit={{ opacity: 0, y: "100%" }} // Exit with opacity 0 and y-position 100% (off-screen)
        transition={{ duration: 0.5 }} // Add a smooth transition duration
        style={dialogStyle}
        ref={dialog}
        onClose={onClose}
      >
        {children}
      </motion.dialog>
    </div>
  );
}
export default Modal;
