import { motion } from 'framer-motion'
import { 
  ArrowUpDown, 
  Search, 
  GitBranch, 
  Zap 
} from 'lucide-react'
import AlgorithmCard from './AlgorithmCard'

const algorithmsByCategory = {
  Sorting: {
    icon: ArrowUpDown,
    color: 'from-blue-500 to-cyan-500',
    algorithms: [
      { name: 'Bubble Sort', complexity: 'O(n²)', desc: 'Simple but slow' },
      { name: 'Quick Sort', complexity: 'O(n log n)', desc: 'Fast & efficient' },
      { name: 'Merge Sort', complexity: 'O(n log n)', desc: 'Stable sort' },
      { name: 'Heap Sort', complexity: 'O(n log n)', desc: 'In-place sort' },
    ]
  },
  Searching: {
    icon: Search,
    color: 'from-purple-500 to-pink-500',
    algorithms: [
      { name: 'Binary Search', complexity: 'O(log n)', desc: 'Fast search' },
      { name: 'Linear Search', complexity: 'O(n)', desc: 'Simple search' },
      { name: 'Jump Search', complexity: 'O(√n)', desc: 'Balanced' },
    ]
  },
  Graphs: {
    icon: GitBranch,
    color: 'from-green-500 to-emerald-500',
    algorithms: [
      { name: 'BFS', complexity: 'O(V+E)', desc: 'Breadth-first' },
      { name: 'DFS', complexity: 'O(V+E)', desc: 'Depth-first' },
      { name: 'Dijkstra', complexity: 'O(E log V)', desc: 'Shortest path' },
    ]
  },
  Dynamic: {
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    algorithms: [
      { name: 'Fibonacci', complexity: 'O(n)', desc: 'Classic DP' },
      { name: 'Knapsack', complexity: 'O(nW)', desc: 'Optimization' },
      { name: 'LCS', complexity: 'O(m×n)', desc: 'Subsequence' },
    ]
  },
}

export default function AlgorithmGrid({ onSelectAlgorithm }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="algorithms" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="gradient-text">Algorithms</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Choose from our collection of visual algorithm demonstrations
          </p>
        </motion.div>

        {/* Categories */}
        {Object.entries(algorithmsByCategory).map(([category, data]) => {
          const IconComponent = data.icon
          return (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-20"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${data.color}`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">{category}</h3>
              </div>

              {/* Algorithm Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.algorithms.map((algo, idx) => (
                  <AlgorithmCard
                    key={idx}
                    algorithm={algo}
                    category={category}
                    colorGradient={data.color}
                    onSelect={() => onSelectAlgorithm(algo)}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
