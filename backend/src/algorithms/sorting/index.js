/**
 * Sorting Algorithms Module
 * Contains implementations of various sorting algorithms
 */

export { bubbleSort } from './bubbleSort.js';
export { selectionSort } from './selectionSort.js';
export { insertionSort } from './insertionSort.js';
export { mergeSort } from './mergeSort.js';
export { quickSort } from './quickSort.js';
export { heapSort } from './heapSort.js';

/**
 * Index of all available sorting algorithms
 */
export const sortingAlgorithmsIndex = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    description: 'Simple sorting algorithm that repeatedly steps through the list',
    category: 'sorting',
    difficulty: 'Easy',
    bestCase: 'O(n)',
    worstCase: 'O(n²)',
    stable: true
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    description: 'Sorts by repeatedly finding the minimum element',
    category: 'sorting',
    difficulty: 'Easy',
    bestCase: 'O(n²)',
    worstCase: 'O(n²)',
    stable: false
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    description: 'Builds the sorted array one item at a time by insertion',
    category: 'sorting',
    difficulty: 'Easy',
    bestCase: 'O(n)',
    worstCase: 'O(n²)',
    stable: true
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    description: 'Divide-and-conquer algorithm that divides array in half',
    category: 'sorting',
    difficulty: 'Medium',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    stable: true
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    complexity: { time: 'O(n log n)', space: 'O(log n)' },
    description: 'Efficient divide-and-conquer algorithm using partitioning',
    category: 'sorting',
    difficulty: 'Medium',
    bestCase: 'O(n log n)',
    worstCase: 'O(n²)',
    stable: false
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    complexity: { time: 'O(n log n)', space: 'O(1)' },
    description: 'Uses a heap data structure to sort elements',
    category: 'sorting',
    difficulty: 'Medium',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    stable: false
  }
];
