import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

/**
 * Fetch all algorithms
 */
export async function fetchAlgorithms() {
  try {
    const response = await api.get('/algorithms')
    return response.data
  } catch (error) {
    console.error('Error fetching algorithms:', error)
    return null
  }
}

/**
 * Fetch algorithm details
 */
export async function fetchAlgorithmDetails(algorithmId) {
  try {
    const response = await api.get(`/algorithms/${algorithmId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching algorithm details:', error)
    return null
  }
}

/**
 * Run algorithm visualization
 */
export async function runAlgorithmVisualization(algorithmId, data) {
  try {
    const response = await api.post(`/algorithms/${algorithmId}/run`, { data })
    return response.data
  } catch (error) {
    console.error('Error running algorithm:', error)
    return null
  }
}

/**
 * Fetch available datasets
 */
export async function fetchDatasets() {
  try {
    const response = await api.get('/datasets')
    return response.data
  } catch (error) {
    console.error('Error fetching datasets:', error)
    return null
  }
}

/**
 * Fetch specific dataset
 */
export async function fetchDataset(datasetId) {
  try {
    const response = await api.get(`/datasets/${datasetId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching dataset:', error)
    return null
  }
}

/**
 * Health check
 */
export async function checkHealth() {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Backend health check failed:', error)
    return null
  }
}

export default api
