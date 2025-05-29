import { Button } from '../components/button/button';
import { InputCheck } from '../components/input-check/input-check';
import { Input } from '../components/input/input';

import styles from './login.module.scss';

export const LoginPage = () => {
  return (
    <section className={styles.login}>
      <form className={styles.login_form}>
        <div className={styles.login_inputs}>
          <Input title="1 игрок" />
          <Input title="2 игрок" />
          <InputCheck isCheck={true} />
        </div>
        <Button type="button">Играть</Button>
      </form>
    </section>
  );
};
