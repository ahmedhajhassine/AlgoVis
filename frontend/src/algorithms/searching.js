// Searching Algorithms

export const linearSearch = (arr, target) => {
  const steps = []
  const checked = []

  for (let i = 0; i < arr.length; i++) {
    checked.push(i)
    steps.push({
      array: [...arr],
      comparing: [i],
      checked: [...checked],
      found: false,
    })

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        comparing: [i],
        checked: [...checked],
        found: true,
        foundIndex: i,
        sorted: Array.from({ length: arr.length }, (_, idx) => idx === i),
      })
      return steps
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    checked: [...checked],
    found: false,
  })

  return steps
}

export const binarySearch = (arr, target) => {
  const steps = []
  const sorted = [...arr].sort((a, b) => a - b)
  let left = 0
  let right = sorted.length - 1
  let found = false
  let foundIndex = -1
  const checked = new Set()

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    checked.add(mid)

    steps.push({
      array: [...sorted],
      comparing: [mid],
      range: [left, right],
      checked: Array.from(checked),
      found: false,
    })

    if (sorted[mid] === target) {
      found = true
      foundIndex = mid
      steps.push({
        array: [...sorted],
        comparing: [mid],
        range: [left, right],
        checked: Array.from(checked),
        found: true,
        foundIndex: mid,
        sorted: Array.from({ length: sorted.length }, (_, idx) => idx === mid),
      })
      break
    } else if (sorted[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  if (!found) {
    steps.push({
      array: [...sorted],
      comparing: [],
      checked: Array.from(checked),
      found: false,
    })
  }

  return steps
}
