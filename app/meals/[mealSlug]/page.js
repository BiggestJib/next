import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound, redirect } from "next/navigation";
import DeleteMeals from "@/components/meals/deleteMeals";
import { deleteMeal } from "@/lib/meals";

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);
  if (!meal) notFound();
  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function Slug({ params }) {
  const meal = await getMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }

  const handleDeleteFood = async () => {
    "use server"; // Make sure this is correctly placed
    await deleteMeal(meal.slug);
    redirect("/meals"); // Handle this correctly within the server context
  };

  // Properly format instructions to avoid issues
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}></header>
      <div className={classes.image}>
        <Image
          src={`https://myprojectbukkky.s3.amazonaws.com/${meal.image}`}
          alt={meal.title}
          layout="fill"
        />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
        </p>
        <p className={classes.summary}>{meal.summary}</p>
        <DeleteMeals handleDeleteFood={handleDeleteFood} meal={meal} />
      </div>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
