export type Player = 'X' | 'O' | null;

export type Board = Player[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  isDraw: boolean;
  scores: {
    X: number;
    O: number;
  };
}

export type WinningCombination = [number, number, number];