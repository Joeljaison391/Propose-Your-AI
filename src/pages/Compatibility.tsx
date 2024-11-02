'use client'

import React, { useEffect, useState } from 'react'
import { useGameContext } from '@/context/GameContext'
import {  Lightbulb, Sparkles } from 'lucide-react'

const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-neon-green">{label}</span>
      <span className={`text-${color}`}>{score}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className={`bg-${color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  </div>
)

function Compatibility() {
  const { gameState, gameData, resetGame } = useGameContext()
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    if (gameState.finalReport) {
      const timer = setInterval(() => {
        setAnimatedScore((prev) => {
          if (gameState.finalReport && prev < gameState.finalReport.matchPercentage) {
            return prev + 1
          }
          clearInterval(timer)
          return prev
        })
      }, 20)
      return () => clearInterval(timer)
    }
  }, [gameState.finalReport])

  if (!gameState.finalReport) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-pixel">
        <p className="text-2xl text-neon-green animate-pulse">Loading compatibility results...</p>
      </div>
    )
  }

  const { finalScore, relationship, highlights, improvements, matchPercentage } = gameState.finalReport

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-pixel overflow-x-hidden">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl text-center text-neon-green mb-8 animate-pulse">
          Your Compatibility Score
        </h1>

        <div className="text-center mb-12">
          <div className="text-5xl sm:text-6xl text-neon-pink mb-4 relative">
            {animatedScore}%
            <span className="absolute top-0 right-0 animate-blink">_</span>
          </div>
          <p className="text-neon-green text-lg sm:text-xl">
            {relationship}: You and {gameData.aiName} are {matchPercentage}% compatible!
          </p>
        </div>

        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-8">
          <h2 className="text-xl sm:text-2xl text-neon-purple mb-4">Detailed Breakdown</h2>
          <ScoreBar label="Romance Score" score={finalScore.romance} color="neon-pink" />
          <ScoreBar label="Humor Level" score={finalScore.humor} color="neon-green" />
          <ScoreBar label="Mystery Factor" score={finalScore.mystery} color="neon-purple" />
          <ScoreBar label="Overall Compatibility" score={finalScore.overall} color="neon-blue" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl text-neon-green mb-4 flex items-center">
              <Sparkles className="mr-2" /> Highlights
            </h2>
            <ul className="list-disc list-inside text-neon-pink">
              {highlights.map((highlight: string, index: number) => (
                <li key={index} className="mb-2">{highlight}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl text-neon-purple mb-4 flex items-center">
              <Lightbulb className="mr-2" /> Areas for Improvement
            </h2>
            <ul className="list-disc list-inside text-neon-blue">
              {improvements.map((improvement: string, index: number) => (
                <li key={index} className="mb-2">{improvement}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-neon-purple text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl hover:bg-neon-pink transition-colors duration-300 animate-bounce"
          >
            Try Again!
          </button>
        </div>
      </div>
    </div>
  )
}

export default Compatibility