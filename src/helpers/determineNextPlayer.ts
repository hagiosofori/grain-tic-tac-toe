import { Player } from '../types';

export default function determineNextPlayer(
  currentPlayerIndex: number,
  players: Player[]
) {
  if (currentPlayerIndex + 1 >= players.length) return 0;
  return currentPlayerIndex + 1;
}
