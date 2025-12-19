/**
 * Visualization Utilities
 * Helper functions for algorithm visualization
 */

/**
 * Creates a visualization step capturing the state of the algorithm
 * @param {Object} state - Current state of algorithm
 * @param {string} action - Description of action performed
 * @param {Array} highlighted - Indices or items highlighted
 * @returns {Object} Visualization step
 */
export function createVisualizationStep(state, action, highlighted = []) {
  return {
    timestamp: Date.now(),
    state: JSON.parse(JSON.stringify(state)), // Deep copy
    action,
    highlighted,
    complexity: {
      timeElapsed: 0,
      operationsCount: 0
    }
  };
}

/**
 * Tracks algorithm operations for complexity analysis
 */
export class OperationTracker {
  constructor() {
    this.comparisons = 0;
    this.swaps = 0;
    this.assignments = 0;
    this.accesses = 0;
  }

  compareOperation() {
    this.comparisons++;
  }

  swapOperation() {
    this.swaps++;
  }

  assignmentOperation() {
    this.assignments++;
  }

  accessOperation() {
    this.accesses++;
  }

  getTotalOperations() {
    return this.comparisons + this.swaps + this.assignments + this.accesses;
  }

  getReport() {
    return {
      comparisons: this.comparisons,
      swaps: this.swaps,
      assignments: this.assignments,
      accesses: this.accesses,
      total: this.getTotalOperations()
    };
  }

  reset() {
    this.comparisons = 0;
    this.swaps = 0;
    this.assignments = 0;
    this.accesses = 0;
  }
}

/**
 * Generates random array for algorithm testing
 */
export function generateRandomArray(length, max = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
}

/**
 * Generates sorted array
 */
export function generateSortedArray(length) {
  return Array.from({ length }, (_, i) => i + 1);
}

/**
 * Generates reverse sorted array
 */
export function generateReverseSortedArray(length) {
  return Array.from({ length }, (_, i) => length - i);
}
