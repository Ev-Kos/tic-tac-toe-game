import { CheckIcon } from '../icons/check-icon';

import styles from './input-check.module.scss';

type TInputCheckProps = {
  isCheck: boolean;
  name: string;
  isDisabled: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputCheck = ({ isCheck, name, isDisabled, ...props }: TInputCheckProps) => {
  return (
    <div className={isDisabled ? styles.inputWrap_disabled : styles.inputWrap}>
      <label className={styles.input_label}>
        {isCheck && <CheckIcon />}
        <input type="checkbox" className={styles.input} {...props} name={name} />
      </label>
      <span className={styles.input_text}>Играть с компьютером</span>
    </div>
  );
};
