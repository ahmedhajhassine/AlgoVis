/**
 * Algorithms Module
 * Central hub for all algorithm implementations
 */

export { sortingAlgorithmsIndex } from './sorting/index.js';
export { searchingAlgorithmsIndex } from './searching/index.js';
export { graphAlgorithmsIndex } from './graph/index.js';
export { dpAlgorithmsIndex } from './dynamic-programming/index.js';

/**
 * Get all available algorithms across all categories
 */
export function getAllAlgorithms() {
  return {
    sorting: sortingAlgorithmsIndex,
    searching: searchingAlgorithmsIndex,
    graph: graphAlgorithmsIndex,
    dynamicProgramming: dpAlgorithmsIndex
  };
}

/**
 * Get algorithm by name
 */
export function getAlgorithmByName(name, category) {
  const algorithms = getAllAlgorithms();
  if (category && algorithms[category]) {
    return algorithms[category].find(algo => algo.name === name);
  }
  
  for (const cat of Object.values(algorithms)) {
    const found = cat.find(algo => algo.name === name);
    if (found) return found;
  }
  return null;
}
