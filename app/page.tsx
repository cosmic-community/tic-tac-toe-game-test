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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tic-Tac-Toe</h1>
          <p className="text-gray-600 dark:text-gray-400">Challenge yourself or a friend!</p>
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

        {/* Instagram Link */}
        <div className="flex justify-center pt-4">
          <a
            href="https://instagram.com/c6.trev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
            aria-label="Follow on Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-sm font-medium">@c6.trev</span>
          </a>
        </div>
      </div>
    </main>
  )
}