import { useEffect, useState } from 'react';

import { form } from '../../services/slices/formSlice';
import { useAppSelector } from '../../services/store';
import { shuffleTwoStrings } from '../../utils/functions';

import styles from './game-page.module.scss';

const GAME_STATUS = {
  PLAYING: 'playing',
  WIN: 'win',
  DRAW: 'draw',
} as const;

export const GamePage = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [move, setMove] = useState(0);
  const [board, setBoard] = useState(Array(25).fill(''));
  const [hoverPreview, setHoverPreview] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
  const [winner, setWinner] = useState('');

  const { firstPlayer, secondPlayer } = useAppSelector(form);

  console.log(setGameStatus, setWinner);
  useEffect(() => {
    const arrPlayers = shuffleTwoStrings(firstPlayer, secondPlayer);
    setPlayers(arrPlayers);
  }, []);

  const handleCellClick = (index: number) => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;
    if (move === 0) {
      const newBoard = [...board];
      newBoard[index] = 'X';
      setMove(1);
      setBoard(newBoard);
    } else {
      const newBoard = [...board];
      newBoard[index] = 'O';
      setMove(0);
      setBoard(newBoard);
    }
  };

  const handleCellHover = (index: number) => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;
    if (board[index] === '') {
      setHoverPreview(index);
    }
  };

  const handleCellLeave = () => {
    setHoverPreview(null);
  };

  // 	function checkWin(board, symbol) {
  //   const size = 5; // Размер поля
  //   const winLength = 5; // Количество символов для победы

  //   // Проверка горизонтальных линий
  //   for (let row = 0; row < size; row++) {
  //     for (let col = 0; col <= size - winLength; col++) {
  //       let win = true;
  //       for (let i = 0; i < winLength; i++) {
  //         if (board[row * size + col + i] !== symbol) {
  //           win = false;
  //           break;
  //         }
  //       }
  //       if (win) return true;
  //     }
  //   }

  //   // Проверка вертикальных линий
  //   for (let col = 0; col < size; col++) {
  //     for (let row = 0; row <= size - winLength; row++) {
  //       let win = true;
  //       for (let i = 0; i < winLength; i++) {
  //         if (board[(row + i) * size + col] !== symbol) {
  //           win = false;
  //           break;
  //         }
  //       }
  //       if (win) return true;
  //     }
  //   }

  //   // Проверка диагоналей (сверху-слева вниз-вправо)
  //   for (let row = 0; row <= size - winLength; row++) {
  //     for (let col = 0; col <= size - winLength; col++) {
  //       let win = true;
  //       for (let i = 0; i < winLength; i++) {
  //         if (board[(row + i) * size + col + i] !== symbol) {
  //           win = false;
  //           break;
  //         }
  //       }
  //       if (win) return true;
  //     }
  //   }

  //   // Проверка диагоналей (сверху-справа вниз-влево)
  //   for (let row = 0; row <= size - winLength; row++) {
  //     for (let col = winLength - 1; col < size; col++) {
  //       let win = true;
  //       for (let i = 0; i < winLength; i++) {
  //         if (board[(row + i) * size + col - i] !== symbol) {
  //           win = false;
  //           break;
  //         }
  //       }
  //       if (win) return true;
  //     }
  //   }

  //   return false; // Победа не найдена
  // }

  return (
    <section className={styles.gamePage}>
      <h1 className={styles.gamePage_title}>Крестики - нолики</h1>
      {gameStatus !== GAME_STATUS.PLAYING ? (
        <>
          {gameStatus === GAME_STATUS.DRAW && <p className={styles.gamePage_draw}>Ничья</p>}
          {gameStatus === GAME_STATUS.WIN && (
            <p className={styles.gamePage_win}>
              Победил:
              <span className={styles.gamePage_winner}>{winner}</span>
            </p>
          )}
        </>
      ) : (
        <>
          <div className={styles.gamePage_text_marker_wrap}>
            <p className={styles.gamePage_text_marker}>
              Х:
              <span className={styles.gamePage_player}>{players[0]}</span>
            </p>
            <p className={styles.gamePage_text_marker}>
              0:
              <span className={styles.gamePage_player}>{players[1]}</span>
            </p>
          </div>
        </>
      )}
      <div>
        <p
          className={
            gameStatus === GAME_STATUS.PLAYING ? styles.gamePage_text : styles.gamePage_text_hidden
          }
        >
          Ход игорока:
          <span className={styles.gamePage_player}>{players[move]}</span>
        </p>
        <div className={styles.gamePage_game_board}>
          {board.map((item, index) => (
            <div
              className={styles.gamePage_game_board_cell}
              onClick={() => handleCellClick(index)}
              onMouseEnter={() => handleCellHover(index)}
              onMouseLeave={handleCellLeave}
              key={index}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCellClick(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Ячейка ${index + 1}, ${board[index] ? `занята ${board[index]}` : 'пустая'}`}
            >
              <>
                {item === 'X' && <div className={styles.cross}></div>}
                {item === 'O' && <div className={styles.circle}></div>}
                {item === '' && hoverPreview === index && (
                  <div className={move === 0 ? styles.cross : styles.circle}></div>
                )}
              </>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
