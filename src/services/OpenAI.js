import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const chat = (payload) =>
  instance.post('/turismobot', {
    message: payload.message,
    assistant_id: import.meta.env.VITE_ASSISTANT_ID || null
  })
