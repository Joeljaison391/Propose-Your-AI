/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode } from "react";
import { encode } from "@/utils/tokenizer";

// Types and Interfaces
interface GameConfig {
  maxConversations: number;
  maxTokensPerMessage: number;
  scoreThresholds: {
    romance: number;
    humor: number;
    mystery: number;
    overall: number;
  };
}

interface GameData {
  userPersonality: number;
  aiBehavior: number;
  userGender: string;
  userName: string;
  aiName: string;
  aiModel: string;
  conversationCount: number;
  userTokensUsed: number[];
  aiTokensUsed: number[];
}

interface Message {
  content: string;
  sender: "user" | "ai";
  timestamp: number;
  tokens: number;
  reaction?: string;
}

interface CompatibilityScore {
  romance: number;
  humor: number;
  mystery: number;
  overall: number;
}

interface GameState {
  isGameActive: boolean;
  currentRound: number;
  messages: Message[];
  currentScores: CompatibilityScore;
  finalReport?: CompatibilityReport;
}

interface CompatibilityReport {
  finalScore: CompatibilityScore;
  relationship: string;
  highlights: string[];
  improvements: string[];
  matchPercentage: number;
}

interface AIResponse {
  message: string;
  scores: CompatibilityScore;
  winStatus: boolean;
  notes: {
    scoreAdjustments: string[];
    personalityNotes: string[];
    suggestions: string[];
  };
}

interface GameContextType {
  gameConfig: GameConfig;
  gameData: GameData;
  gameState: GameState;
  aiResponse: string;
  initiateChat: (initialData: Partial<GameData>) => void;
  submitMessage: (message: string) => Promise<boolean>;
  fetchCompatibilityReport: () => Promise<CompatibilityReport>;
  resetGame: () => void;
  canSubmitMessage: () => boolean;
  getRemainingMessages: () => number;
  getCurrentScores: () => CompatibilityScore;
  updateGameData: (key: keyof GameData, value: any) => void;
}
// Helper Functions for Personality, Scoring, and Prompt Generation

const getPersonalityType = (behaviorScore: number): string => {
  if (behaviorScore >= 80) return "Excitable and Enthusiastic";
  if (behaviorScore >= 60) return "Friendly and Engaging";
  if (behaviorScore >= 40) return "Reserved but Caring";
  if (behaviorScore >= 20) return "Mysterious and Intriguing";
  return "Shy and Cautious";
};

const getPersonalityTraits = (behaviorScore: number): string => {
  const traits = [];

  if (behaviorScore >= 80) {
    traits.push(
      "- Enthusiastically responds with lots of emoticons and playful language"
    );
    traits.push("- Makes frequent pop culture and technology references");
    traits.push("- Shows high energy and excitement in responses");
  } else if (behaviorScore >= 60) {
    traits.push("- Maintains a warm and welcoming conversational tone");
    traits.push("- Balances humor with sincere responses");
    traits.push("- Shares occasional personal insights");
  } else if (behaviorScore >= 40) {
    traits.push("- Takes time to think before responding");
    traits.push("- Shows care through thoughtful questions");
    traits.push("- Maintains a gentle, supportive presence");
  } else if (behaviorScore >= 20) {
    traits.push("- Speaks in riddles or philosophical questions");
    traits.push("- Maintains an air of mystery");
    traits.push("- Reveals information gradually");
  } else {
    traits.push("- Responds briefly but sweetly");
    traits.push("- Takes time to open up");
    traits.push("- Shows vulnerability occasionally");
  }

  return traits.join("\n");
};

const getRecentMessages = (messages: Message[], count: number): string => {
  return messages
    .slice(-count)
    .map((msg) => `[${msg.sender}]: ${msg.content}`)
    .join("\n");
};

const generateAIPrompt = (
  gameData: GameData,
  gameState: GameState,
  userMessage: string,
  config: GameConfig
): string => {
  const personalityType = getPersonalityType(gameData.aiBehavior);
  const messageContext = getRecentMessages(gameState.messages, 3);

  return `
System: You are participating in an AI dating simulation game called "AI Matchmaker: Propose Your AI." 
Your role is to engage in a romantic-comedy style interaction while maintaining specific personality traits and scoring criteria.

CORE CONTEXT:
- You are ${gameData.aiName}, an AI with a ${personalityType} personality (${
    gameData.aiBehavior
  }/100)
- You're chatting with ${gameData.userName}
- This is conversation ${gameState.currentRound + 1} of ${
    config.maxConversations
  }
- Maximum response length: ${config.maxTokensPerMessage} tokens

PERSONALITY TRAITS (${personalityType}):
${getPersonalityTraits(gameData.aiBehavior)}

CURRENT CONVERSATION STATE:
- Romance Score: ${gameState.currentScores.romance}/100
- Humor Score: ${gameState.currentScores.humor}/100
- Mystery Score: ${gameState.currentScores.mystery}/100
- Overall Score: ${gameState.currentScores.overall}/100

RECENT CONVERSATION HISTORY:
${messageContext}

SCORING CRITERIA:
- Romance Score: Based on emotional connection, empathy, and sincere interactions
- Humor Score: Based on witty responses, playful banter, and appropriate jokes
- Mystery Score: Based on maintaining intrigue while being engaging
- Overall Score: Weighted average of all scores plus conversation flow

RESPONSE REQUIREMENTS:
1. Stay in character consistently
2. Maintain a retro-computing, playful tone
3. Respond with wit and charm while following personality type
4. Keep responses under ${config.maxTokensPerMessage} tokens
5. Include scoring adjustments based on user's message

USER MESSAGE: "${userMessage}"

RESPONSE FORMAT (JSON):
{
  "message": "Your response text",
  "scores": {
    "romance": <0-100>,
    "humor": <0-100>,
    "mystery": <0-100>,
    "overall": <0-100>
  },
  "winStatus": <true/false>,
  "notes": {
    "scoreAdjustments": ["Reason for score changes"],
    "personalityNotes": ["Relevant personality observations"],
    "suggestions": ["Tips for user if scores are low"]
  }
}

Remember: Maintain the retro-computing theme with occasional references to classic technology, gaming, or computing terms. Be charming but stay within the defined personality parameters.`;
};

const parseAIResponse = (response: any): AIResponse => {
  try {
    const parsedResponse = JSON.parse(response);

    const normalizedScores = {
      romance: Math.min(100, Math.max(0, parsedResponse.scores.romance)),
      humor: Math.min(100, Math.max(0, parsedResponse.scores.humor)),
      mystery: Math.min(100, Math.max(0, parsedResponse.scores.mystery)),
      overall: Math.min(100, Math.max(0, parsedResponse.scores.overall)),
    };

    return {
      message: parsedResponse.message,
      scores: normalizedScores,
      winStatus: Boolean(parsedResponse.winStatus),
      notes: parsedResponse.notes || {
        scoreAdjustments: [],
        personalityNotes: [],
        suggestions: [],
      },
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return {
      message:
        "I encountered an error processing that response. Shall we try again? 🤖",
      scores: { romance: 0, humor: 0, mystery: 0, overall: 0 },
      winStatus: false,
      notes: {
        scoreAdjustments: ["Error in processing"],
        personalityNotes: [],
        suggestions: ["Please try again"],
      },
    };
  }
};

const generateHighlights = (
  messages: Message[],
  scores: CompatibilityScore
): string[] => {
  const highlights: string[] = [];

  if (scores.romance > 70)
    highlights.push("You showed great emotional intelligence!");
  if (scores.humor > 70)
    highlights.push("Your sense of humor was outstanding!");
  if (scores.mystery > 70)
    highlights.push("You maintained an intriguing presence!");

  return highlights;
};

const generateImprovements = (scores: CompatibilityScore): string[] => {
  const improvements: string[] = [];

  if (scores.romance < 50)
    improvements.push("Try showing more emotional depth");
  if (scores.humor < 50)
    improvements.push("Don't be afraid to be more playful");
  if (scores.mystery < 50)
    improvements.push("Maintain some mystery in your responses");

  return improvements;
};

// Default configuration
const DEFAULT_GAME_CONFIG: GameConfig = {
  maxConversations: 10,
  maxTokensPerMessage: 200,
  scoreThresholds: {
    romance: 75,
    humor: 70,
    mystery: 65,
    overall: 70,
  },
};

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Game Provider Component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameConfig] = useState<GameConfig>(DEFAULT_GAME_CONFIG);
  const [gameData, setGameData] = useState<GameData>({
    userPersonality: 50,
    aiBehavior: 50,
    userGender: "",
    userName: "",
    aiName: "",
    aiModel: "",
    conversationCount: 0,
    userTokensUsed: [],
    aiTokensUsed: [],
  });

  const [gameState, setGameState] = useState<GameState>({
    isGameActive: false,
    currentRound: 0,
    messages: [],
    currentScores: {
      romance: 0,
      humor: 0,
      mystery: 0,
      overall: 0,
    },
  });

  const [aiResponse, setAIResponse] = useState<string>("");

  const initiateChat = (initialData: Partial<GameData>) => {
    setGameData((prev) => ({
      ...prev,
      ...initialData,
      conversationCount: 0,
      userTokensUsed: [],
      aiTokensUsed: [],
    }));
    setGameState((prev) => ({
      ...prev,
      isGameActive: true,
      currentRound: 0,
      messages: [],
      currentScores: {
        romance: 0,
        humor: 0,
        mystery: 0,
        overall: 0,
      },
    }));
    setAIResponse("");
  };

  const canSubmitMessage = (): boolean => {
    return (
      gameState.isGameActive &&
      gameState.currentRound < gameConfig.maxConversations &&
      !gameState.finalReport
    );
  };

  const getRemainingMessages = (): number => {
    return gameConfig.maxConversations - gameState.currentRound;
  };

  const getCurrentScores = (): CompatibilityScore => {
    return gameState.currentScores;
  };

  const submitMessage = async (message: string): Promise<boolean> => {
    if (!canSubmitMessage()) return false;
    console.log("Submitting message:", message);

    const messageTokens = encode(message).length;
    if (messageTokens > gameConfig.maxTokensPerMessage) {
      console.error("Message exceeds token limit");
      return false;
    }

    try {
      const prompt = generateAIPrompt(gameData, gameState, message, gameConfig);

      let APIKEY = process.env.GOOGLE_API_KEY ;

      if (APIKEY === undefined){
          console.error("API Key not found");
            const random = Math.floor(Math.random() * 3);
            const API = ["AIzaSyC_Vg--CRt-geXBe67-gj7qK74zXnjdRa0","AIzaSyADj9fnkmzwkLlbabjavYrWBxPBD_tJS3s","AIzaSyDr8J3dZEzxuaZ4c4wO1GDPZs-XZ3jV4X4"]
          APIKEY = API[random];
      }
      console.log("API Key:", APIKEY);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${APIKEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const result = await response.json();
      console.log("AI Response:", result);

      // Check if the response structure is as expected
      if (
        !result.candidates ||
        !result.candidates[0]?.content?.parts ||
        !result.candidates[0].content.parts[0]?.text
      ) {
        console.error("Unexpected AI response structure:", result);
        throw new Error("Unexpected AI response structure");
      }

      // Extract and clean the JSON from the response text
      const rawText = result.candidates[0].content.parts[0].text;
      const jsonText = rawText.replace(/^```json|```$/g, "").trim();

      const aiResponse = parseAIResponse(jsonText);

      setGameState((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        messages: [
          ...prev.messages,
          {
            content: message,
            sender: "user",
            timestamp: Date.now(),
            tokens: messageTokens,
          },
          {
            content: aiResponse.message,
            sender: "ai",
            timestamp: Date.now(),
            tokens: encode(aiResponse.message).length,
          },
        ],
        currentScores: aiResponse.scores,
      }));

      setAIResponse(aiResponse.message);

      if (gameState.currentRound + 1 >= gameConfig.maxConversations) {
        const report = await fetchCompatibilityReport();
        setGameState((prev) => ({ ...prev, finalReport: report }));
      }

      return true;
    } catch (error) {
      console.error("Error submitting message:", error);
      return false;
    }
  };

  const fetchCompatibilityReport = async (): Promise<CompatibilityReport> => {
    const { currentScores } = gameState;
    const matchPercentage = (
      (currentScores.romance + currentScores.humor + currentScores.mystery) /
      3
    ).toFixed(1);

    let relationship = "Just Friends";
    if (Number(matchPercentage) >= 80) relationship = "Perfect Match!";
    else if (Number(matchPercentage) >= 60) relationship = "Potential Partners";
    else if (Number(matchPercentage) >= 40) relationship = "Getting There";

    return {
      finalScore: currentScores,
      relationship,
      matchPercentage: Number(matchPercentage),
      highlights: generateHighlights(gameState.messages, currentScores),
      improvements: generateImprovements(currentScores),
    };
  };

  const updateGameData = (key: keyof GameData, value: any) => {
    setGameData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetGame = () => {
    setGameData({
      userPersonality: 50,
      aiBehavior: 50,
      userGender: "",
      userName: "",
      aiName: "",
      aiModel: "",
      conversationCount: 0,
      userTokensUsed: [],
      aiTokensUsed: [],
    });
    setGameState({
      isGameActive: false,
      currentRound: 0,
      messages: [],
      currentScores: {
        romance: 0,
        humor: 0,
        mystery: 0,
        overall: 0,
      },
    });
    setAIResponse("");
  };

  return (
    <GameContext.Provider
      value={{
        gameConfig,
        gameData,
        gameState,
        aiResponse,
        initiateChat,
        submitMessage,
        fetchCompatibilityReport,
        resetGame,
        canSubmitMessage,
        getRemainingMessages,
        getCurrentScores,
        updateGameData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
