const binarySearch = (arr, target) => {
  const steps = [];
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({ type: 'compare', index: mid });

    if (arr[mid] === target) {
      steps.push({ type: 'found', index: mid });
      return { index: mid, steps };
    }

    if (arr[mid] < target) {
      left = mid + 1;
      steps.push({ type: 'move-right', range: [left, right] });
    } else {
      right = mid - 1;
      steps.push({ type: 'move-left', range: [left, right] });
    }
  }

  steps.push({ type: 'not-found' });
  return { index: -1, steps };
};

module.exports = binarySearch;