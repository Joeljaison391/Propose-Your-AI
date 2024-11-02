import './App.css'

import {Routes , Route} from 'react-router-dom'
import RetroNavbar from './Components/RetroNavbar'
import HomeScreen from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import AboutPage from './pages/AboutPage'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <>
    <RetroNavbar/>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/how-it-works" element={<HowItWorks/>} />
        <Route path="/chat" element={<ChatPage/>} />
      </Routes>
    </>
  )
}

export default App
