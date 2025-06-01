import { useCallback, useEffect, useMemo, useState } from 'react';

import { form } from '../../services/slices/formSlice';
import { useAppSelector } from '../../services/store';
import { shuffleTwoStrings } from '../../utils/functions';
import { GameBoard } from '../../components/game-board/game-board';
import { Button } from '../../components/button/button';
import { MIN_BOARD_SIZE } from '../../utils/constants';

import styles from './game-page.module.scss';

const GAME_STATUS = {
  PLAYING: 'playing',
  WIN: 'win',
  DRAW: 'draw',
} as const;

export const GamePage = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [move, setMove] = useState(0);
  const [board, setBoard] = useState<string[]>([]);
  const [isNewGame, setNewGame] = useState(true);
  const [hoverPreview, setHoverPreview] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<string>(GAME_STATUS.PLAYING);
  const [winner, setWinner] = useState('');
  const { firstPlayer, secondPlayer, boardSize } = useAppSelector(form);

  const isPlaying = useMemo(() => gameStatus === GAME_STATUS.PLAYING, [gameStatus]);

  useEffect(() => {
    if (isNewGame) {
      setPlayers(shuffleTwoStrings(firstPlayer, secondPlayer));
      setBoard(Array(boardSize * boardSize).fill(''));
      setMove(0);
      setNewGame(false);
      setGameStatus(GAME_STATUS.PLAYING);
    }
  }, [isNewGame]);

  const checkWin = useCallback(
    (board: string[]) => {
      const winLength = MIN_BOARD_SIZE;

      // По горизонтали
      for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col <= boardSize - winLength; col++) {
          const index = row * boardSize + col;
          if (!board[index]) continue;

          let win = true;
          for (let i = 1; i < winLength; i++) {
            if (board[index + i] !== board[index]) {
              win = false;
              break;
            }
          }

          if (win) {
            setWinner(board[index] === 'X' ? players[0] : players[1]);
            setGameStatus(GAME_STATUS.WIN);
            return true;
          }
        }
      }

      // По вертикали
      for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row <= boardSize - winLength; row++) {
          const index = row * boardSize + col;
          if (!board[index]) continue;

          let win = true;
          for (let i = 1; i < winLength; i++) {
            if (board[index + i * boardSize] !== board[index]) {
              win = false;
              break;
            }
          }

          if (win) {
            setWinner(board[index] === 'X' ? players[0] : players[1]);
            setGameStatus(GAME_STATUS.WIN);
            return true;
          }
        }
      }

      // По диагонали: слева-сверху → справа-вниз
      for (let row = 0; row <= boardSize - winLength; row++) {
        for (let col = 0; col <= boardSize - winLength; col++) {
          const index = row * boardSize + col;
          if (!board[index]) continue;

          let win = true;
          for (let i = 1; i < winLength; i++) {
            const nextIndex = index + i * (boardSize + 1);
            if (board[nextIndex] !== board[index]) {
              win = false;
              break;
            }
          }

          if (win) {
            setWinner(board[index] === 'X' ? players[0] : players[1]);
            setGameStatus(GAME_STATUS.WIN);
            return true;
          }
        }
      }

      // По диагонали: справа-сверху → слева-вниз
      for (let row = 0; row <= boardSize - winLength; row++) {
        for (let col = winLength - 1; col < boardSize; col++) {
          const index = row * boardSize + col;
          if (!board[index]) continue;

          let win = true;
          for (let i = 1; i < winLength; i++) {
            const nextIndex = index + i * (boardSize - 1);
            if (board[nextIndex] !== board[index]) {
              win = false;
              break;
            }
          }

          if (win) {
            setWinner(board[index] === 'X' ? players[0] : players[1]);
            setGameStatus(GAME_STATUS.WIN);
            return true;
          }
        }
      }

      // Ничья
      if (!board.includes('')) {
        setGameStatus(GAME_STATUS.DRAW);
        return true;
      }

      return false;
    },
    [players, boardSize],
  );

  const handleCellClick = useCallback(
    (index: number) => {
      if (!isPlaying || board[index] !== '') return;
      const newBoard = [...board];
      newBoard[index] = move === 0 ? 'X' : 'O';

      setBoard(newBoard);
      if (!checkWin(newBoard)) {
        setMove(move === 0 ? 1 : 0);
      }
    },
    [isPlaying, board, move, checkWin],
  );

  const handleCellHover = useCallback(
    (index: number) => {
      if (!isPlaying || board[index] !== '') return;
      setHoverPreview(index);
    },
    [isPlaying, board],
  );

  const handleCellLeave = useCallback(() => {
    setHoverPreview(null);
  }, []);

  const handleNewGame = () => {
    setNewGame(true);
  };

  const statusMessage = useMemo(() => {
    if (!isPlaying) {
      return (
        <>
          {gameStatus === GAME_STATUS.DRAW && <p className={styles.gamePage_draw}>Ничья</p>}
          {gameStatus === GAME_STATUS.WIN && (
            <>
              <p className={styles.gamePage_win}>
                Победил: <span className={styles.gamePage_winner}>{winner}</span>
              </p>
            </>
          )}
        </>
      );
    }
    return (
      <>
        <div className={styles.gamePage_text_marker_wrap}>
          <p className={styles.gamePage_text_marker}>
            Х: <span className={styles.gamePage_player}>{players[0]}</span>
          </p>
          <p className={styles.gamePage_text_marker}>
            0: <span className={styles.gamePage_player}>{players[1]}</span>
          </p>
        </div>
        <p className={styles.gamePage_text}>
          Ход игрока: <span className={styles.gamePage_player}>{players[move]}</span>
        </p>
      </>
    );
  }, [isPlaying, gameStatus, winner, players, move]);

  return (
    <section className={styles.gamePage}>
      <h1 className={styles.gamePage_title}>Крестики - нолики</h1>
      {statusMessage}
      <GameBoard
        board={board}
        boardSize={boardSize}
        hoverPreview={hoverPreview}
        move={move}
        onCellClick={handleCellClick}
        onCellHover={handleCellHover}
        onCellLeave={handleCellLeave}
      />
      <Button onClick={handleNewGame}>Новая игра</Button>
    </section>
  );
};
