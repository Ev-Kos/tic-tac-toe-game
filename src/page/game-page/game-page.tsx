import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { form } from '../../services/slices/formSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { checkWin, shuffleTwoStrings } from '../../utils/functions';
import { GameBoard } from '../../components/game-board/game-board';
import { Button } from '../../components/button/button';
import { GAME_STATUS, MIN_BOARD_SIZE, ROUTES } from '../../utils/constants';
import { resetGame, saveGame, setGame } from '../../services/slices/gameSlice';

import styles from './game-page.module.scss';

export const GamePage = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [isNewGame, setNewGame] = useState(true);
  const [hoverPreview, setHoverPreview] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<string>(GAME_STATUS.PLAYING);
  const [winner, setWinner] = useState('');
  const [move, setMove] = useState(0);
  const { firstPlayer, secondPlayer, boardSize } = useAppSelector(form);
  const { game } = useAppSelector((store) => store.game);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isPlaying = useMemo(() => gameStatus === GAME_STATUS.PLAYING, [gameStatus]);

  const board = useMemo(() => {
    const newBoard = Array(boardSize * boardSize).fill('');
    game.forEach(([symbol, index]) => {
      if (index >= 0 && index < newBoard.length) {
        newBoard[index] = symbol;
      }
    });
    return newBoard;
  }, [game, boardSize]);

  useEffect(() => {
    if (isNewGame) {
      setPlayers(shuffleTwoStrings(firstPlayer, secondPlayer));
      dispatch(resetGame());
      setNewGame(false);
      setGameStatus(GAME_STATUS.PLAYING);
      setWinner('');
      setMove(0);
    }
  }, [isNewGame]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (!isPlaying || board[index] !== '') return;

      const symbol = move === 0 ? 'X' : 'O';
      const newBoard = [...board];
      newBoard[index] = symbol;
      dispatch(setGame([symbol, index]));

      const result = checkWin(newBoard, index, symbol, boardSize, MIN_BOARD_SIZE);

      if (result.status === GAME_STATUS.WIN) {
        const winningPlayer = result.winner === 'X' ? players[0] : players[1];
        setWinner(winningPlayer);
        setGameStatus(GAME_STATUS.WIN);
        dispatch(
          saveGame({
            players: players,
            result: result.status,
            winner: winningPlayer,
            boardSize: boardSize,
          }),
        );
      } else if (result.status === GAME_STATUS.DRAW) {
        setGameStatus(GAME_STATUS.DRAW);
        dispatch(saveGame({ players: players, result: result.status, boardSize: boardSize }));
      } else {
        setMove(move === 0 ? 1 : 0);
      }
    },
    [isPlaying, board, move, dispatch, checkWin],
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

  const handleHistoryClick = () => {
    navigate(ROUTES.HISTORY);
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
      <div className={styles.gamePage_buttons}>
        <Button onClick={handleNewGame}>Новая игра</Button>
        <Button onClick={handleHistoryClick}>История</Button>
      </div>
    </section>
  );
};
