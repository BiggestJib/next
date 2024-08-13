"use server";

import { revalidatePath } from "next/cache";
import { saveMeals } from "./meals";
import { redirect } from "next/navigation";

function isInvalidText(text) {
  return !text || text.trim().length === 0;
}
export async function shareMeals(_, formData) {
  const meal = Object.fromEntries(formData.entries());
  const errors = {};

  if (isInvalidText(meal.creator)) errors.creator = "Your name is required.";
  if (isInvalidText(meal.creator_email))
    errors.creator_email = "Your email is required.";
  else if (!meal.creator_email.includes("@"))
    errors.creator_email = "Invalid email address.";
  if (isInvalidText(meal.title)) errors.title = "Title is required.";
  if (isInvalidText(meal.summary))
    errors.summary = "Short summary is required.";
  if (isInvalidText(meal.instructions))
    errors.instructions = "Instructions are required.";
  if (!meal.image || meal.image.size === 0) errors.image = "Image is required.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await saveMeals(meal);
  revalidatePath("/meals");
  redirect("/meals");
}

export const validateInput = (name, value) => {
  const errors = {};

  if (name === "creator" && isInvalidText(value)) {
    errors.creator = "Your name is required.";
  }
  if (name === "creator_email" && isInvalidText(value)) {
    errors.creator_email = "Your email is required.";
  } else if (name === "creator_email" && !value.includes("@")) {
    errors.creator_email = "Invalid email address.";
  }
  if (name === "title" && isInvalidText(value)) {
    errors.title = "Title is required.";
  }
  if (name === "summary" && isInvalidText(value)) {
    errors.summary = "Short summary is required.";
  }
  if (name === "instructions" && isInvalidText(value)) {
    errors.instructions = "Instructions are required.";
  }
  if (name === "image" && (!value || value.size === 0)) {
    errors.image = "Image is required.";
  }

  return errors[name] || "";
};
