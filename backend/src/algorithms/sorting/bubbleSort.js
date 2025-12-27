const bubbleSort = (arr) => {
  const steps = [];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ type: 'swap', indices: [j, j + 1] });
      }
    }
  }
  return { sortedArray: arr, steps };
};

module.exports = bubbleSort;