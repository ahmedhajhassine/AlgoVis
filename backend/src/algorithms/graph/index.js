/**
 * Graph Algorithms Module
 * Contains implementations of various graph algorithms
 */

export { bfs } from './bfs.js';
export { dfs } from './dfs.js';
export { dijkstra } from './dijkstra.js';
export { bellmanFord } from './bellmanFord.js';
export { astar } from './astar.js';
export { kruskal } from './kruskal.js';
export { prim } from './prim.js';
export { depthFirstSearch } from './depthFirstSearch.js';
export { breadthFirstSearch } from './breadthFirstSearch.js';

// Index of all available graph algorithms
export const graphAlgorithmsIndex = [
  {
    name: 'Breadth-First Search (BFS)',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description: 'Explores vertices level-by-level from source'
  },
  {
    name: 'Depth-First Search (DFS)',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description: 'Explores vertices as far as possible along each branch'
  },
  {
    name: 'Dijkstra\'s Algorithm',
    complexity: { time: 'O((V + E) log V)', space: 'O(V)' },
    description: 'Finds shortest path from source to all vertices'
  },
  {
    name: 'Bellman-Ford Algorithm',
    complexity: { time: 'O(V × E)', space: 'O(V)' },
    description: 'Finds shortest paths handling negative edges'
  },
  {
    name: 'A* Algorithm',
    complexity: { time: 'O(E)', space: 'O(V)' },
    description: 'Informed search algorithm using heuristics'
  },
  {
    name: 'Kruskal\'s Algorithm',
    complexity: { time: 'O(E log E)', space: 'O(V)' },
    description: 'Finds minimum spanning tree using edge sorting'
  },
  {
    name: 'Prim\'s Algorithm',
    complexity: { time: 'O(V²)', space: 'O(V)' },
    description: 'Finds minimum spanning tree growing from a vertex'
  }
];
