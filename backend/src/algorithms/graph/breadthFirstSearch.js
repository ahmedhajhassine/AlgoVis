const breadthFirstSearch = (graph, start) => {
  const steps = [];
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    if (visited.has(node)) continue;

    visited.add(node);
    steps.push({ type: 'visit', node });

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        steps.push({ type: 'enqueue', edge: [node, neighbor] });
        queue.push(neighbor);
      }
    }
  }

  return { visited: Array.from(visited), steps };
};

module.exports = breadthFirstSearch;