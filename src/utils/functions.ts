export const shuffleTwoStrings = (str1: string, str2: string) => {
  return Math.random() < 0.5 ? [str1, str2] : [str2, str1];
};
