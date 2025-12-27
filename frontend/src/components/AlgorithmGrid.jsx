import { useState, useEffect } from 'react'
import { ArrowUpDown, Search, GitBranch, Zap } from 'lucide-react'
import AlgorithmCard from './AlgorithmCard'

const algorithmsByCategory = {
  Sorting: {
    icon: ArrowUpDown,
    color: 'from-blue-500 to-cyan-500',
    algorithms: [
      { id: 'bubble-sort', name: 'Bubble Sort', complexity: 'O(n²)', desc: 'Simple but slow', type: 'sorting' },
      { id: 'quick-sort', name: 'Quick Sort', complexity: 'O(n log n)', desc: 'Fast & efficient', type: 'sorting' },
      { id: 'merge-sort', name: 'Merge Sort', complexity: 'O(n log n)', desc: 'Stable & fast', type: 'sorting' },
      { id: 'heap-sort', name: 'Heap Sort', complexity: 'O(n log n)', desc: 'Efficient sorting', type: 'sorting' },
      { id: 'selection-sort', name: 'Selection Sort', complexity: 'O(n²)', desc: 'Simple selection', type: 'sorting' },
      { id: 'insertion-sort', name: 'Insertion Sort', complexity: 'O(n²)', desc: 'Online sorting', type: 'sorting' },
    ]
  },
  Searching: {
    icon: Search,
    color: 'from-purple-500 to-pink-500',
    algorithms: [
      { id: 'binary-search', name: 'Binary Search', complexity: 'O(log n)', desc: 'Fast search', type: 'searching' },
      { id: 'linear-search', name: 'Linear Search', complexity: 'O(n)', desc: 'Simple search', type: 'searching' },
    ]
  },
  Graphs: {
    icon: GitBranch,
    color: 'from-green-500 to-emerald-500',
    algorithms: [
      { id: 'bfs', name: 'BFS', complexity: 'O(V+E)', desc: 'Breadth-first', type: 'graph' },
      { id: 'dfs', name: 'DFS', complexity: 'O(V+E)', desc: 'Depth-first', type: 'graph' },
      { id: 'dijkstra', name: "Dijkstra's", complexity: 'O((V+E)log V)', desc: 'Shortest path', type: 'graph' },
      { id: 'kruskal', name: "Kruskal's MST", complexity: 'O(E log E)', desc: 'Min spanning tree', type: 'graph' },
    ]
  },
}

export default function AlgorithmGrid({ onSelectAlgorithm }) {
  return (
    <section id="algorithms" className="py-24 px-6 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="text-primary-500">Algorithms</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Choose from our collection of visual algorithm demonstrations
          </p>
        </div>

        {Object.entries(algorithmsByCategory).map(([category, data]) => {
          const IconComponent = data.icon
          return (
            <div key={category} className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${data.color}`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">{category}</h3>
              </div>

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
            </div>
          )
        })}
      </div>
    </section>
  )
}
