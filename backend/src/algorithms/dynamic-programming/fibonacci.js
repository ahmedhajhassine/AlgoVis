const fibonacci = (n) => {
  const steps = [];
  const dp = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({ type: 'compute', index: i, value: dp[i] });
  }

  return { result: dp[n], steps };
};

module.exports = fibonacci;