import slugify from "slugify";
import xss from "xss";
import sql from "better-sqlite3";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "us-east-1",
});

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeals(meal) {
  let slug = slugify(meal.title, { lower: true });
  let slugExists = db.prepare("SELECT 1 FROM meals WHERE slug = ?").get(slug);

  // Generate a unique slug if the initial slug already exists
  let count = 1;
  while (slugExists) {
    slug = `${slugify(meal.title, { lower: true })}-${count}`;
    slugExists = db.prepare("SELECT 1 FROM meals WHERE slug = ?").get(slug);
    count++;
  }

  meal.slug = slug;
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = Buffer.from(await meal.image.arrayBuffer());

  await s3.putObject({
    Bucket: "myprojectbukkky",
    Key: fileName,
    Body: bufferedImage,
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}

export function deleteMeal(slug) {
  db.prepare("DELETE FROM meals WHERE slug = ?").run(slug);
}
