import type { Player } from '@/types'

interface GameStatusProps {
  currentPlayer: Player
  winner: Player
  isDraw: boolean
  timeLeft: number
  timerEnabled: boolean
}

export default function GameStatus({ currentPlayer, winner, isDraw, timeLeft, timerEnabled }: GameStatusProps) {
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
      {timerEnabled && (
        <div className="mt-3">
          <div className="text-3xl font-bold">
            <span className={timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500' : 'bg-primary'}`}
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}