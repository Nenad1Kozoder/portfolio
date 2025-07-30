"use client";

import { useEffect, useState, useRef } from "react";
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

  // Ref za index i timeout id da možemo kontrolisati animaciju i cleanup
  const iRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const code = `< ${text} >`;

  // useEffect(() => {
  //   // Definiši sve korake animacije u nizu
  //   const steps = [...code];

  //   // Dodaj dodatne korake kao što si želeo
  //   steps.push("PAUSE");
  //   steps.push("PAUSE");
  //   steps.push("BACKSPACE");
  //   steps.push("PAUSE");
  //   steps.push("PAUSE");
  //   steps.push("/");
  //   steps.push("PAUSE");
  //   steps.push(">");

  //   const TYPE_DELAY = 80;
  //   const PAUSE_DELAY = 300;

  //   // Funkcija koja rekurzivno pravi animaciju
  //   const runStep = () => {
  //     if (iRef.current >= steps.length) {
  //       // Završeno - setuj flag u redux i prekini animaciju
  //       dispatch(setHomeAnimationDone(true));
  //       return;
  //     }

  //     const current = steps[iRef.current];

  //     if (current === "BACKSPACE") {
  //       setDisplayedText((prev) => prev.slice(0, -1));
  //       iRef.current++;
  //       timeoutRef.current = setTimeout(runStep, TYPE_DELAY);
  //     } else if (current === "PAUSE") {
  //       // Pauza, sa dužim timeoutom
  //       iRef.current++;
  //       timeoutRef.current = setTimeout(runStep, PAUSE_DELAY);
  //     } else {
  //       // Običan karakter
  //       setDisplayedText((prev) => prev + current);
  //       iRef.current++;
  //       timeoutRef.current = setTimeout(runStep, TYPE_DELAY);
  //     }
  //   };

  //   // Resetuj stanje i startuj animaciju
  //   setDisplayedText("");
  //   iRef.current = 0;
  //   dispatch(setHomeAnimationDone(false)); // reset flag ako je potrebno
  //   runStep();

  //   // Cleanup - očisti timeout pri unmount-u ili promeni teksta
  //   return () => {
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //   };
  // }, [text, dispatch]);

  useEffect(() => {
    const steps = [
      ...code,
      "PAUSE",
      "PAUSE",
      "BACKSPACE",
      "PAUSE",
      "PAUSE",
      "/",
      "PAUSE",
      ">",
    ];
    const TYPE_DELAY = 80;
    const PAUSE_DELAY = 300;

    let i = 0;
    let timer: NodeJS.Timeout;

    const runStep = () => {
      if (i >= steps.length) {
        dispatch(setHomeAnimationDone(true));
        return;
      }

      const current = steps[i++];

      switch (current) {
        case "BACKSPACE":
          setDisplayedText((prev) => prev.slice(0, -1));
          timer = setTimeout(runStep, TYPE_DELAY);
          break;
        case "PAUSE":
          timer = setTimeout(runStep, PAUSE_DELAY);
          break;
        default:
          setDisplayedText((prev) => prev + current);
          timer = setTimeout(runStep, TYPE_DELAY);
      }
    };

    // odgoda prvog koraka da browser stigne da iscrtati početno stanje
    timer = setTimeout(runStep, 0);

    return () => clearTimeout(timer);
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
