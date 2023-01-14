
export default function createSquares(dimension: number) {
  const dim = Math.abs(dimension);
  const twoDArray = new Array(dim).fill("").map(() => new Array(dim).fill(""));

  return twoDArray;
}