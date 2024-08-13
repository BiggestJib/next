"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import "./backdrop.css";

export default function DeleteMeals({ meal, handleDeleteFood }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await handleDeleteFood();
      setIsOpen(false);
    } catch (err) {
      setError("Failed to delete the food. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={handleOpenModal}
        className="delete-button"
      >
        Delete Meals
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <Modal open={isOpen} onClose={handleCloseModal}>
            <div className="modal-content">
              <h2>{isDeleting ? "Deleting Food...." : "Delete Food"}</h2>
              {isDeleting ? (
                <div className="spinner-align">
                  <div className="spinner">Loading...</div>
                </div>
              ) : (
                <>
                  <p>Are you sure you want to delete the selected food?</p>
                  <div className="modal-actions">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={handleDelete}
                      className="yes-button"
                    >
                      Yes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={handleCloseModal}
                      className="no-button"
                    >
                      No
                    </motion.button>
                  </div>
                  {error && <p className="error">{error}</p>}
                </>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
