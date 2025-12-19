/**
 * Core Data Structures
 * Basic data structures used across algorithms
 */

/**
 * Queue implementation
 */
export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  peek() {
    return this.items[0];
  }

  clear() {
    this.items = [];
  }
}

/**
 * Stack implementation
 */
export class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  clear() {
    this.items = [];
  }
}

/**
 * Graph representation
 */
export class Graph {
  constructor(isDirected = false) {
    this.vertices = new Set();
    this.adjacencyList = new Map();
    this.isDirected = isDirected;
  }

  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.add(vertex);
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(from, to, weight = 1) {
    if (!this.vertices.has(from)) this.addVertex(from);
    if (!this.vertices.has(to)) this.addVertex(to);

    this.adjacencyList.get(from).push({ to, weight });

    if (!this.isDirected) {
      this.adjacencyList.get(to).push({ from, weight });
    }
  }

  getNeighbors(vertex) {
    return this.adjacencyList.get(vertex) || [];
  }

  getVertices() {
    return Array.from(this.vertices);
  }
}

/**
 * Min-Heap implementation
 */
export class MinHeap {
  constructor() {
    this.heap = [];
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  leftChild(i) {
    return 2 * i + 1;
  }

  rightChild(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleDown(i) {
    const size = this.heap.length;
    let smallest = i;

    const left = this.leftChild(i);
    const right = this.rightChild(i);

    if (left < size && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    if (right < size && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== i) {
      this.swap(i, smallest);
      this.bubbleDown(smallest);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}
