/**
 * Searching Algorithms Module
 * Contains implementations of various searching algorithms
 */

export { linearSearch } from './linearSearch.js';
export { binarySearch } from './binarySearch.js';
export { jumpSearch } from './jumpSearch.js';
export { interpolationSearch } from './interpolationSearch.js';

// Index of all available searching algorithms
export const searchingAlgorithmsIndex = [
  {
    name: 'Linear Search',
    complexity: { time: 'O(n)', space: 'O(1)' },
    description: 'Simple search that checks each element sequentially'
  },
  {
    name: 'Binary Search',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    description: 'Efficient search for sorted arrays using divide-and-conquer'
  },
  {
    name: 'Jump Search',
    complexity: { time: 'O(√n)', space: 'O(1)' },
    description: 'Searches sorted array by jumping and then linear search'
  },
  {
    name: 'Interpolation Search',
    complexity: { time: 'O(log log n)', space: 'O(1)' },
    description: 'Optimized search that probes locations based on value'
  }
];
