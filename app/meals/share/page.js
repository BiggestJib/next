"use client";

import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeals } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import { useFormState } from "react-dom";
import React, { useState } from "react";
import { validateInput } from "@/lib/actions";

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeals, { errors: {} });
  const [errors, setErrors] = useState({
    creator: "",
    creator_email: "",
    title: "",
    summary: "",
    instructions: "",
    image: "",
  });
  const [blurState, setBlurState] = useState({
    creator: false,
    creator_email: false,
    title: false,
    summary: false,
    instructions: false,
    image: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlurState((prevBlur) => ({
      ...prevBlur,
      [name]: false,
    }));
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setBlurState((prevBlur) => ({
      ...prevBlur,
      [name]: true,
    }));
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="creator">Your name</label>
              <input
                type="text"
                id="creator"
                name="creator"
                className={
                  state.errors.creator || errors.creator ? classes.error : ""
                }
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {(blurState.creator || state.errors.creator) && (
                <span className={classes.errorMessage}>
                  {state.errors.creator || errors.creator}
                </span>
              )}
            </p>
            <p>
              <label htmlFor="creator_email">Your email</label>
              <input
                type="email"
                id="creator_email"
                name="creator_email"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={
                  state.errors.creator_email || errors.creator_email
                    ? classes.error
                    : ""
                }
              />
              {(blurState.creator_email || state.errors.creator_email) && (
                <span className={classes.errorMessage}>
                  {state.errors.creator_email || errors.creator_email}
                </span>
              )}
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className={
                state.errors.title || errors.title ? classes.error : ""
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(blurState.title || state.errors.title) && (
              <span className={classes.errorMessage}>
                {state.errors.title || errors.title}
              </span>
            )}
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              className={
                state.errors.summary || errors.summary ? classes.error : ""
              }
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {(blurState.summary || state.errors.summary) && (
              <span className={classes.errorMessage}>
                {state.errors.summary || errors.summary}
              </span>
            )}
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              className={
                state.errors.instructions || errors.instructions
                  ? classes.error
                  : ""
              }
              required
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {(blurState.instructions || state.errors.instructions) && (
              <span className={classes.errorMessage}>
                {state.errors.instructions || errors.instructions}
              </span>
            )}
          </p>
          <ImagePicker
            name="image"
            label="Your image"
            handleChange={handleChange}
            onBlur={handleBlur}
            className={state.errors.image || errors.image ? classes.error : ""}
          />
          {(blurState.image || state.errors.image) && (
            <span className={classes.errorMessage}>
              {state.errors.image || errors.image}
            </span>
          )}
          {state.message && (
            <p className={classes.errorMessage}>{state.message}</p>
          )}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
