import { createApp, h } from 'vue'
import ChatBox from '@/components/ChatBox.vue'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

createApp({
  render: () => h(ChatBox)
}).mount('#chatbot')
