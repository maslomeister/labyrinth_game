interface ICoords {
  x: number;
  y: number;
}

interface IMove {
  id: string;
  x: number;
  y: number;
  dir: string;
}

interface IFieldOptions {
  moves: IMove[];
  startPos: ICoords;
  finishPos: ICoords;
}
