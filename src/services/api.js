import axios from 'axios'

const API_URL = 'https://battery-insight-backend.onrender.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Error handler
export const parseError = (error) => {
  if (error.response) {
    const { status, data } = error.response
    
    // Spring Boot validation errors
    if (data.errors && Array.isArray(data.errors)) {
      return {
        message: data.message || 'Validation failed',
        errors: data.errors,
      }
    }
    
    // Spring Boot general error
    if (data.message) {
      return {
        message: data.message,
        status,
      }
    }
    
    // Fallback
    return {
      message: `Error: ${status} ${data.error || 'Unknown error'}`,
      status,
    }
  }
  
  if (error.request) {
    return {
      message: 'No response from server. Please check your connection.',
    }
  }
  
  return {
    message: error.message || 'An unexpected error occurred',
  }
}

// API Functions
export const getDashboard = async () => {
  const response = await api.get('/dashboard')
  return response.data
}

export const getBatteries = async (page = 0, size = 20, search = '') => {
  const params = { page, size }
  if (search) {
    params.search = search
  }
  const response = await api.get('/batteries', { params })
  return response.data
}

export const getBattery = async (batteryId) => {
  const response = await api.get(`/batteries/${batteryId}`)
  return response.data
}

export const getTelemetry = async (batteryId, page = 0, size = 20) => {
  const response = await api.get(`/telemetry/${batteryId}`, {
    params: { page, size },
  })
  return response.data
}

export const createTelemetry = async (data) => {
  const response = await api.post('/telemetry', data)
  return response.data
}

export const uploadTelemetry = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post('/telemetry/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const analyzeBattery = async (batteryId) => {
  const response = await api.post(`/analysis/${batteryId}`)
  return response.data
}

export const getBatteryAnalysisHistory = async (batteryId, page = 0, size = 20) => {
  const response = await api.get(`/analysis/${batteryId}`, {
    params: { page, size },
  })
  return response.data
}

export const getAnalysisHistory = async (page = 0, size = 20) => {
  const response = await api.get('/analysis/history', {
    params: { page, size },
  })
  return response.data
}

export default api
