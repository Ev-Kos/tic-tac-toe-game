import { GAME_STATUS } from './constants';
import type { CheckWinResult } from './types';

export const shuffleTwoStrings = (str1: string, str2: string) => {
  return Math.random() < 0.5 ? [str1, str2] : [str2, str1];
};

export const checkWin = (
  board: string[],
  lastIndex: number,
  symbol: string,
  boardSize: number,
  winLength: number,
): CheckWinResult => {
  const row = Math.floor(lastIndex / boardSize);
  const col = lastIndex % boardSize;

  // Проверка горизонтали
  let count = 1;
  // Влево
  for (let c = col - 1; c >= 0 && board[row * boardSize + c] === symbol; c--) {
    count++;
  }
  // Вправо
  for (let c = col + 1; c < boardSize && board[row * boardSize + c] === symbol; c++) {
    count++;
  }
  if (count >= winLength) {
    return { status: GAME_STATUS.WIN, winner: symbol };
  }

  // Проверка вертикали
  count = 1;
  // Вверх
  for (let r = row - 1; r >= 0 && board[r * boardSize + col] === symbol; r--) {
    count++;
  }
  // Вниз
  for (let r = row + 1; r < boardSize && board[r * boardSize + col] === symbol; r++) {
    count++;
  }
  if (count >= winLength) {
    return { status: GAME_STATUS.WIN, winner: symbol };
  }

  // Проверка диагонали: слева-сверху → справа-вниз
  count = 1;
  // Вверх-влево
  for (
    let r = row - 1, c = col - 1;
    r >= 0 && c >= 0 && board[r * boardSize + c] === symbol;
    r--, c--
  ) {
    count++;
  }
  // Вниз-вправо
  for (
    let r = row + 1, c = col + 1;
    r < boardSize && c < boardSize && board[r * boardSize + c] === symbol;
    r++, c++
  ) {
    count++;
  }

  if (count >= winLength) {
    return { status: GAME_STATUS.WIN, winner: symbol };
  }

  // Проверка диагонали: справа-сверху → слева-вниз
  count = 1;
  // Вверх-вправо
  for (
    let r = row - 1, c = col + 1;
    r >= 0 && c < boardSize && board[r * boardSize + c] === symbol;
    r--, c++
  ) {
    count++;
  }
  // Вниз-влево
  for (
    let r = row + 1, c = col - 1;
    r < boardSize && c >= 0 && board[r * boardSize + c] === symbol;
    r++, c--
  ) {
    count++;
  }
  if (count >= winLength) {
    return { status: GAME_STATUS.WIN, winner: symbol };
  }

  // Проверка на ничью
  if (!board.includes('')) {
    return { status: GAME_STATUS.DRAW };
  }

  return { status: GAME_STATUS.PLAYING };
};

export const formatDate = (dateIso: string): string => {
  const date = new Date(dateIso);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
