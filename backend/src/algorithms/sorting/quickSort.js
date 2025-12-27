const quickSort = (arr) => {
  const steps = [];

  const partition = (low, high) => {
    const pivot = arr[high];
    steps.push({ type: 'pivot', index: high });
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high] });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ type: 'swap', indices: [i, j] });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ type: 'swap', indices: [i + 1, high] });
    return i + 1;
  };

  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  sort(0, arr.length - 1);
  return { sortedArray: arr, steps };
};

module.exports = quickSort;