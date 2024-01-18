import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const chat = (payload) => instance.post('/turismobot', payload)
