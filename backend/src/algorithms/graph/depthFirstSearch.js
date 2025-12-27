const depthFirstSearch = (graph, start) => {
  const steps = [];
  const visited = new Set();

  const dfs = (node) => {
    if (visited.has(node)) return;
    visited.add(node);
    steps.push({ type: 'visit', node });

    for (const neighbor of graph[node] || []) {
      steps.push({ type: 'explore', edge: [node, neighbor] });
      dfs(neighbor);
    }
  };

  dfs(start);
  return { visited: Array.from(visited), steps };
};

module.exports = depthFirstSearch;