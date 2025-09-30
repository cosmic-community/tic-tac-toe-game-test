'use client'

import { useState, useEffect } from 'react'
import type { Player, Board, GameState, WinningCombination } from '@/types'
import GameBoard from '@/components/GameBoard'
import GameStatus from '@/components/GameStatus'
import ScoreBoard from '@/components/ScoreBoard'

const WINNING_COMBINATIONS: WinningCombination[] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
]

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    scores: {
      X: 0,
      O: 0
    }
  })

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('tic-tac-toe-scores')
    if (savedScores) {
      const scores = JSON.parse(savedScores)
      setGameState(prev => ({ ...prev, scores }))
    }
  }, [])

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tic-tac-toe-scores', JSON.stringify(gameState.scores))
  }, [gameState.scores])

  const checkWinner = (board: Board): Player => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const checkDraw = (board: Board): boolean => {
    return board.every(cell => cell !== null) && !checkWinner(board)
  }

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) {
      return
    }

    const newBoard = [...gameState.board]
    newBoard[index] = gameState.currentPlayer

    const winner = checkWinner(newBoard)
    const isDraw = checkDraw(newBoard)

    let newScores = { ...gameState.scores }
    if (winner) {
      newScores = {
        ...newScores,
        [winner]: newScores[winner] + 1
      }
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      isDraw,
      scores: newScores
    })
  }

  const resetGame = () => {
    setGameState(prev => ({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      scores: prev.scores
    }))
  }

  const resetScores = () => {
    const newScores = { X: 0, O: 0 }
    localStorage.setItem('tic-tac-toe-scores', JSON.stringify(newScores))
    setGameState(prev => ({
      ...prev,
      scores: newScores
    }))
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tic-Tac-Toe</h1>
          <p className="text-gray-600">Challenge yourself or a friend!</p>
        </div>

        <ScoreBoard scores={gameState.scores} onResetScores={resetScores} />
        
        <GameStatus
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          isDraw={gameState.isDraw}
        />

        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={!!gameState.winner || gameState.isDraw}
        />

        <button
          onClick={resetGame}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-lg"
        >
          Reset Game
        </button>
      </div>
    </main>
  )
}