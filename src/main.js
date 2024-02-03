import { createApp, h } from 'vue'
import ChatBox from '@/components/ChatBox.vue'
import * as Sentry from '@sentry/vue'
import 'animate.css'

const app = createApp({
  render: () => h(ChatBox)
})

Sentry.init({
  app: app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: []
})

app.mount('#chatbot')
