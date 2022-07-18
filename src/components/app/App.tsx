import React from "react";
import { LazyMotion, domMax } from "framer-motion";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { resetGame } from "../../services/reducers/gameSlice";
import { Labyrinth } from "../labyrinth/Labyrinth";
import { GameSetup } from "../gameSetup/GameSetup";

import styles from "./App.module.css";

function App() {
  const dispatch = useAppDispatch();
  const { gameReady } = useAppSelector((state) => state.game);
  return (
    <LazyMotion features={domMax}>
      <div className={styles.App}>
        <div className={styles.titleContainer}>
          <div className={styles.titleContainerItem}>
            {gameReady && (
              <h2
                className={styles.backButton}
                onClick={() => dispatch(resetGame())}
              >
                назад
              </h2>
            )}
          </div>
          <div className={styles.titleContainerItem}>
            <h1>Лабиринт</h1>
          </div>
          <div className={styles.titleContainerItem}></div>
        </div>
        {!gameReady && <GameSetup />}
        {gameReady && <Labyrinth />}
      </div>
    </LazyMotion>
  );
}

export default App;
