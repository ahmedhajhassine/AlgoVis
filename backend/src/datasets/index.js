/**
 * Datasets Module
 * Manages datasets for algorithm testing and ML training
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATASETS_DIR = path.join(__dirname, 'data');

/**
 * Dataset manager class
 */
export class DatasetManager {
  constructor() {
    this.datasets = new Map();
  }

  /**
   * Load dataset from file
   */
  async loadDataset(filename) {
    try {
      const filepath = path.join(DATASETS_DIR, filename);
      const data = await fs.readFile(filepath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error loading dataset ${filename}:`, error);
      return null;
    }
  }

  /**
   * Save dataset to cache
   */
  setDataset(name, data) {
    this.datasets.set(name, {
      data,
      timestamp: Date.now(),
      size: JSON.stringify(data).length
    });
  }

  /**
   * Get dataset from cache
   */
  getDataset(name) {
    return this.datasets.get(name)?.data;
  }

  /**
   * List all loaded datasets
   */
  listDatasets() {
    return Array.from(this.datasets.entries()).map(([name, info]) => ({
      name,
      size: info.size,
      timestamp: info.timestamp
    }));
  }

  /**
   * Clear cache
   */
  clear() {
    this.datasets.clear();
  }
}

/**
 * Built-in dataset information
 */
export const builtinDatasets = [
  {
    id: 'random-small',
    name: 'Random (Small)',
    description: 'Small random dataset for quick testing',
    size: 100,
    type: 'array'
  },
  {
    id: 'random-medium',
    name: 'Random (Medium)',
    description: 'Medium-sized random dataset',
    size: 1000,
    type: 'array'
  },
  {
    id: 'random-large',
    name: 'Random (Large)',
    description: 'Large random dataset for stress testing',
    size: 10000,
    type: 'array'
  },
  {
    id: 'sorted-ascending',
    name: 'Sorted (Ascending)',
    description: 'Pre-sorted data in ascending order',
    size: 1000,
    type: 'array'
  },
  {
    id: 'sorted-descending',
    name: 'Sorted (Descending)',
    description: 'Pre-sorted data in descending order',
    size: 1000,
    type: 'array'
  },
  {
    id: 'graph-small',
    name: 'Graph (Small)',
    description: 'Small graph for pathfinding algorithms',
    size: 20,
    type: 'graph'
  },
  {
    id: 'graph-medium',
    name: 'Graph (Medium)',
    description: 'Medium-sized graph',
    size: 50,
    type: 'graph'
  }
];

/**
 * Generate dataset
 */
export function generateDataset(type, size, options = {}) {
  switch (type) {
    case 'random':
      return Array.from({ length: size }, () => 
        Math.floor(Math.random() * (options.max || 100)) + 1
      );
    
    case 'sorted-asc':
      return Array.from({ length: size }, (_, i) => i + 1);
    
    case 'sorted-desc':
      return Array.from({ length: size }, (_, i) => size - i);
    
    case 'nearly-sorted':
      const arr = Array.from({ length: size }, (_, i) => i + 1);
      for (let i = 0; i < Math.floor(size * 0.1); i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
      }
      return arr;
    
    case 'duplicates':
      return Array.from({ length: size }, () =>
        Math.floor(Math.random() * Math.sqrt(size)) + 1
      );
    
    default:
      return [];
  }
}

export default new DatasetManager();
