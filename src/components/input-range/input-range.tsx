import { useEffect, useId, useState } from 'react';

import styles from './input-range.module.scss';

type TInputRangeProps = {
  min: number;
  max: number;
  value: number;
  colorTrack?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputRange = ({
  colorTrack = '#a8abac',
  value,
  min,
  max,
  ...props
}: TInputRangeProps) => {
  const [background, setBackground] = useState('');
  const percentage = ((value - min) / (max - min)) * 100;

  const inputId = useId();

  useEffect(() => {
    setBackground(`linear-gradient(to right, #08c96c ${percentage}%,${colorTrack} ${percentage}% `);
  }, [value]);

  return (
    <div className={styles.container}>
      <label className={styles.input_label} htmlFor={inputId}>
        Размер поля
      </label>
      <div className={styles.input_wrap}>
        <input
          type="range"
          className={styles.input}
          {...props}
          min={min}
          max={max}
          step={1}
          value={value}
          style={{ background: background }}
          id={inputId}
        />
        <p className={styles.input_value}>{`${value}x${value}`}</p>
      </div>
    </div>
  );
};
