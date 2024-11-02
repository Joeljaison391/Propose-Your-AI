import React from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Heart, Zap, AlertTriangle, Smile, Star } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { title: "Configure Your Chat Style", description: "Choose your personality settings, like Friendly, Mysterious, or Humorous. This influences how you approach the AI." },
    { title: "Adjust AI's Mood", description: "Set the AI's behavior to Playful, Skeptical, or Sassy—the AI's responses change based on its mood, so pick wisely!" },
    { title: "Start Proposing", description: 'Hit the "Propose Me" button to start chatting! Impress the AI with your lines, jokes, and creativity.' },
  ]

  const winningConditions = [
    { icon: Heart, text: "Charm the AI: Keep the conversation interesting and score high on the Romance Quotient." },
    { icon: AlertTriangle, text: "Avoid Overusing Tokens: Stay within the chat token limit per round." },
    { icon: Smile, text: "Stay Polite and Clever: No abusive language; keep it fun and respectful." },
  ]

  const tips = [
    "Be original! The AI loves creative lines.",
    "Add a bit of mystery—don't reveal everything at once!",
    "Use humor—corny jokes sometimes score big!",
  ]

  const scoreCategories = [
    { title: "Romance Score", description: "How romantic the conversation feels." },
    { title: "Humor Level", description: "How funny and original your jokes are." },
    { title: "Mystery Factor", description: "The intrigue level; sharing too much too soon might lower it!" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-neon-green font-mono p-8">
      <h1 className="text-4xl font-bold mb-8 text-center animate-pulse">How It Works</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple">
          <h2 className="text-2xl mb-4 flex items-center">
            <Zap className="mr-2 text-neon-purple" />
            Introduction
          </h2>
          <p className="text-lg leading-relaxed">
            Welcome to AI Matchmaker: Propose Your AI! Here, you'll try to charm the AI with creative conversation, jokes, and witty lines. The AI scores you on romance, humor, and mystery as you chat.
          </p>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple">
          <h2 className="text-2xl mb-4 flex items-center">
            <CheckSquare className="mr-2 text-neon-purple" />
            Step-by-Step Guide
          </h2>
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="mr-4 mt-1 w-6 h-6 border-2 border-neon-green flex items-center justify-center text-xs">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple">
          <h2 className="text-2xl mb-4 flex items-center">
            <Star className="mr-2 text-neon-purple" />
            Winning Conditions
          </h2>
          <ul className="space-y-4">
            {winningConditions.map((condition, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <condition.icon className="mr-4 text-neon-pink" />
                <span>{condition.text}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple">
          <h2 className="text-2xl mb-4 flex items-center">
            <Zap className="mr-2 text-neon-purple" />
            Tips for Higher Scores
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {tip}
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple">
          <h2 className="text-2xl mb-4 flex items-center">
            <Heart className="mr-2 text-neon-purple" />
            Score Explanation
          </h2>
          <div className="space-y-4">
            {scoreCategories.map((category, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden mr-4">
                  <motion.div
                    className="h-full bg-neon-green"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                <div>
                  <h3 className="font-bold">{category.title}</h3>
                  <p className="text-sm">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}