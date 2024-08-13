import classes from "../page.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Meal Not Found</h1>
      <p>Sorry, we couldn&apos;t find the meal you were looking for.</p>
      <p>Let&apos;s get you back on track.</p>
      <Link className={classes.link} href="../meals">
        Go back ←
      </Link>
    </main>
  );
}
