import axios from 'axios'

const coinCapApi = axios.create({ baseURL: import.meta.env.VITE_COIN_CAP_API })

coinCapApi.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_API_KEY
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }

  return config
})

export default coinCapApi
