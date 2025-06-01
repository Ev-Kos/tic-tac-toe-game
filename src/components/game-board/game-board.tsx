import { memo, useCallback } from 'react';

import styles from './game-board.module.scss';

type TGameBoardProps = {
  board: string[];
  hoverPreview: number | null;
  move: number;
  onCellClick: (index: number) => void;
  onCellHover: (index: number) => void;
  onCellLeave: () => void;
};

export const GameBoard = memo(
  ({ board, hoverPreview, move, onCellClick, onCellHover, onCellLeave }: TGameBoardProps) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onCellClick(index);
        }
      },
      [onCellClick],
    );

    return (
      <div className={styles.game_board}>
        {board.map((item, index) => (
          <div
            className={styles.game_board_cell}
            onClick={() => onCellClick(index)}
            onMouseEnter={() => onCellHover(index)}
            onMouseLeave={onCellLeave}
            key={index}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            tabIndex={0}
            aria-label={`Ячейка ${index + 1}, ${item ? `занята ${item}` : 'пустая'}`}
          >
            {item === 'X' && <div className={styles.cross}></div>}
            {item === 'O' && <div className={styles.circle}></div>}
            {!item && hoverPreview === index && (
              <div className={move === 0 ? styles.cross : styles.circle}></div>
            )}
          </div>
        ))}
      </div>
    );
  },
);

GameBoard.displayName = 'GameBoard';
