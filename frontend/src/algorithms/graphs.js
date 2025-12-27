// Graph Algorithms

// BFS - Breadth First Search
export const bfs = (adjList, start) => {
  const steps = []
  const visited = new Set()
  const queue = [start]
  visited.add(start)

  steps.push({
    visited: Array.from(visited),
    queue: [...queue],
    current: start,
    step: 'Starting BFS from node ' + start,
  })

  while (queue.length > 0) {
    const node = queue.shift()

    steps.push({
      visited: Array.from(visited),
      queue: [...queue],
      current: node,
      step: 'Processing node ' + node,
    })

    if (adjList[node]) {
      for (const neighbor of adjList[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)

          steps.push({
            visited: Array.from(visited),
            queue: [...queue],
            current: node,
            exploring: neighbor,
            step: 'Found neighbor ' + neighbor,
          })
        }
      }
    }
  }

  return steps
}

// DFS - Depth First Search
export const dfs = (adjList, start) => {
  const steps = []
  const visited = new Set()
  const stack = [start]

  function dfsVisit(node) {
    if (visited.has(node)) return

    visited.add(node)
    steps.push({
      visited: Array.from(visited),
      current: node,
      step: 'Visiting node ' + node,
    })

    if (adjList[node]) {
      for (const neighbor of adjList[node]) {
        if (!visited.has(neighbor)) {
          steps.push({
            visited: Array.from(visited),
            current: node,
            exploring: neighbor,
            step: 'Exploring neighbor ' + neighbor,
          })
          dfsVisit(neighbor)
        }
      }
    }
  }

  dfsVisit(start)
  return steps
}

// Dijkstra's Algorithm
export const dijkstra = (adjList, start, nodeCount) => {
  const steps = []
  const distances = Array(nodeCount).fill(Infinity)
  const visited = new Set()
  distances[start] = 0

  steps.push({
    distances: [...distances],
    visited: Array.from(visited),
    current: start,
    step: 'Initialize distances from node ' + start,
  })

  for (let i = 0; i < nodeCount; i++) {
    let minDist = Infinity
    let minNode = -1

    for (let j = 0; j < nodeCount; j++) {
      if (!visited.has(j) && distances[j] < minDist) {
        minDist = distances[j]
        minNode = j
      }
    }

    if (minNode === -1) break

    visited.add(minNode)
    steps.push({
      distances: [...distances],
      visited: Array.from(visited),
      current: minNode,
      step: 'Processing node ' + minNode + ' with distance ' + minDist,
    })

    if (adjList[minNode]) {
      for (const [neighbor, weight] of adjList[minNode]) {
        if (!visited.has(neighbor) && distances[minNode] + weight < distances[neighbor]) {
          distances[neighbor] = distances[minNode] + weight

          steps.push({
            distances: [...distances],
            visited: Array.from(visited),
            current: minNode,
            updated: neighbor,
            step: 'Updated distance to node ' + neighbor,
          })
        }
      }
    }
  }

  return steps
}

// Kruskal's Algorithm (Minimum Spanning Tree)
export const kruskal = (edges, nodeCount) => {
  const steps = []
  const sortedEdges = [...edges].sort((a, b) => a[2] - b[2])
  const parent = Array.from({ length: nodeCount }, (_, i) => i)
  const mst = []

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x])
    }
    return parent[x]
  }

  function union(x, y) {
    const px = find(x)
    const py = find(y)
    if (px !== py) {
      parent[px] = py
      return true
    }
    return false
  }

  steps.push({
    edges: sortedEdges,
    mst: [],
    step: 'Starting Kruskal algorithm - sorted edges by weight',
  })

  for (const [u, v, weight] of sortedEdges) {
    steps.push({
      edges: sortedEdges,
      mst: [...mst],
      examining: [u, v, weight],
      step: 'Examining edge ' + u + ' - ' + v + ' (weight: ' + weight + ')',
    })

    if (union(u, v)) {
      mst.push([u, v, weight])
      steps.push({
        edges: sortedEdges,
        mst: [...mst],
        examining: [u, v, weight],
        added: true,
        step: 'Added edge ' + u + ' - ' + v,
      })
    } else {
      steps.push({
        edges: sortedEdges,
        mst: [...mst],
        examining: [u, v, weight],
        added: false,
        step: 'Edge creates cycle - skipped',
      })
    }
  }

  return steps
}
