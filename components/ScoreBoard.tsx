interface ScoreBoardProps {
  scores: {
    X: number
    O: number
  }
  onResetScores: () => void
}

export default function ScoreBoard({ scores, onResetScores }: ScoreBoardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Score</h2>
        <button
          onClick={onResetScores}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Reset Scores
        </button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{scores.X}</div>
          <div className="text-sm text-gray-600 mt-1">Player X</div>
        </div>
        <div className="text-3xl font-bold text-gray-400">-</div>
        <div className="text-center">
          <div className="text-3xl font-bold text-secondary">{scores.O}</div>
          <div className="text-sm text-gray-600 mt-1">Player O</div>
        </div>
      </div>
    </div>
  )
}