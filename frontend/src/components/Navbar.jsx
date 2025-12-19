import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AlgoVis</h1>
              <p className="text-xs text-gray-400">Algorithm Visualizer</p>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm font-medium">
              Home
            </a>
            <a href="#algorithms" className="text-gray-300 hover:text-primary-400 transition-colors text-sm font-medium">
              Algorithms
            </a>
            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm font-medium">
              About
            </a>
          </motion.div>

          {/* GitHub Button */}
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            href="#"
            className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors"
          >
            GitHub
          </motion.a>
        </div>
      </div>
    </nav>
  )
}
