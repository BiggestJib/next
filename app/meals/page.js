import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meal-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import { ButtonLinks } from "@/components/meals/shareMeals";

export const metadata = {
  title: "All Meals",
  description: "Browse delicious meals shared by our vibrant community .",
};

async function Meals() {
  const meals = await getMeals();

  return meals.length > 0 ? (
    <MealsGrid meals={meals} />
  ) : (
    <p>No data available yet, add a new food</p>
  );
}
export default async function MealsPage() {
  const meals = await getMeals();
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, Created
          <span className={classes.highlight}> By You</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. it is easy and fun!
        </p>
        <p className={classes.cta}>
          <ButtonLinks />{" "}
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching Meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
