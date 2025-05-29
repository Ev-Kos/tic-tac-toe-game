export const validateForm = (
  values: { firstPlayer: string; secondPlayer: string },
  isBot: boolean,
) => {
  const errors = {
    firstPlayer: '',
    secondPlayer: '',
  };

  if (!values.firstPlayer.trim()) {
    errors.firstPlayer = 'Поле не может быть пустым';
  } else if (values.firstPlayer.length > 10) {
    errors.firstPlayer = 'Ник не должен быть длиннее 10 символов';
  }

  if (!isBot) {
    if (!values.secondPlayer.trim()) {
      errors.secondPlayer = 'Поле не может быть пустым';
    } else if (values.secondPlayer.length > 10) {
      errors.secondPlayer = 'Ник не должен быть длиннее 10 символов';
    } else if (values.firstPlayer === values.secondPlayer) {
      errors.secondPlayer = 'Ники игроков не могут быть одинаковыми';
    }
  }

  return errors;
};
