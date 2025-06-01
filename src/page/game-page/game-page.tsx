import { useCallback, useEffect, useMemo, useState } from 'react';

import { form } from '../../services/slices/formSlice';
import { useAppSelector } from '../../services/store';
import { generateWinConditions, shuffleTwoStrings } from '../../utils/functions';
import { GameBoard } from '../../components/game-board/game-board';

import styles from './game-page.module.scss';

const GAME_STATUS = {
  PLAYING: 'playing',
  WIN: 'win',
  DRAW: 'draw',
} as const;

export const GamePage = () => {
  const boardSize = 9;
  const [players, setPlayers] = useState<string[]>([]);
  const [move, setMove] = useState(0);
  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(''));
  const [hoverPreview, setHoverPreview] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<string>(GAME_STATUS.PLAYING);
  const [winner, setWinner] = useState('');
  const { firstPlayer, secondPlayer } = useAppSelector(form);

  const winConditions = useMemo(() => generateWinConditions(boardSize), []);
  const isPlaying = useMemo(() => gameStatus === GAME_STATUS.PLAYING, [gameStatus]);

  useEffect(() => {
    setPlayers(shuffleTwoStrings(firstPlayer, secondPlayer));
  }, [firstPlayer, secondPlayer]);

  const checkWin = useCallback(
    (board: string[]) => {
      for (const condition of winConditions) {
        const firstSymbol = board[condition[0]];
        if (!firstSymbol) continue;
        const isWinningLine =
          condition.length === boardSize &&
          condition.every((index) => board[index] === firstSymbol);
        if (isWinningLine) {
          setWinner(firstSymbol === 'X' ? players[0] : players[1]);
          setGameStatus(GAME_STATUS.WIN);
          return true;
        }
      }

      if (!board.includes('')) {
        setGameStatus(GAME_STATUS.DRAW);
        return true;
      }
      return false;
    },
    [winConditions, players],
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

  const statusMessage = useMemo(() => {
    if (!isPlaying) {
      return (
        <>
          {gameStatus === GAME_STATUS.DRAW && <p className={styles.gamePage_draw}>Ничья</p>}
          {gameStatus === GAME_STATUS.WIN && (
            <p className={styles.gamePage_win}>
              Победил: <span className={styles.gamePage_winner}>{winner}</span>
            </p>
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
        hoverPreview={hoverPreview}
        move={move}
        onCellClick={handleCellClick}
        onCellHover={handleCellHover}
        onCellLeave={handleCellLeave}
      />
    </section>
  );
};
