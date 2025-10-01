'use client'

import { useState, useEffect } from 'react'
import type { GameSettings } from '@/types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentSettings: GameSettings
  onSave: (settings: GameSettings) => void
}

export default function SettingsModal({ isOpen, onClose, currentSettings, onSave }: SettingsModalProps) {
  const [boardSize, setBoardSize] = useState(currentSettings.boardSize)
  const [timerEnabled, setTimerEnabled] = useState(currentSettings.timerEnabled)
  const [timerDuration, setTimerDuration] = useState(currentSettings.timerDuration)

  useEffect(() => {
    setBoardSize(currentSettings.boardSize)
    setTimerEnabled(currentSettings.timerEnabled)
    setTimerDuration(currentSettings.timerDuration)
  }, [currentSettings])

  if (!isOpen) return null

  const handleSave = () => {
    onSave({ boardSize, timerEnabled, timerDuration })
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Game Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Board Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Board Size
            </label>
            <input
              type="number"
              min="3"
              max="10"
              value={boardSize}
              onChange={(e) => setBoardSize(Math.max(3, Math.min(10, Number(e.target.value))))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose between 3x3 and 10x10 grid
            </p>
          </div>

          {/* Timer Toggle */}
          <div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Move Timer
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`block w-14 h-8 rounded-full transition-colors ${
                    timerEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setTimerEnabled(!timerEnabled)}
                >
                  <div 
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      timerEnabled ? 'transform translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Timer Duration */}
          {timerEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timer Duration (seconds)
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={timerDuration}
                onChange={(e) => setTimerDuration(Math.max(5, Math.min(60, Number(e.target.value))))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Time limit per move (5-60 seconds)
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}