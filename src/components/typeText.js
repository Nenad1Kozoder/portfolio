"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./typeText.module.scss";

const TypeText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const dispatch = useDispatch();

  const animationDone = useSelector(
    (state) => state.homeAnimationDone.homeAnimationDone
  );
  const animationEnd = (res) => {
    dispatch({ type: "SET_HOME_ANIMATION_END", payload: res });
  };

  const code = `< ${text} >`;

  useEffect(() => {
    let i = 0;
    const steps = [...code];

    steps.push("PAUSE");
    steps.push("PAUSE");
    steps.push("BACKSPACE");
    steps.push("PAUSE");
    steps.push("PAUSE");
    steps.push("/");
    steps.push("PAUSE");
    steps.push(">");

    const interval = setInterval(() => {
      if (i < steps.length) {
        const current = steps[i];

        if (current === "BACKSPACE") {
          setDisplayedText((prev) => prev.slice(0, -1));
        } else if (current === "PAUSE") {
          setTimeout(() => {
            i++;
          }, 2500);
        } else {
          setDisplayedText((prev) => prev + current);
        }

        i++;
      } else {
        clearInterval(interval);
        animationEnd(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <h3>
      <code
        className={`${styles.subtitle} ${animationDone ? styles.active : ""}`}
      >
        {displayedText}
      </code>
    </h3>
  );
};

export default TypeText;
