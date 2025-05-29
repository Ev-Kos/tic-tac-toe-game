import { useId } from 'react';

import styles from './input.module.scss';

export type TInputProps = {
  title: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ title, ...props }: TInputProps) => {
  const inputId = useId();

  return (
    <div className={styles.inputWrap}>
      <label className={styles.inputWrap_label} htmlFor={inputId}>
        {title}
      </label>
      <input
        type="text"
        className={styles.inputWrap_input}
        {...props}
        placeholder="Введите ник"
        id={inputId}
      />
    </div>
  );
};
