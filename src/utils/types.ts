import type { GAME_STATUS } from './constants';

export type CheckWinResult =
  | { status: typeof GAME_STATUS.PLAYING }
  | { status: typeof GAME_STATUS.WIN; winner: string }
  | { status: typeof GAME_STATUS.DRAW };

export type TMove = [string, number];
export type TGame = {
  id: string;
  date: string;
  moves: TMove[];
  players: string[];
  result: string;
  winner?: string;
  boardSize: number;
};
