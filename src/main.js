import { createApp, h } from 'vue'
import ChatBox from '@/components/ChatBox.vue'

createApp({
  render: () => h(ChatBox)
}).mount('#chatbot')
