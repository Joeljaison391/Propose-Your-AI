import React from 'react'
import { Slider } from "@/Components/ui/slider"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { AlertCircle, Zap, MessageSquare, Smile, Bot, AlertTriangle } from 'lucide-react'
import { useGameContext } from '@/context/GameContext' 
import { useNavigate } from 'react-router-dom'

export default function HomeScreen() {
    const navigate = useNavigate()
  const { gameData, updateGameData, isConfigurationComplete } = useGameContext()

  const handlePersonalityChange = (value: number[]) => {
    updateGameData('userPersonality', value[0])
  }

  const handleBehaviorChange = (value: number[]) => {
    updateGameData('aiBehavior', value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateGameData(name as keyof typeof gameData, value)
  }

  const handleSelectChange = (value: string, name: string) => {
    updateGameData(name as keyof typeof gameData, value)
  }

  const handleSubmit = () => {
    if (isConfigurationComplete()) {
      console.log('Game data submitted:', gameData)
      navigate('/chat')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-neon-green font-mono p-8">
      <h1 className="text-4xl font-bold mb-8 text-center animate-pulse"> Propose Your AI</h1>
      <p className='text-lg text-center text-neon-blue font-mono pb-4'>
        Find out how well you can impress your AI with your conversational skills! Fill out the form below to get started.
      </p>
      
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg border-2 border-neon-purple mb-8">
        <h2 className="text-2xl mb-4 flex items-center">
          <Bot className="mr-2" />
          Player Setup
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Your Gender</label>
            <Select onValueChange={(value) => handleSelectChange(value, 'userGender')}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-2">Your Name</label>
            <Input
              name="userName"
              value={gameData.userName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="bg-gray-700 text-neon-green border-neon-purple"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">AI Name</label>
            <Input
              name="aiName"
              value={gameData.aiName}
              onChange={handleInputChange}
              placeholder="Name your AI"
              className="bg-gray-700 text-neon-green border-neon-purple"
            />
          </div>
          <div>
            <label className="block mb-2">AI Model</label>
            <Select onValueChange={(value) => handleSelectChange(value, 'aiModel')}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt3">GPT-3</SelectItem>
                <SelectItem value="gpt4">GPT-4</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="palm">PaLM</SelectItem>
                <SelectItem value="llama">LLaMA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg border-2 border-neon-purple">
        <h2 className="text-2xl mb-4 flex items-center">
          <Zap className="mr-2" />
          Configuration
        </h2>
        
        <div className="mb-6">
          <label className="block mb-2">User Personality</label>
          <Slider
            defaultValue={[gameData.userPersonality]}
            max={100}
            step={1}
            onValueChange={handlePersonalityChange}
          />
          <div className="flex justify-between text-xs mt-1">
            <span>Friendly</span>
            <span>Mysterious</span>
            <span>Humorous</span>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">AI Behavior</label>
          <Slider
            defaultValue={[gameData.aiBehavior]}
            max={100}
            step={1}
            onValueChange={handleBehaviorChange}
          />
          <div className="flex justify-between text-xs mt-1">
            <span>Playful</span>
            <span>Sassy</span>
            <span>Skeptical</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto mt-8 bg-gray-800 p-6 rounded-lg border-2 border-neon-purple">
        <h2 className="text-2xl mb-4 flex items-center">
          <MessageSquare className="mr-2" />
          Game Instructions
        </h2>
        <p className="mb-4">Win the game by impressing the AI! Follow these rules:</p>
        <ul className="list-none space-y-2">
          <li className="flex items-center">
            <AlertCircle className="mr-2 text-neon-pink" />
            Avoid using abusive language
          </li>
          <li className="flex items-center">
            <AlertTriangle className="mr-2 text-neon-blue" />
            Stay within token limit per chat
          </li>
          <li className="flex items-center">
            <Zap className="mr-2 text-neon-green" />
            Keep it creative!
          </li>
        </ul>
      </div>
      
      <div className="text-center mt-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`text-xl py-3 px-6 rounded-full ${
                  isConfigurationComplete()
                    ? 'bg-neon-purple text-gray-900 animate-pulse hover:animate-none hover:bg-neon-pink'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isConfigurationComplete()}
                onClick={handleSubmit}
              >
                Propose Me!
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isConfigurationComplete() ? "Let's start the game!" : "Complete all fields to start!"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="fixed bottom-4 right-4 animate-bounce">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Need help? Click for tips!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
