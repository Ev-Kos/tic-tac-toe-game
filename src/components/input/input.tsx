import { useId } from 'react';

import styles from './input.module.scss';

export type TInputProps = {
  title: string;
  name: string;
  error: string;
  isDisabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ title, name, error, isDisabled, ...props }: TInputProps) => {
  const inputId = useId();

  return (
    <div className={isDisabled ? styles.inputWrap_disabled : styles.inputWrap}>
      <div className={styles.inputMain}>
        <label className={styles.input_label} htmlFor={inputId}>
          {title}
        </label>
        <input
          type="text"
          className={styles.input}
          {...props}
          placeholder="Введите ник"
          name={name}
          id={inputId}
        />
        <span className={styles.input_error}>{error}</span>
      </div>
    </div>
  );
};
