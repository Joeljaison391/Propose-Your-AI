import './App.css'

import {Routes , Route} from 'react-router-dom'
import RetroNavbar from './Components/RetroNavbar'
import HomeScreen from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <>
    <RetroNavbar/>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/how-it-works" element={<HowItWorks/>} />
      </Routes>
    </>
  )
}

export default App
