import { useId } from 'react';

import { CheckIcon } from '../icons/check-icon';

import styles from './input-check.module.scss';

type TInputCheckProps = {
  isCheck: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputCheck = ({ isCheck, ...props }: TInputCheckProps) => {
  const inputId = useId();

  return (
    <div className={styles.inputWrap}>
      <label className={styles.input_label}>
        {isCheck && <CheckIcon />}
        <input type="checkbox" className={styles.input} {...props} id={inputId} />
      </label>
      <span className={styles.input_text}>Играть с компьютером</span>
    </div>
  );
};
