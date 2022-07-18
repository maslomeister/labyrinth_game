import React, { useState } from "react";
import Select from "react-select";

import { useAppDispatch } from "../../services/hooks";
import { gameDifficultyCreator } from "../../utils/gameHelpers";

import { setGameOptions } from "../../services/reducers/gameSlice";

import styles from "./GameSetup.module.css";

const gameDifficultyOptions = [
  { value: 1, label: "Легко" },
  { value: 2, label: "Средне" },
  { value: 3, label: "Сложно" },
];

const gameSpeedOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
];

const amountOfMovesOptions = [
  { value: 10, label: "10" },
  { value: 16, label: "16" },
  { value: 20, label: "20" },
];

export function GameSetup() {
  const [selectedGameDifficulty, setSelectedGameDifficulty] = useState(
    gameDifficultyOptions[0]
  );
  const [selectedGameSpeed, setSelectedGameSpeed] = useState(
    gameSpeedOptions[0]
  );

  const [selectedAmountOfMoves, setSelectedAmountOfMoves] = useState(
    amountOfMovesOptions[0]
  );

  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(
      setGameOptions({
        gameDifficulty: selectedGameDifficulty.value,
        gameSpeed: selectedGameSpeed.value,
        amountOfMoves: selectedAmountOfMoves.value,
        gameReady: true,
        fieldSize: gameDifficultyCreator(selectedGameDifficulty.value),
      })
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.rowOption}>
        <label>Уровень сложности</label>
        <Select
          defaultValue={selectedGameDifficulty}
          onChange={(e) =>
            setSelectedGameDifficulty({ value: e!.value, label: e!.label })
          }
          options={gameDifficultyOptions}
        />
      </div>
      <div className={styles.rowOption}>
        <label>Скорость</label>
        <Select
          defaultValue={selectedGameSpeed}
          onChange={(e) =>
            setSelectedGameSpeed({ value: e!.value, label: e!.label })
          }
          options={gameSpeedOptions}
        />
      </div>
      <div className={styles.rowOption}>
        <label>Количество ходов</label>
        <Select
          defaultValue={selectedAmountOfMoves}
          onChange={(e) =>
            setSelectedAmountOfMoves({ value: e!.value, label: e!.label })
          }
          options={amountOfMovesOptions}
        />
      </div>

      <button className={styles.playButton} onClick={startGame}>
        Играть
      </button>
    </div>
  );
}
