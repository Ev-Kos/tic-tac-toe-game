import styles from './button.module.scss';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
