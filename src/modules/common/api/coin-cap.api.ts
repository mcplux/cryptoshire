import axios from 'axios'

const coinCapApi = axios.create({ baseURL: import.meta.env.VITE_COIN_CAP_API })

export default coinCapApi
