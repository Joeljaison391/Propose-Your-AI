import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, Star } from 'lucide-react';
import { useGameContext } from '@/context/GameContext';

const Message = ({ text, isAI, reaction }: { text: string; isAI: boolean; reaction?: string }) => (
  <motion.div
    className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className={`max-w-[70%] px-4 py-2 rounded-lg ${isAI ? 'bg-neon-purple text-gray-900' : 'bg-neon-green text-gray-900'}`}>
      <p className="font-mono text-sm">{text}</p>
      {isAI && reaction && (
        <span className="inline-block ml-2 text-xl" role="img" aria-label={reaction}>
          {reaction}
        </span>
      )}
    </div>
  </motion.div>
);

const MetricBar = ({ label, value }: { label: string; value: number }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-xs font-mono text-neon-green">{label}</span>
      <span className="text-xs font-mono text-neon-pink">{value}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <motion.div
        className="bg-neon-green h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </div>
);

export default function ChatPage() {
  const {
    gameState,
    initiateChat,
    submitMessage,
    canSubmitMessage,
    getRemainingMessages,
  } = useGameContext();

  const [inputText, setInputText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.messages]);

  useEffect(() => {
    if (!isInitialized) {
      initiateChat({
        userName: 'User',
        aiName: 'AI',
        aiBehavior: 50,
        userGender: 'male',
      });
      setIsInitialized(true);
    }
  }, [initiateChat, isInitialized]);

  const handleSendMessage = async () => {
    if (inputText.trim() && canSubmitMessage()) {
      try {
        await submitMessage(inputText);
        setInputText('');
      } catch (error) {
        console.error('Error submitting message:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-neon-green font-mono p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
          {[...Array(400)].map((_, i) => (
            <div key={i} className="border-r border-b border-neon-green"></div>
          ))}
        </div>
        <motion.div
          className="absolute top-10 left-10 text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          ❤️
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-4xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          💖
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-[1fr_250px] gap-4 relative z-10">
        <div className="bg-gray-800 rounded-lg p-4 border-2 border-neon-purple">
          <div className="h-[calc(100vh-200px)] overflow-y-auto mb-4">
            {gameState.messages.map((message, index) => (
              <Message key={index} text={message.content} isAI={message.sender === 'ai'} reaction={message.reaction || ''} />
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-grow bg-gray-700 text-neon-green p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-neon-purple"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-neon-purple text-gray-900 p-2 rounded-r-lg hover:bg-neon-pink transition-colors duration-300"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border-2 border-neon-purple">
          <h2 className="text-xl mb-4 flex items-center">
            <Zap className="mr-2 text-neon-purple" />
            Metrics
          </h2>
          <MetricBar label="Romance Score" value={gameState.currentScores.romance} />
          <MetricBar label="Humor Level" value={gameState.currentScores.humor} />
          <MetricBar label="Mystery Level" value={gameState.currentScores.mystery} />
          {/* <MetricBar label="Creativity Quotient" value={gameState.currentScores.creativity || 0} /> */}
          <div className="mt-4">
            <p className="text-sm mb-2">Remaining Messages:</p>
            <div className="text-2xl font-bold text-neon-pink animate-pulse">
              {getRemainingMessages()}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {gameState.finalReport && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl mb-4 text-center text-neon-pink">Compatibility Report</h2>
              <p className="text-lg mb-4 text-center">
                {gameState.currentScores.romance > 70 ? "You're almost soulmate material!" : "Friend-zone level achieved."}
              </p>
              <div className="flex justify-center items-center mb-4">
                <Star className="text-neon-green mr-2" />
                <span className="text-3xl font-bold text-neon-green">
                  {Math.floor((gameState.currentScores.romance + gameState.currentScores.humor + gameState.currentScores.mystery) / 3)}%
                </span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-neon-purple text-gray-900 p-2 rounded-lg hover:bg-neon-pink transition-colors duration-300"
              >
                Start Over
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}