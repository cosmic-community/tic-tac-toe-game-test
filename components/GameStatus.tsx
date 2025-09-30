import type { Player } from '@/types'

interface GameStatusProps {
  currentPlayer: Player
  winner: Player
  isDraw: boolean
}

export default function GameStatus({ currentPlayer, winner, isDraw }: GameStatusProps) {
  if (winner) {
    return (
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
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
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">It's a draw! 🤝</p>
      </div>
    )
  }

  return (
    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
        Current Player:{' '}
        <span className={currentPlayer === 'X' ? 'text-primary' : 'text-secondary'}>
          {currentPlayer}
        </span>
      </p>
    </div>
  )
}