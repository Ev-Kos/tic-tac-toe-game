import { Route, Routes } from 'react-router';

import { LoginPage } from '../../page/login-page/login-page';
import { GamePage } from '../../page/game-page/game-page';
import ProtectedRoute from '../protected-route/protected-route';
import { ROUTES } from '../../utils/constants';
import { HistoryPage } from '../../page/history-page/history-page';

import styles from './app.module.scss';

function App() {
  return (
    <main className={styles.app}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.GAME}
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={ROUTES.HISTORY}
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </main>
  );
}

export default App;
