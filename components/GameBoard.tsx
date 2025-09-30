import type { Board } from '@/types'

interface GameBoardProps {
  board: Board
  onCellClick: (index: number) => void
  disabled: boolean
}

export default function GameBoard({ board, onCellClick, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-colors duration-300">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
          className={`
            aspect-square w-full flex items-center justify-center
            text-5xl font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600
            transition-all duration-200
            ${!cell && !disabled ? 'cell-hover cursor-pointer' : ''}
            ${cell === 'X' ? 'cell-x bg-blue-50 dark:bg-blue-900/30' : ''}
            ${cell === 'O' ? 'cell-o bg-red-50 dark:bg-red-900/30' : ''}
            ${disabled || cell ? 'cursor-not-allowed' : ''}
            ${!cell && !disabled ? 'dark:bg-gray-700' : ''}
          `}
        >
          {cell}
        </button>
      ))}
    </div>
  )
}