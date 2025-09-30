import type { Player } from '@/types'

interface GameStatusProps {
  currentPlayer: Player
  winner: Player
  isDraw: boolean
}

export default function GameStatus({ currentPlayer, winner, isDraw }: GameStatusProps) {
  if (winner) {
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-lg">
        <p className="text-2xl font-bold">
          <span className={winner === 'X' ? 'text-primary' : 'text-secondary'}>
            Player {winner}
          </span>
          {' '}wins! 🎉
        </p>
      </div>
    )
  }

  if (isDraw) {
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-lg">
        <p className="text-2xl font-bold text-gray-700">It's a draw! 🤝</p>
      </div>
    )
  }

  return (
    <div className="text-center p-6 bg-white rounded-xl shadow-lg">
      <p className="text-xl font-semibold text-gray-700">
        Current Player:{' '}
        <span className={currentPlayer === 'X' ? 'text-primary' : 'text-secondary'}>
          {currentPlayer}
        </span>
      </p>
    </div>
  )
}