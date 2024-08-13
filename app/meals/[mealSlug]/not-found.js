import classes from "../page.module.css";
import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Meal Not Found</h1>
      <p>Unfortunetly, The meal you're looking for doesn't exist.</p>
      <Link className={classes.link} href="../meals">
        Go back ←
      </Link>
    </main>
  );
}
