import { motion } from 'framer-motion'
import { ArrowLeft, Play, Pause, RotateCcw, Shuffle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AlgorithmVisualizer({ algorithm, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [arraySize, setArraySize] = useState(20)
  const [array, setArray] = useState([])

  useEffect(() => {
    generateArray()
  }, [arraySize])

  const generateArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    )
    setArray(newArray)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {algorithm.name}
          </h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div>
              <p className="text-gray-400 text-sm">Time Complexity</p>
              <code className="text-primary-400 font-semibold">{algorithm.complexity}</code>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Description</p>
              <p className="text-gray-100 font-semibold">{algorithm.desc}</p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Playback Controls */}
            <div>
              <p className="text-sm text-gray-400 mb-4 font-medium">Playback</p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors text-white"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generateArray()}
                  className="p-3 rounded-lg bg-accent-600 hover:bg-accent-500 transition-colors text-white"
                >
                  <RotateCcw size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generateArray()}
                  className="p-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors text-white"
                >
                  <Shuffle size={20} />
                </motion.button>
              </div>
            </div>

            {/* Speed Control */}
            <div>
              <p className="text-sm text-gray-400 mb-4 font-medium">Speed</p>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <p className="text-xs text-gray-500 mt-2">{speed}%</p>
            </div>

            {/* Array Size Control */}
            <div>
              <p className="text-sm text-gray-400 mb-4 font-medium">Array Size</p>
              <input
                type="range"
                min="5"
                max="50"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
              />
              <p className="text-xs text-gray-500 mt-2">{arraySize} elements</p>
            </div>
          </div>
        </motion.div>

        {/* Visualization Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-8 min-h-96 flex items-end justify-center gap-2"
        >
          <div className="flex items-end gap-2 h-80 justify-center flex-1">
            {array.map((value, idx) => (
              <motion.div
                key={idx}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400 hover:from-primary-400 hover:to-primary-300 transition-all"
                style={{
                  height: `${(value / 100) * 320}px`,
                  minWidth: '2px',
                }}
                animate={{ scale: isPlaying ? 1 : 1 }}
                transition={{ type: 'spring' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { label: 'Comparisons', value: '0' },
            { label: 'Swaps', value: '0' },
            { label: 'Time', value: '0ms' },
            { label: 'Steps', value: '0' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">{item.label}</p>
              <p className="text-2xl font-bold gradient-text">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
