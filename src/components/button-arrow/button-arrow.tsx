import { useNavigate } from 'react-router';
import type { ButtonHTMLAttributes } from 'react';

import { ArrowIcon } from '../icons/arrow-icon';

import styles from './button-arrow.module.scss';

type TButtonArrowProps = {
  isLeft?: boolean;
  width?: string;
  height?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonArrow = ({
  isLeft = true,
  width = '72px',
  height = '23px',
  ...props
}: TButtonArrowProps) => {
  const navigate = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate(-1)} {...props}>
      <ArrowIcon
        className={isLeft ? styles.button_left : styles.button_right}
        width={width}
        height={height}
      />
    </button>
  );
};
