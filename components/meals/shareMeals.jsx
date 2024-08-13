"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import "./backdrop.css";
import classes from "./meal-item.module.css";

export const ButtonLinks = () => {
  return (
    <Link
      href="/meals/share"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Share Your Favorite Recipe
    </Link>
  );
};
