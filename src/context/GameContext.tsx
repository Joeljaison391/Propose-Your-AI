import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of game data
interface GameData {
  userPersonality: number;
  aiBehavior: number;
  userGender: string;
  userName: string;
  aiName: string;
  aiModel: string;
}

// Define the context type
interface GameContextType {
  gameData: GameData;
  updateGameData: (key: keyof GameData, value: string | number) => void;
  isConfigurationComplete: () => boolean;
}

// Create context with default undefined value for type checking
const GameContext = createContext<GameContextType | undefined>(undefined);

// Custom hook to use the context with error handling
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

// Define props for GameProvider
interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [gameData, setGameData] = useState<GameData>({
    userPersonality: 50,
    aiBehavior: 50,
    userGender: '',
    userName: '',
    aiName: '',
    aiModel: '',
  });

  const updateGameData = (key: keyof GameData, value: string | number) => {
    setGameData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const isConfigurationComplete = (): boolean => {
    const { userPersonality, aiBehavior, userGender, userName, aiName, aiModel } = gameData;
    return (
      userPersonality > 0 &&
      aiBehavior > 0 &&
      userGender !== '' &&
      userName !== '' &&
      aiName !== '' &&
      aiModel !== ''
    );
  };

  return (
    <GameContext.Provider value={{ gameData, updateGameData, isConfigurationComplete }}>
      {children}
    </GameContext.Provider>
  );
};
