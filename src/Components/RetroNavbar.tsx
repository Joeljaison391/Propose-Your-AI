import React, { useState } from 'react'
import { Monitor, Zap, MessageSquare, BarChart2, Info, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '@/assets/Logo.png'

export default function RetroNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { name: 'Home', path: '/', icon: Monitor },
    { name: 'How It Works', path: '/how-it-works', icon: Zap },
    { name: 'Start Chatting', path: '/chat', icon: MessageSquare },
    { name: 'Compatibility Score', path: '/score', icon: BarChart2 },
    { name: 'About', path: '/about', icon: Info },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-gray-900 text-neon-green p-4 font-mono">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 animate-blink" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="2" className="stroke-neon-purple stroke-2" />
            <circle cx="12" cy="12" r="6" className="fill-neon-pink" />
            <path d="M8 8L16 16M16 8L8 16" className="stroke-neon-blue stroke-2" />
          </svg>
          <img className='h-16 w-26 px-2' src={Logo} alt="" />
        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-neon-green hover:text-neon-pink focus:outline-none focus:text-neon-pink"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'bg-neon-green text-gray-900 animate-pulse-slow'
                    : 'hover:bg-neon-green hover:text-gray-900 hover:animate-glow'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'bg-neon-green text-gray-900 animate-pulse-slow'
                      : 'hover:bg-neon-green hover:text-gray-900 hover:animate-glow'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}