import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

import { generateGameData } from "../../utils/gameHelpers";

interface IGameOptions {
  gameDifficulty: number;
  gameSpeed: number;
  amountOfMoves: number;
  gameReady: boolean;
  fieldSize: ICoords;
}

interface IGameSettings {
  moves: IMove[];
  startPos: ICoords;
  finishPos: ICoords;
}

interface IGameEnd {
  guessPos: ICoords;
  gameEnded: boolean;
  finishGuessedCorrectly: boolean;
}

export interface IGame extends IGameOptions, IGameSettings, IGameEnd {}

const initialState: IGame = {
  gameDifficulty: 1,
  gameSpeed: 1,
  amountOfMoves: 1,
  gameReady: false,
  fieldSize: { x: -1, y: -1 },
  moves: [],
  startPos: { x: -1, y: -1 },
  finishPos: { x: -1, y: -1 },
  guessPos: { x: -1, y: -1 },
  gameEnded: false,
  finishGuessedCorrectly: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameOptions: (state, action: PayloadAction<IGameOptions>) => {
      return {
        ...state,
        gameDifficulty: action.payload.gameDifficulty,
        gameSpeed: action.payload.gameSpeed,
        amountOfMoves: action.payload.amountOfMoves,
        gameReady: action.payload.gameReady,
        fieldSize: action.payload.fieldSize,
      };
    },
    guessFinish: (state, action: PayloadAction<IGameEnd>) => {
      return {
        ...state,
        guessPos: action.payload.guessPos,
        gameEnded: action.payload.gameEnded,
        finishGuessedCorrectly: action.payload.finishGuessedCorrectly,
      };
    },
    restartGame: (state, action: PayloadAction<IGameSettings>) => {
      return {
        ...state,
        moves: action.payload.moves,
        startPos: action.payload.startPos,
        finishPos: action.payload.finishPos,
        guessPos: initialState.guessPos,
        gameEnded: initialState.gameEnded,
        finishGuessedCorrectly: initialState.finishGuessedCorrectly,
      };
    },
    resetGame: () => {
      return initialState;
    },
  },
});

export const { setGameOptions, guessFinish, restartGame, resetGame } =
  gameSlice.actions;

const selectStartPosition = (state: RootState) => state.game.startPos;
const selectFieldSize = (state: RootState) => state.game.fieldSize;
const selectAmountOfMoves = (state: RootState) => state.game.amountOfMoves;

export const gameRestart =
  (delay: number): AppThunk =>
  (dispatch, getState) => {
    const startPos = selectStartPosition(getState());
    const fieldSize = selectFieldSize(getState());
    const amountOfMoves = selectAmountOfMoves(getState());
    const gameData = generateGameData(fieldSize, amountOfMoves, startPos);

    setTimeout(() => {
      dispatch(restartGame(gameData));
    }, delay);
  };

export default gameSlice.reducer;
