import { Route, Routes } from 'react-router';

import { LoginPage } from '../../page/login-page/login-page';
import { GamePage } from '../../page/game-page/game-page';
import ProtectedRoute from '../protected-route/protected-route';

import styles from './app.module.scss';

function App() {
  return (
    <main className={styles.app}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </main>
  );
}

export default App;
