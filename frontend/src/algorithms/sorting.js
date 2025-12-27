// Sorting Algorithms with step-by-step visualization data

export const bubbleSort = (arr) => {
  const steps = []
  const array = [...arr]
  const n = array.length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        sorted: Array.from({ length: n }, (_, idx) => idx >= n - i),
      })

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          sorted: Array.from({ length: n }, (_, idx) => idx >= n - i),
          swapped: true,
        })
      }
    }
  }

  steps.push({
    array: [...array],
    comparing: [],
    sorted: Array.from({ length: n }, () => true),
  })

  return steps
}

export const mergeSort = (arr) => {
  const steps = []

  function merge(left, right, offset) {
    const result = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
      steps.push({
        array: [...steps[steps.length - 1]?.array || arr],
        comparing: [offset + i, offset + left.length + j],
      })

      if (left[i] <= right[j]) {
        result.push(left[i])
        i++
      } else {
        result.push(right[j])
        j++
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j))
  }

  function sort(arr, offset = 0) {
    if (arr.length <= 1) return arr

    const mid = Math.floor(arr.length / 2)
    const left = sort(arr.slice(0, mid), offset)
    const right = sort(arr.slice(mid), offset + mid)

    const merged = merge(left, right, offset)
    steps.push({
      array: merged,
      comparing: [],
    })

    return merged
  }

  const result = sort([...arr])
  steps.push({
    array: result,
    comparing: [],
    sorted: Array.from({ length: arr.length }, () => true),
  })

  return steps
}

export const quickSort = (arr) => {
  const steps = []
  const array = [...arr]

  function partition(low, high) {
    const pivot = array[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j, high],
      })

      if (array[j] < pivot) {
        i++
        [array[i], array[j]] = [array[j], array[i]]
        steps.push({
          array: [...array],
          comparing: [i, j],
          swapped: true,
        })
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]]
    steps.push({
      array: [...array],
      comparing: [i + 1, high],
      swapped: true,
    })

    return i + 1
  }

  function sort(low, high) {
    if (low < high) {
      const pi = partition(low, high)
      sort(low, pi - 1)
      sort(pi + 1, high)
    }
  }

  sort(0, array.length - 1)
  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, () => true),
  })

  return steps
}

export const heapSort = (arr) => {
  const steps = []
  const array = [...arr]
  const n = array.length

  function heapify(n, i) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && array[left] > array[largest]) {
      largest = left
    }

    if (right < n && array[right] > array[largest]) {
      largest = right
    }

    if (largest !== i) {
      steps.push({
        array: [...array],
        comparing: [i, largest],
      })

      [array[i], array[largest]] = [array[largest], array[i]]
      steps.push({
        array: [...array],
        comparing: [i, largest],
        swapped: true,
      })

      heapify(n, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: [...array],
      comparing: [0, i],
      sorted: Array.from({ length: n }, (_, idx) => idx >= i),
    })

    [array[0], array[i]] = [array[i], array[0]]
    steps.push({
      array: [...array],
      comparing: [0, i],
      swapped: true,
      sorted: Array.from({ length: n }, (_, idx) => idx >= i),
    })

    heapify(i, 0)
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, () => true),
  })

  return steps
}

export const selectionSort = (arr) => {
  const steps = []
  const array = [...arr]
  const n = array.length

  for (let i = 0; i < n; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        comparing: [minIdx, j],
        sorted: Array.from({ length: n }, (_, idx) => idx < i),
      })

      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]]
      steps.push({
        array: [...array],
        comparing: [i, minIdx],
        swapped: true,
        sorted: Array.from({ length: n }, (_, idx) => idx <= i),
      })
    }
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, () => true),
  })

  return steps
}

export const insertionSort = (arr) => {
  const steps = []
  const array = [...arr]
  const n = array.length

  for (let i = 1; i < n; i++) {
    const key = array[i]
    let j = i - 1

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [j, i],
        sorted: Array.from({ length: n }, (_, idx) => idx < i),
      })

      array[j + 1] = array[j]
      j--
    }

    array[j + 1] = key
    steps.push({
      array: [...array],
      comparing: [],
      sorted: Array.from({ length: n }, (_, idx) => idx <= i),
    })
  }

  return steps
}
