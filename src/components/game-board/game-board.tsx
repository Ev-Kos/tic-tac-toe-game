import { memo, useCallback } from 'react';

import styles from './game-board.module.scss';

type TGameBoardProps = {
  board: string[];
  boardSize: number;
  hoverPreview?: number | null;
  move?: number;
  onCellClick?: (index: number) => void;
  onCellHover?: (index: number) => void;
  onCellLeave?: () => void;
  isHistory?: boolean;
};

export const GameBoard = memo(
  ({
    board,
    boardSize,
    hoverPreview,
    move,
    onCellClick,
    onCellHover,
    onCellLeave,
    isHistory = false,
  }: TGameBoardProps) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onCellClick?.(index);
        }
      },
      [onCellClick],
    );

    return (
      <div
        className={!isHistory ? styles.game_board : styles.game_board_history}
        style={{
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {board.map((item, index) => (
          <div
            className={styles.game_board_cell}
            onClick={() => onCellClick?.(index)}
            onMouseEnter={() => onCellHover?.(index)}
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
