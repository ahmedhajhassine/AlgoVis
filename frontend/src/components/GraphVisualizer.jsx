import React, { useState, useEffect } from 'react'

export default function GraphVisualizer({ steps, currentStep, algorithm }) {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [visitedNodes, setVisitedNodes] = useState(new Set())
  const [currentNode, setCurrentNode] = useState(null)
  const [exploringEdge, setExploringEdge] = useState(null)

  useEffect(() => {
    // Generate random positions for nodes in a circular pattern
    const nodeCount = 12
    const radius = 150
    const centerX = 400
    const centerY = 200

    const newNodes = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * 2 * Math.PI
      return {
        id: i,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })
    setNodes(newNodes)

    // Generate edges
    const newEdges = generateEdges(nodeCount, algorithm.id)
    setEdges(newEdges)
  }, [algorithm.id])

  const generateEdges = (nodeCount, algoId) => {
    const edges = []
    if (algoId === 'kruskal') {
      if (steps.length > 0) {
        const firstStep = steps[0]
        if (firstStep.edges) {
          return firstStep.edges.map(([u, v, weight]) => ({
            from: u,
            to: v,
            weight: weight,
            inMST: false,
          }))
        }
      }
    }

    // Create a connected graph
    for (let i = 0; i < nodeCount; i++) {
      const connections = Math.floor(Math.random() * 2) + 2
      for (let j = 0; j < connections; j++) {
        const neighbor = Math.floor(Math.random() * nodeCount)
        if (neighbor !== i && !edges.some(e => (e.from === i && e.to === neighbor) || (e.from === neighbor && e.to === i))) {
          edges.push({
            from: i,
            to: neighbor,
            weight: Math.floor(Math.random() * 50) + 1,
          })
        }
      }
    }
    return edges
  }

  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep]

      if (step.visited) {
        setVisitedNodes(new Set(step.visited))
      }

      if (step.current !== undefined) {
        setCurrentNode(step.current)
      }

      if (step.exploring !== undefined) {
        setExploringEdge({ from: step.current, to: step.exploring })
      } else {
        setExploringEdge(null)
      }

      // Handle MST edges
      if (step.mst) {
        const mstSet = new Set(step.mst.map(([u, v]) => `${u}-${v}` || `${v}-${u}`))
        const updatedEdges = edges.map(edge => ({
          ...edge,
          inMST: mstSet.has(`${edge.from}-${edge.to}`) || mstSet.has(`${edge.to}-${edge.from}`),
        }))
        setEdges(updatedEdges)
      }
    }
  }, [currentStep, steps, edges])

  const getNodeColor = (nodeId) => {
    // Color priority:
    // 1. Currently being processed (red/orange)
    // 2. Already processed/visited (green)
    // 3. Not yet processed (gray/dark)
    if (currentNode === nodeId) return '#f97316' // orange - currently being processed
    if (visitedNodes.has(nodeId)) return '#22c55e' // green - already processed/visited
    return '#6b7280' // gray - not yet processed
  }

  const SVG_WIDTH = 800
  const SVG_HEIGHT = 400

  return (
    <div className="glass rounded-xl p-8">
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="w-full border border-white/10 rounded-lg bg-dark-800">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
          </marker>
          <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
          </marker>
        </defs>

        {/* Draw edges */}
        {edges.map((edge, idx) => {
          const fromNode = nodes.find(n => n.id === edge.from)
          const toNode = nodes.find(n => n.id === edge.to)
          if (!fromNode || !toNode) return null

          const isExploring = exploringEdge && 
            ((exploringEdge.from === edge.from && exploringEdge.to === edge.to) ||
             (exploringEdge.from === edge.to && exploringEdge.to === edge.from))
          
          const strokeColor = edge.inMST ? '#22c55e' : isExploring ? '#fbbf24' : '#6366f1'
          const strokeWidth = edge.inMST ? 3 : isExploring ? 3 : 2

          return (
            <g key={idx}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                opacity="0.7"
              />
              {edge.weight && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          )
        })}

        {/* Draw nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={getNodeColor(node.id)}
              opacity="0.85"
              className="transition-all"
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy="0.3em"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>

      {steps.length > 0 && (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-dark-700 rounded-lg">
            <p className="text-gray-300 text-sm">
              {steps[Math.min(currentStep, steps.length - 1)]?.step || 'Algorithm visualization'}
            </p>
            <div className="mt-2 text-xs text-gray-400">
              <p>Visited: {visitedNodes.size} nodes</p>
              <p>Current: {currentNode !== null ? `Node ${currentNode}` : 'None'}</p>
            </div>
          </div>
          
          {currentStep < steps.length - 1 && (
            <div className="p-3 bg-dark-700/50 rounded-lg border border-white/5">
              <p className="text-xs text-gray-400 mb-2 font-medium">Color Legend:</p>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
                  <span className="text-gray-300">Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
                  <span className="text-gray-300">Processed/Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#6b7280' }}></div>
                  <span className="text-gray-300">Not Yet Processed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
