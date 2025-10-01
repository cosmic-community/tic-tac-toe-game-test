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
  boardSize: number;
  timeLeft: number;
  timerEnabled: boolean;
}

export type WinningCombination = number[];

export interface GameSettings {
  boardSize: number;
  timerEnabled: boolean;
  timerDuration: number;
}