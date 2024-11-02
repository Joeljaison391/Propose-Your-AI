import './App.css'

import {Routes , Route} from 'react-router-dom'
import RetroNavbar from './Components/RetroNavbar'
import HomeScreen from './pages/Home'

function App() {
  return (
    <>
    <RetroNavbar/>
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </>
  )
}

export default App
