import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Computer, Disc, Zap } from 'lucide-react'

const TeamMember = ({ name, college, github, linkedin, status }: { name: string; college: string; github: string; linkedin: string; status: string }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple mb-6 relative overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-neon-green" />
    <div className="absolute top-0 left-0 w-1 h-full bg-neon-green" />
    <div className="absolute bottom-0 right-0 w-full h-1 bg-neon-green" />
    <div className="absolute bottom-0 right-0 w-1 h-full bg-neon-green" />
    
    <h3 className="text-2xl font-bold mb-2 text-neon-pink animate-pulse">{name}</h3>
    <p className="text-neon-green mb-4 font-mono">{college}</p>
    <p className="text-neon-blue mb-4 font-mono">{status}</p>
    
    <div className="flex space-x-4">
      <a href={github} target="_blank" rel="noopener noreferrer" className="group">
        <Github className="text-neon-purple hover:text-neon-pink transition-colors duration-300" />
        <span className="sr-only">GitHub</span>
        <Disc className="hidden group-hover:inline-block absolute -mt-6 ml-2 text-neon-green animate-pulse" />
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="group">
        <Linkedin className="text-neon-purple hover:text-neon-pink transition-colors duration-300" />
        <span className="sr-only">LinkedIn</span>
        <Computer className="hidden group-hover:inline-block absolute -mt-6 ml-2 text-neon-green animate-pulse" />
      </a>
    </div>
    
    <motion.div
      className="w-full h-2 bg-gray-700 mt-4 overflow-hidden"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.div
        className="h-full bg-neon-green"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  </motion.div>
)

export default function AboutPage() {
  const teamMembers = [
    { name: 'Joel Jaison', college: 'Sahrdaya College Of Engineering Kodakara', github: 'https://github.com/Joeljaison391', linkedin: 'https://www.linkedin.com/in/joeljaison391/', status: 'Final Year B.Tech Student' },
    { name: 'Namitha P Shaji', college: 'Sahrdaya College Of Engineering Kodakara', github: 'https://github.com/namithashaji', linkedin: 'https://www.linkedin.com/in/namithapshaji/', status: 'Final Year B.Tech Student' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-neon-green font-mono p-8">
      <h1 className="text-4xl font-bold mb-8 text-center animate-pulse">About Us</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple mb-8">
          <h2 className="text-2xl mb-4 flex items-center">
            <Zap className="mr-2 text-neon-purple" />
            Our Team
          </h2>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </section>

        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple mb-8">
          <h2 className="text-2xl mb-4 flex items-center">
            <Zap className="mr-2 text-neon-purple" />
            Team Name
          </h2>
          <p className="text-neon-green text-xl animate-pulse">Pix</p>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg border-2 border-neon-purple text-center">
          <p className="text-lg leading-relaxed flex items-center justify-center flex-wrap">
            <span className="mr-2 text-2xl" role="img" aria-label="robot">🤖</span>
            Proudly built at the Useless Hackathon hosted by 
            <a href="https://thethinkerhub.com/" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:text-neon-pink transition-colors duration-300 mx-2">
              ThinkerHub
            </a>
            , Nov 2-3
            <span className="ml-2 text-2xl" role="img" aria-label="party popper">🎉</span>
          </p>
        </section>
      </div>
    </div>
  )
}