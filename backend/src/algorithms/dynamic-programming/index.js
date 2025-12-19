/**
 * Dynamic Programming Algorithms Module
 * Contains implementations of various DP algorithms
 */

export { fibonacci } from './fibonacci.js';
export { longestCommonSubsequence } from './longestCommonSubsequence.js';
export { editDistance } from './editDistance.js';
export { knapsack } from './knapsack.js';
export { matrixChainMultiplication } from './matrixChainMultiplication.js';
export { coinChange } from './coinChange.js';

// Index of all available DP algorithms
export const dpAlgorithmsIndex = [
  {
    name: 'Fibonacci',
    complexity: { time: 'O(n)', space: 'O(n)' },
    description: 'Classic DP example computing fibonacci sequence'
  },
  {
    name: 'Longest Common Subsequence',
    complexity: { time: 'O(m × n)', space: 'O(m × n)' },
    description: 'Finds longest sequence common to two sequences'
  },
  {
    name: 'Edit Distance (Levenshtein)',
    complexity: { time: 'O(m × n)', space: 'O(m × n)' },
    description: 'Minimum edits to transform one string into another'
  },
  {
    name: 'Knapsack Problem',
    complexity: { time: 'O(n × W)', space: 'O(n × W)' },
    description: 'Selects items to maximize value within weight limit'
  },
  {
    name: 'Matrix Chain Multiplication',
    complexity: { time: 'O(n³)', space: 'O(n²)' },
    description: 'Optimal order to multiply sequence of matrices'
  },
  {
    name: 'Coin Change',
    complexity: { time: 'O(n × amount)', space: 'O(amount)' },
    description: 'Minimum coins needed to make a specific amount'
  }
];
