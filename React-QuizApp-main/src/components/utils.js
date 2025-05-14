export function shuffleArray(array) {
  // Work on a copy if you need to preserve the original
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    // pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // swap arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}