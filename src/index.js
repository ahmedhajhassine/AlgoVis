/**
 * AlgoVis - Algorithm Visualization Tool
 * Main entry point for the application
 */

console.log('AlgoVis - Algorithm Visualization Tool');
console.log('Version 1.0.0');
console.log('Initializing...');

// Import algorithm modules
import * as sortingAlgorithms from './algorithms/sorting/index.js';
import * as searchingAlgorithms from './algorithms/searching/index.js';
import * as graphAlgorithms from './algorithms/graph/index.js';
import * as dpAlgorithms from './algorithms/dynamic-programming/index.js';

// Export all algorithm categories
export {
  sortingAlgorithms,
  searchingAlgorithms,
  graphAlgorithms,
  dpAlgorithms
};

console.log('✓ AlgoVis initialized successfully');
