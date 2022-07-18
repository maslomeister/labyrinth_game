import React, { useMemo, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

import { guessFinish, gameRestart } from "../../services/reducers/gameSlice";
import { FieldTile } from "../fieldTile/FieldTile";
import { MoveTile } from "../moveTile/MoveTile";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { generateField } from "../../utils/gameHelpers";

import styles from "./Labyrinth.module.css";

export function Labyrinth() {
  const dispatch = useAppDispatch();
  const { moves, fieldSize, startPos, finishPos, gameEnded } = useAppSelector(
    (state) => state.game
  );

  const field = useMemo(() => generateField(fieldSize), [fieldSize]);

  useEffect(() => {
    dispatch(gameRestart(0));
  }, [dispatch]);

  useEffect(() => {}, [gameEnded]);

  const tileClick = (field: ICoords) => {
    if (startPos.x === field.x && startPos.y === field.y) return;
    if (gameEnded) return;
    if (finishPos.x === field.x && finishPos.y === field.y) {
      dispatch(
        guessFinish({
          guessPos: field,
          gameEnded: true,
          finishGuessedCorrectly: true,
        })
      );
    } else {
      dispatch(
        guessFinish({
          guessPos: field,
          gameEnded: true,
          finishGuessedCorrectly: false,
        })
      );
    }

    dispatch(gameRestart(3000));
  };

  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.gameField}
        style={{
          gridTemplateColumns: `repeat(${fieldSize.x}, 1FR)`,
        }}
      >
        <AnimatePresence>
          {field.map((field, i) => (
            <FieldTile key={i} field={field} onClick={tileClick} />
          ))}
        </AnimatePresence>
      </div>
      <div className={styles.movesField}>
        <AnimatePresence>
          {!gameEnded && (
            <m.div
              initial={{
                y: 150,
                rotateX: 90,
                transformPerspective: 200,
              }}
              animate={{
                y: 0,
                rotateX: 0,
                transformPerspective: 200,
                transition: {
                  duration: 0.6,
                },
              }}
              exit={{
                y: 150,
                rotateX: 90,
                transformPerspective: 200,
                transition: {
                  duration: 0.6,
                },
              }}
              transition={{
                staggerChildren: 1,
              }}
              key={"movesGrid"}
              className={styles.movesGrid}
              style={{
                gridTemplateColumns: `repeat(${moves.length / 2}, 1FR)`,
                gridTemplateRows: `repeat(2, 1FR)`,
              }}
            >
              {moves.map((move, i) => {
                return (
                  <MoveTile index={i} direction={move.dir} key={move.id} />
                );
              })}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
