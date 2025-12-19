/**
 * Machine Learning Module
 * ML models and utilities for algorithm analysis and prediction
 */

/**
 * Performance Analyzer
 * Analyzes algorithm performance metrics
 */
export class PerformanceAnalyzer {
  constructor() {
    this.results = [];
  }

  /**
   * Record algorithm execution
   */
  recordExecution(algorithmId, datasetSize, metrics) {
    this.results.push({
      algorithmId,
      datasetSize,
      metrics,
      timestamp: Date.now()
    });
  }

  /**
   * Get performance statistics
   */
  getStatistics(algorithmId) {
    const filtered = this.results.filter(r => r.algorithmId === algorithmId);
    
    if (filtered.length === 0) return null;

    const times = filtered.map(r => r.metrics.executionTime);
    const comparisons = filtered.map(r => r.metrics.comparisons);

    return {
      algorithmId,
      executionCount: filtered.length,
      averageTime: times.reduce((a, b) => a + b) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      averageComparisons: comparisons.reduce((a, b) => a + b) / comparisons.length,
      lastExecution: filtered[filtered.length - 1].timestamp
    };
  }

  /**
   * Compare algorithms
   */
  compareAlgorithms(algo1Id, algo2Id) {
    const stats1 = this.getStatistics(algo1Id);
    const stats2 = this.getStatistics(algo2Id);

    if (!stats1 || !stats2) return null;

    return {
      algorithm1: stats1,
      algorithm2: stats2,
      faster: stats1.averageTime < stats2.averageTime ? algo1Id : algo2Id,
      timeDifference: Math.abs(stats1.averageTime - stats2.averageTime),
      relativePerformance: (stats1.averageTime / stats2.averageTime).toFixed(2)
    };
  }

  /**
   * Clear analytics
   */
  clear() {
    this.results = [];
  }
}

/**
 * Algorithm Recommender
 * Recommends algorithms based on use case
 */
export class AlgorithmRecommender {
  /**
   * Recommend algorithm based on constraints
   */
  static recommend(constraints) {
    const { dataSize, memory, speed, stability } = constraints;

    const recommendations = [];

    // Sorting recommendations
    if (dataSize < 50) {
      recommendations.push({
        algorithm: 'Insertion Sort',
        reason: 'Best for small datasets',
        score: 0.95
      });
    }

    if (dataSize > 1000 && speed === 'critical') {
      recommendations.push({
        algorithm: 'Quick Sort',
        reason: 'Fastest average case for large datasets',
        score: 0.9
      });
    }

    if (stability === 'required') {
      recommendations.push({
        algorithm: 'Merge Sort',
        reason: 'Stable sort with consistent O(n log n)',
        score: 0.85
      });
    }

    if (memory === 'limited') {
      recommendations.push({
        algorithm: 'Heap Sort',
        reason: 'O(1) space complexity',
        score: 0.8
      });
    }

    return recommendations.sort((a, b) => b.score - a.score);
  }
}

/**
 * Complexity Predictor
 * Predicts algorithm complexity for various inputs
 */
export class ComplexityPredictor {
  /**
   * Predict execution time based on dataset size
   */
  static predictTime(algorithmComplexity, datasetSize, baseTime = 1) {
    // O(n)
    if (algorithmComplexity === 'O(n)') {
      return baseTime * datasetSize;
    }

    // O(n log n)
    if (algorithmComplexity === 'O(n log n)') {
      return baseTime * datasetSize * Math.log2(datasetSize);
    }

    // O(n²)
    if (algorithmComplexity === 'O(n²)') {
      return baseTime * datasetSize * datasetSize;
    }

    // O(n³)
    if (algorithmComplexity === 'O(n³)') {
      return baseTime * datasetSize ** 3;
    }

    // O(log n)
    if (algorithmComplexity === 'O(log n)') {
      return baseTime * Math.log2(datasetSize);
    }

    // O(√n)
    if (algorithmComplexity === 'O(√n)' || algorithmComplexity === 'O(√n)') {
      return baseTime * Math.sqrt(datasetSize);
    }

    return 0;
  }

  /**
   * Get complexity comparison
   */
  static compareComplexities(complexities, datasetSize) {
    return complexities.map(c => ({
      complexity: c,
      predictedTime: this.predictTime(c, datasetSize)
    })).sort((a, b) => a.predictedTime - b.predictedTime);
  }
}

// Export instances
export const performanceAnalyzer = new PerformanceAnalyzer();
