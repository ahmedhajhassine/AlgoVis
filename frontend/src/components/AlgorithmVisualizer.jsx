import { useState, useEffect } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw, Shuffle } from 'lucide-react'
import { bubbleSort, mergeSort, quickSort, heapSort, selectionSort, insertionSort } from '../algorithms/sorting'
import { linearSearch, binarySearch } from '../algorithms/searching'
import { bfs, dfs, dijkstra, kruskal } from '../algorithms/graphs'
import GraphVisualizer from './GraphVisualizer'
import ElementVisualizer from './ElementVisualizer'

export default function AlgorithmVisualizer({ algorithm, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [arraySize, setArraySize] = useState(30)
  const [array, setArray] = useState([])
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0, steps: 0 })
  const [highlightedIndices, setHighlightedIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const [searchTarget, setSearchTarget] = useState('')
  const [searchValue, setSearchValue] = useState(null)
  const [foundIndex, setFoundIndex] = useState(-1)
  const [checkedIndices, setCheckedIndices] = useState([])

  useEffect(() => {
    generateArray()
  }, [arraySize, algorithm])

  const generateArray = () => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    )
    setArray(newArray)
    setCurrentStep(0)
    setStats({ comparisons: 0, swaps: 0, time: 0, steps: 0 })
    setIsPlaying(false)
    // Clear all colors when generating new array
    setHighlightedIndices([])
    setCheckedIndices([])
    setSortedIndices([])
    setFoundIndex(-1)
    
    // For search algorithms, don't auto-execute until user picks a target
    if (['linear-search', 'binary-search'].includes(algorithm.id)) {
      setSteps([{ array: newArray, comparing: [] }])
      setSearchValue(null)
      setFoundIndex(-1)
    } else {
      executeAlgorithm(newArray, null)
    }
  }

  const executeAlgorithm = (arr, target = null) => {
    const startTime = performance.now()
    let algorithmSteps = []

    try {
      switch (algorithm.id) {
        case 'bubble-sort':
          algorithmSteps = bubbleSort(arr)
          break
        case 'quick-sort':
          algorithmSteps = quickSort(arr)
          break
        case 'merge-sort':
          algorithmSteps = mergeSort(arr)
          break
        case 'heap-sort':
          algorithmSteps = heapSort(arr)
          break
        case 'selection-sort':
          algorithmSteps = selectionSort(arr)
          break
        case 'insertion-sort':
          algorithmSteps = insertionSort(arr)
          break
        case 'linear-search': {
          const searchTarget = target !== null ? target : arr[Math.floor(Math.random() * arr.length)]
          setSearchValue(searchTarget)
          algorithmSteps = linearSearch(arr, searchTarget)
          break
        }
        case 'binary-search': {
          const searchTarget = target !== null ? target : arr[Math.floor(Math.random() * arr.length)]
          setSearchValue(searchTarget)
          algorithmSteps = binarySearch(arr, searchTarget)
          break
        }
        case 'bfs': {
          const adjList = generateRandomGraph(8)
          algorithmSteps = bfs(adjList, 0)
          break
        }
        case 'dfs': {
          const adjList = generateRandomGraph(8)
          algorithmSteps = dfs(adjList, 0)
          break
        }
        case 'dijkstra': {
          const adjList = generateWeightedGraph(8)
          algorithmSteps = dijkstra(adjList, 0, 8)
          break
        }
        case 'kruskal': {
          const edges = generateEdges(8)
          algorithmSteps = kruskal(edges, 8)
          break
        }
        default:
          algorithmSteps = bubbleSort(arr)
      }
    } catch (e) {
      console.error('Algorithm execution error:', e)
    }

    setSteps(algorithmSteps.length > 0 ? algorithmSteps : [{ array: arr, comparing: [] }])
    const time = performance.now() - startTime
    setStats({ ...stats, time: time.toFixed(2), steps: algorithmSteps.length })
  }

  const generateRandomGraph = (nodeCount) => {
    const adjList = {}
    for (let i = 0; i < nodeCount; i++) {
      adjList[i] = []
      const connections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connections; j++) {
        const neighbor = Math.floor(Math.random() * nodeCount)
        if (neighbor !== i && !adjList[i].includes(neighbor)) {
          adjList[i].push(neighbor)
        }
      }
    }
    return adjList
  }

  const generateWeightedGraph = (nodeCount) => {
    const adjList = {}
    for (let i = 0; i < nodeCount; i++) {
      adjList[i] = []
      const connections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connections; j++) {
        const neighbor = Math.floor(Math.random() * nodeCount)
        const weight = Math.floor(Math.random() * 50) + 1
        if (neighbor !== i) {
          adjList[i].push([neighbor, weight])
        }
      }
    }
    return adjList
  }

  const generateEdges = (nodeCount) => {
    const edges = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.5) {
          const weight = Math.floor(Math.random() * 50) + 1
          edges.push([i, j, weight])
        }
      }
    }
    return edges
  }

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return

    const timeout = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsPlaying(false)
      }
    }, 101 - speed)

    return () => clearTimeout(timeout)
  }, [isPlaying, currentStep, speed, steps])

  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep]
      if (step.array) {
        setArray(step.array)
      }
      if (step.comparing) {
        setHighlightedIndices(step.comparing)
      } else {
        setHighlightedIndices([])
      }
      if (step.sorted) {
        setSortedIndices(Array.from({ length: step.sorted.length }, (_, i) => step.sorted[i] ? i : -1).filter(i => i !== -1))
      } else {
        setSortedIndices([])
      }
      if (step.foundIndex !== undefined) {
        setFoundIndex(step.foundIndex)
      }
      if (step.checked) {
        setCheckedIndices(step.checked)
      }
    } else if (steps.length > 0 && currentStep === steps.length - 1) {
      // When algorithm is complete, clear ALL coloring
      const lastStep = steps[steps.length - 1]
      if (lastStep.array) {
        setArray(lastStep.array)
      }
      setHighlightedIndices([])
      setCheckedIndices([])
      setSortedIndices([])
      setFoundIndex(-1)
    }
  }, [currentStep, steps])

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="mb-12">
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
        </div>

        <div className="glass rounded-xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-4 font-medium">Playback</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors text-white"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={() => {
                    generateArray()
                    setSearchTarget('')
                    setSearchValue(null)
                    setFoundIndex(-1)
                  }}
                  className="p-3 rounded-lg bg-accent-600 hover:bg-accent-500 transition-colors text-white"
                >
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={() => generateArray()}
                  className="p-3 rounded-lg bg-accent-700 hover:bg-accent-600 transition-colors text-white"
                >
                  <Shuffle size={20} />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-4 font-medium">Speed: {speed}%</p>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-4 font-medium">Array Size: {arraySize}</p>
              <input
                type="range"
                min="10"
                max="200"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {['linear-search', 'binary-search'].includes(algorithm.id) && (
          <div className="glass rounded-xl p-6 mb-8 border border-white/10">
            <p className="text-sm text-gray-400 mb-4 font-medium">Search Target</p>
            <div className="flex gap-3">
              <input
                type="number"
                min="1"
                max="100"
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
                placeholder="Enter value to search..."
                className="flex-1 px-4 py-2 rounded-lg bg-dark-700 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
              <button
                onClick={() => {
                  const target = parseInt(searchTarget)
                  if (isNaN(target)) {
                    alert('Please enter a valid number between 1 and 100')
                    return
                  }
                  // Clear all colors when starting new search
                  setCurrentStep(0)
                  setIsPlaying(false)
                  setFoundIndex(-1)
                  setHighlightedIndices([])
                  setCheckedIndices([])
                  setSortedIndices([])
                  executeAlgorithm(array, target)
                }}
                className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors text-white font-medium"
              >
                Search
              </button>
            </div>
            {foundIndex >= 0 && (
              <p className="text-green-400 text-sm mt-2">✓ Found at index {foundIndex}!</p>
            )}
            {foundIndex === -1 && steps.length > 0 && currentStep === steps.length - 1 && (
              <p className="text-red-400 text-sm mt-2">✗ Element not found</p>
            )}
          </div>
        )}

        {['bfs', 'dfs', 'dijkstra', 'kruskal'].includes(algorithm.id) ? (
          <GraphVisualizer steps={steps} currentStep={currentStep} algorithm={algorithm} />
        ) : (
          <ElementVisualizer
            array={array}
            highlightedIndices={highlightedIndices}
            sortedIndices={sortedIndices}
            currentStep={currentStep}
            totalSteps={steps.length}
            foundIndex={foundIndex}
            checkedIndices={checkedIndices}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Step', value: `${currentStep + 1} / ${steps.length}` },
            { label: 'Comparisons', value: stats.comparisons },
            { label: 'Time', value: `${stats.time}ms` },
            { label: 'Steps', value: stats.steps },
          ].map((item, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">{item.label}</p>
              <p className="text-2xl font-bold text-primary-400">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
