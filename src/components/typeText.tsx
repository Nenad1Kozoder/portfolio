"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./typeText.module.scss";
import { setHomeAnimationDone } from "../../store/homeSlice"; // prilagodi path ako treba
import type { AppDispatch, RootState } from "../../store/store";

interface TypeTextProps {
  text: string;
}

const TypeText = ({ text }: TypeTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const animationDone = useSelector(
    (state: RootState) => state.home.homeAnimationDone
  );

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
          clearInterval(interval); // zaustavi regularni interval
          setTimeout(() => {
            i++;
            startTyping(); // restartuj
          }, 2500);
          return;
        } else {
          setDisplayedText((prev) => prev + current);
        }

        i++;
      } else {
        clearInterval(interval);
        dispatch(setHomeAnimationDone(true));
      }
    }, 80);

    const startTyping = () => {
      // restart intervala
      const newInterval = setInterval(() => {
        if (i < steps.length) {
          const current = steps[i];

          if (current === "BACKSPACE") {
            setDisplayedText((prev) => prev.slice(0, -1));
          } else if (current === "PAUSE") {
            clearInterval(newInterval);
            setTimeout(() => {
              i++;
              startTyping();
            }, 2500);
            return;
          } else {
            setDisplayedText((prev) => prev + current);
          }

          i++;
        } else {
          clearInterval(newInterval);
          dispatch(setHomeAnimationDone(true));
        }
      }, 80);
    };

    startTyping();

    return () => clearInterval(interval);
  }, [text, dispatch]);

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
