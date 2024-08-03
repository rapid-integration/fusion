export const shuffled = <T>(source: T[]): T[] => {
  let currentIndex = source.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [source[currentIndex], source[randomIndex]] = [source[randomIndex], source[currentIndex]];
  }

  return source;
};
