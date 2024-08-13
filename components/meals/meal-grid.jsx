"use client";
import classes from "./meal-grid.module.css";
import MealItem from "./meal-item";
import { motion } from "framer-motion";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
export default function MealsGrid({ meals }) {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className={classes.meals}
    >
      {meals.map((meals) => (
        <motion.li layout variants={itemVariants} key={meals.id}>
          <MealItem {...meals}></MealItem>
        </motion.li>
      ))}
    </motion.ul>
  );
}
