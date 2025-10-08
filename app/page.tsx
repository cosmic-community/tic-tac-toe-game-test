'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Player, Board, GameState, WinningCombination, GameSettings } from '@/types'
import GameBoard from '@/components/GameBoard'
import GameStatus from '@/components/GameStatus'
import ScoreBoard from '@/components/ScoreBoard'
import BugReportModal from '@/components/BugReportModal'
import SettingsModal from '@/components/SettingsModal'
import CheatsModal from '@/components/CheatsModal'

export default function Home() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    boardSize: 3,
    timerEnabled: false,
    timerDuration: 30
  })

  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    scores: {
      X: 0,
      O: 0
    },
    boardSize: 3,
    timeLeft: 30,
    timerEnabled: false
  })
  
  const [showBugReport, setShowBugReport] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showCheats, setShowCheats] = useState(false)

  // Load scores and settings from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem('tic-tac-toe-scores')
    const savedSettings = localStorage.getItem('tic-tac-toe-settings')
    
    if (savedScores) {
      const scores = JSON.parse(savedScores)
      setGameState(prev => ({ ...prev, scores }))
    }
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setGameSettings(settings)
      setGameState(prev => ({ 
        ...prev, 
        boardSize: settings.boardSize,
        timerEnabled: settings.timerEnabled,
        timeLeft: settings.timerDuration,
        board: Array(settings.boardSize * settings.boardSize).fill(null)
      }))
    }
  }, [])

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tic-tac-toe-scores', JSON.stringify(gameState.scores))
  }, [gameState.scores])

  // Timer logic
  useEffect(() => {
    if (!gameState.timerEnabled || gameState.winner || gameState.isDraw) {
      return
    }

    if (gameState.timeLeft <= 0) {
      // Time's up - switch to other player
      handleTimeUp()
      return
    }

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeLeft: prev.timeLeft - 1
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.timeLeft, gameState.timerEnabled, gameState.winner, gameState.isDraw])

  const handleTimeUp = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      timeLeft: gameSettings.timerDuration
    }))
  }

  const generateWinningCombinations = useCallback((size: number): WinningCombination[] => {
    const combinations: WinningCombination[] = []
    
    // Rows
    for (let i = 0; i < size; i++) {
      const row: number[] = []
      for (let j = 0; j < size; j++) {
        row.push(i * size + j)
      }
      combinations.push(row)
    }
    
    // Columns
    for (let i = 0; i < size; i++) {
      const col: number[] = []
      for (let j = 0; j < size; j++) {
        col.push(j * size + i)
      }
      combinations.push(col)
    }
    
    // Diagonal (top-left to bottom-right)
    const diag1: number[] = []
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i)
    }
    combinations.push(diag1)
    
    // Diagonal (top-right to bottom-left)
    const diag2: number[] = []
    for (let i = 0; i < size; i++) {
      diag2.push(i * size + (size - 1 - i))
    }
    combinations.push(diag2)
    
    return combinations
  }, [])

  const checkWinner = useCallback((board: Board, size: number): Player => {
    const combinations = generateWinningCombinations(size)
    
    for (const combination of combinations) {
      // Type guard to ensure first index exists
      const firstIndex = combination[0]
      if (firstIndex === undefined) continue
      
      const firstCell = board[firstIndex]
      if (!firstCell) continue
      
      if (combination.every(index => index !== undefined && board[index] === firstCell)) {
        return firstCell
      }
    }
    return null
  }, [generateWinningCombinations])

  const checkDraw = (board: Board): boolean => {
    return board.every(cell => cell !== null) && !checkWinner(board, gameState.boardSize)
  }

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) {
      return
    }

    // Type guard to ensure currentPlayer is not null
    if (!gameState.currentPlayer) {
      return
    }

    const newBoard = [...gameState.board]
    newBoard[index] = gameState.currentPlayer

    const winner = checkWinner(newBoard, gameState.boardSize)
    const isDraw = checkDraw(newBoard)

    let newScores = { ...gameState.scores }
    if (winner) {
      newScores = {
        ...newScores,
        [winner]: newScores[winner] + 1
      }
    }

    setGameState({
      ...gameState,
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      isDraw,
      scores: newScores,
      timeLeft: gameSettings.timerDuration
    })
  }

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(prev.boardSize * prev.boardSize).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      timeLeft: gameSettings.timerDuration
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

  const handleSaveSettings = (settings: GameSettings) => {
    setGameSettings(settings)
    localStorage.setItem('tic-tac-toe-settings', JSON.stringify(settings))
    
    // Reset game with new settings
    setGameState(prev => ({
      ...prev,
      board: Array(settings.boardSize * settings.boardSize).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      boardSize: settings.boardSize,
      timerEnabled: settings.timerEnabled,
      timeLeft: settings.timerDuration
    }))
  }

  const handleCheatActivated = (cheatType: string) => {
    switch (cheatType) {
      case 'win-x':
        setGameState(prev => ({
          ...prev,
          winner: 'X',
          scores: {
            ...prev.scores,
            X: prev.scores.X + 1
          }
        }))
        break
      case 'win-o':
        setGameState(prev => ({
          ...prev,
          winner: 'O',
          scores: {
            ...prev.scores,
            O: prev.scores.O + 1
          }
        }))
        break
      case 'clear-board':
        setGameState(prev => ({
          ...prev,
          board: Array(prev.boardSize * prev.boardSize).fill(null),
          winner: null,
          isDraw: false,
          currentPlayer: 'X',
          timeLeft: gameSettings.timerDuration
        }))
        break
      case 'add-score-x':
        setGameState(prev => ({
          ...prev,
          scores: {
            ...prev.scores,
            X: prev.scores.X + 10
          }
        }))
        break
      case 'add-score-o':
        setGameState(prev => ({
          ...prev,
          scores: {
            ...prev.scores,
            O: prev.scores.O + 10
          }
        }))
        break
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tic-Tac-Toe</h1>
          <p className="text-gray-600 dark:text-gray-400">Challenge yourself or a friend!</p>
        </div>

        <ScoreBoard scores={gameState.scores} onResetScores={resetScores} />
        
        <GameStatus
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          isDraw={gameState.isDraw}
          timeLeft={gameState.timeLeft}
          timerEnabled={gameState.timerEnabled}
        />

        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={!!gameState.winner || gameState.isDraw}
          boardSize={gameState.boardSize}
        />

        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-lg"
          >
            Reset Game
          </button>
          
          <button
            onClick={() => setShowSettings(true)}
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
          </button>

          <button
            onClick={() => setShowCheats(true)}
            className="flex-1 bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Cheats
          </button>
        </div>

        {/* Bug Report Button */}
        <button
          onClick={() => setShowBugReport(true)}
          className="w-full bg-gray-600 dark:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Report Bug or Issue
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

          {/* Kelvin Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => alert('😂')}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              kelvin is a bitch
            </button>
          </div>
        </div>

      {/* Bug Report Modal */}
      <BugReportModal 
        isOpen={showBugReport} 
        onClose={() => setShowBugReport(false)} 
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentSettings={gameSettings}
        onSave={handleSaveSettings}
      />

      {/* Cheats Modal */}
      <CheatsModal
        isOpen={showCheats}
        onClose={() => setShowCheats(false)}
        onCheatActivated={handleCheatActivated}
      />
    </main>
  )
}