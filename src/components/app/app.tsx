import { Route, Routes } from 'react-router';

import { LoginPage } from '../../page/login';

import styles from './app.module.scss';

function App() {
  return (
    <main className={styles.app}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </main>
  );
}

export default App;
