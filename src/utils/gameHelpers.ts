import { v4 as uuid } from "uuid";

const randomExcluded = (min: number, max: number, exclude: number) => {
  let ranNum = Math.floor(Math.random() * (max - min)) + min;

  if (ranNum === exclude) {
    ranNum = randomExcluded(min, max, exclude);
  }

  return ranNum;
};

export const gameSpeedValue = (gameSpeed: number) => {
  switch (gameSpeed) {
    case 1:
      return 1.8;
    case 2:
      return 1.5;
    case 3:
      return 1;

    default:
      return 1.8;
  }
};

export const generateField = (fieldSize: ICoords): ICoords[] => {
  let field = [];
  for (let i = 1; i <= fieldSize.y; i++) {
    for (let j = 1; j <= fieldSize.x; j++) {
      field.push({ x: j, y: i });
    }
  }
  return field;
};

export const gameDifficultyCreator = (difficulty: number): ICoords => {
  switch (difficulty) {
    case 1:
      return { x: 3, y: 3 };
    case 2:
      return { x: 4, y: 4 };
    case 3:
      return { x: 6, y: 6 };

    default:
      return { x: 3, y: 3 };
  }
};

export const generateAllowedMoves = (
  currentPos: ICoords,
  maxPos: ICoords
): IMove[] => {
  let moves = [];
  const id = uuid();

  if (currentPos.x > 1) {
    moves.push({ id, x: currentPos.x - 1, y: currentPos.y, dir: "left" });
  }

  if (currentPos.x < maxPos.x - 1) {
    moves.push({ id, x: currentPos.x + 1, y: currentPos.y, dir: "right" });
  }

  if (currentPos.y > 1) {
    moves.push({ id, x: currentPos.x, y: currentPos.y - 1, dir: "up" });
  }
  if (currentPos.y < maxPos.y - 1) {
    moves.push({ id, x: currentPos.x, y: currentPos.y + 1, dir: "down" });
  }

  return moves;
};

export const generateGameData = (
  fieldSize: ICoords,
  amountOfMoves: number,
  startPosition: ICoords
): IFieldOptions => {
  let moves = [];

  const startPos = {
    x: randomExcluded(1, fieldSize.x, startPosition.x),
    y: randomExcluded(1, fieldSize.y, startPosition.y),
  };

  const finishPos = {
    x: -1,
    y: -1,
  };

  const currentPos = {
    x: startPos.x,
    y: startPos.y,
  };

  for (let i = 0; i < amountOfMoves; i++) {
    const allowedMoves = generateAllowedMoves(currentPos, fieldSize);

    let move = allowedMoves[Math.floor(Math.random() * allowedMoves.length)];

    if (i === amountOfMoves - 1) {
      while (move.x === startPos.x && move.y === startPos.y) {
        move = allowedMoves[Math.floor(Math.random() * allowedMoves.length)];
      }
      finishPos.x = move.x;
      finishPos.y = move.y;
    }

    const id = uuid();

    currentPos.x = move.x;
    currentPos.y = move.y;
    move.id = id;
    moves.push(move);
  }

  return { moves, startPos, finishPos };
};
