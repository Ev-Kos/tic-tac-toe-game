import { useEffect, useState } from 'react';

import { formatDate } from '../../utils/functions';
import type { TGame } from '../../utils/types';
import { ButtonArrow } from '../button-arrow/button-arrow';
import { GameBoard } from '../game-board/game-board';

import styles from './history-item.module.scss';

type THistoryItemProps = {
  item: TGame;
};

export const HistoryItem = ({ item }: THistoryItemProps) => {
  const [board, setBoard] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState(item.moves.length);

  useEffect(() => {
    const newBoard = Array(item.boardSize * item.boardSize).fill('');
    for (let i = 0; i < currentMove; i++) {
      const [symbol, index] = item.moves[i];
      newBoard[index] = symbol;
    }
    setBoard(newBoard);
  }, [item.moves, currentMove]);

  const handlePrevMove = () => {
    if (currentMove > 0) {
      setCurrentMove((prev) => prev - 1);
    }
  };

  const handleNextMove = () => {
    if (currentMove < item.moves.length) {
      setCurrentMove((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.game}>
      <div className={styles.game_info}>
        <p className={styles.game_players}>
          {item.players[0]}
          <span className={styles.game_separator}>vs</span>
          {item.players[1]}
        </p>
        <p className={item.winner ? styles.game_result_win : styles.game_result_draw}>
          {item.winner ? `Победа: ${item.winner}` : 'Ничья'}
        </p>
      </div>
      <div className={styles.game_board}>
        <div className={currentMove === 1 ? styles.game_arrow_hidden : ''}>
          <ButtonArrow width="45px" onClick={handlePrevMove} />
        </div>
        <GameBoard board={board} boardSize={item.boardSize} isHistory={true} />
        <div className={currentMove === item.moves.length ? styles.game_arrow_hidden : ''}>
          <ButtonArrow width="45px" isLeft={false} onClick={handleNextMove} />
        </div>
      </div>
      <p className={styles.game_date}>{formatDate(item.date)}</p>
    </div>
  );
};
