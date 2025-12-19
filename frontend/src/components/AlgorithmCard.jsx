import { motion } from 'framer-motion'
import { Play, Zap } from 'lucide-react'

export default function AlgorithmCard({ algorithm, colorGradient, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="glass rounded-xl p-6 hover:border-primary-400/50 transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-white group-hover:gradient-text transition-all">
            {algorithm.name}
          </h4>
          <p className="text-sm text-gray-400 mt-1">{algorithm.desc}</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`p-2 rounded-lg bg-gradient-to-br ${colorGradient}`}
        >
          <Zap size={18} className="text-white" />
        </motion.div>
      </div>

      {/* Complexity */}
      <div className="flex items-center gap-2 mb-4 pt-4 border-t border-white/10">
        <span className="text-xs font-semibold text-primary-400">Time:</span>
        <code className="text-xs text-gray-300 bg-dark-800 px-2 py-1 rounded">
          {algorithm.complexity}
        </code>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ gap: 8 }}
        className="w-full py-2 px-4 rounded-lg bg-primary-600/20 border border-primary-500/50 hover:bg-primary-600/40 text-primary-300 hover:text-primary-200 font-medium text-sm flex items-center justify-center gap-2 transition-all"
      >
        <Play size={16} />
        Visualize
      </motion.button>
    </motion.div>
  )
}
