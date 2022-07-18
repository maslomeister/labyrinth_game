import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

import { ImageOnTile } from "../imageOnTile/ImageOnTile";
import { useAppSelector } from "../../services/hooks";

import styles from "./FieldTile.module.css";

type Props = {
  field: ICoords;
  onClick: (field: ICoords) => void;
};

export function FieldTile({ field, onClick }: Props) {
  const { startPos, finishPos, gameEnded, finishGuessedCorrectly, guessPos } =
    useAppSelector((state) => state.game);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (startPos.x === field.x && startPos.y === field.y) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  }, [field.x, field.y, startPos.x, startPos.y]);

  const showGuess = useMemo(() => {
    if (finishGuessedCorrectly) {
      if (field.x === finishPos.x && field.y === finishPos.y) {
        return "correctGuess";
      }
    } else {
      if (field.x === finishPos.x && field.y === finishPos.y) {
        return "finishTile";
      }
      if (field.x === guessPos.x && field.y === guessPos.y) {
        return "guessTile";
      }
    }
  }, [
    field.x,
    field.y,
    finishGuessedCorrectly,
    finishPos.x,
    finishPos.y,
    guessPos.x,
    guessPos.y,
  ]);

  const tileColorStyle = useMemo(() => {
    if (!gameEnded) return "";
    if (showGuess === "correctGuess") {
      return styles.tileSuccess;
    } else {
      if (showGuess === "finishTile") {
        return styles.tileFail;
      }

      if (showGuess === "guessTile") {
        return styles.tileFail;
      }

      return "";
    }
  }, [gameEnded, showGuess]);

  return (
    <div
      className={styles.fieldTileContainer}
      style={{ cursor: isStart ? "auto" : "pointer" }}
    >
      <div
        className={styles.fieldTile + " " + tileColorStyle}
        onClick={() => onClick(field)}
      ></div>
      {isStart && (
        <m.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3, default: { duration: 1 } }}
          className={styles.tileImage}
          src="/assets/images/start.png"
          alt="start"
          key="start"
        />
      )}
      <AnimatePresence>
        {gameEnded && <ImageOnTile guess={showGuess} />}
      </AnimatePresence>
    </div>
  );
}
