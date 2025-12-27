const linearSearch = (arr, target) => {
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    steps.push({ type: 'compare', index: i });
    if (arr[i] === target) {
      steps.push({ type: 'found', index: i });
      return { index: i, steps };
    }
  }

  steps.push({ type: 'not-found' });
  return { index: -1, steps };
};

module.exports = linearSearch;