export const shuffleTwoStrings = (str1: string, str2: string) => {
  return Math.random() < 0.5 ? [str1, str2] : [str2, str1];
};

export const generateWinConditions = (size: number) => {
  const conditions: number[][] = [];

  // Горизонтальные линии
  for (let row = 0; row < size; row++) {
    const condition = [];
    for (let col = 0; col < size; col++) {
      condition.push(row * size + col);
    }
    conditions.push(condition);
  }

  // Вертикальные линии
  for (let col = 0; col < size; col++) {
    const condition = [];
    for (let row = 0; row < size; row++) {
      condition.push(row * size + col);
    }
    conditions.push(condition);
  }

  // Главная диагональ
  const diag1 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
  }
  conditions.push(diag1);

  // Побочная диагональ
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag2.push(i * size + (size - 1 - i));
  }
  conditions.push(diag2);

  return conditions;
};
