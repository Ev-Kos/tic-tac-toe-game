import { useNavigate } from 'react-router';

import { ButtonArrow } from '../../components/button-arrow/button-arrow';
import { Button } from '../../components/button/button';
import { useAppSelector } from '../../services/store';
import { ROUTES } from '../../utils/constants';
import { HistoryItem } from '../../components/history-item/history-item';

import styles from './history-page.module.scss';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const { games } = useAppSelector((store) => store.game);

  const goToGame = () => {
    navigate(ROUTES.GAME);
  };

  return (
    <section className={styles.historyPage}>
      <div className={styles.historyPage_button_back}>
        <ButtonArrow />
      </div>
      <h1 className={styles.historyPage_title}>История</h1>
      {games.length === 0 ? (
        <div className={styles.historyPage_empty}>
          <p className={styles.historyPage_empty_text}>Пока нет сыгранных игр</p>
          <Button onClick={goToGame}>Играть</Button>
        </div>
      ) : (
        <ul className={styles.historyPage_games}>
          {games.map((item) => (
            <HistoryItem item={item} key={item.id} />
          ))}
        </ul>
      )}
    </section>
  );
};
