import { Route, Routes } from 'react-router';

import { LoginPage } from '../../page/login-page/login-page';
import { GamePage } from '../../page/game-page/game-page';

import styles from './app.module.scss';

function App() {
  return (
    <main className={styles.app}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/game" element={<GamePage />}></Route>
      </Routes>
    </main>
  );
}

export default App;
