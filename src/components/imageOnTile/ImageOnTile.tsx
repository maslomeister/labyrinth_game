import React from "react";
import { m } from "framer-motion";

import finishIcon from "../../assets/images/finish.png";
import failIcon from "../../assets/images/man_fail.png";
import styles from "./ImageOnTile.module.css";

type Props = {
  guess?: string;
};

export function ImageOnTile({ guess }: Props) {
  if (!guess) return <></>;
  switch (guess) {
    case "correctGuess":
      return (
        <m.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="finish"
          className={styles.tileImage}
          src={finishIcon}
          alt="finish"
        />
      );
    case "finishTile":
      return (
        <m.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="finish"
          className={styles.tileImage}
          src={finishIcon}
          alt="finish"
        />
      );
    case "guessTile":
      return (
        <m.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="guessPos"
          className={styles.tileImage}
          src={failIcon}
          alt="fail"
        />
      );
    default:
      return <></>;
  }
}
