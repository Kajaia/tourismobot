<script>
import { chat } from './services/OpenAI'

export default {
  data() {
    return {
      message: null,
      messages: localStorage.getItem('chat_messages')
        ? JSON.parse(localStorage.getItem('chat_messages'))
        : [],
      loading: false
    }
  },
  methods: {
    sendMessage() {
      this.messages.push({ type: 'user', message: this.message })
      this.storeMessages()
      this.message = null
      this.loading = true
      chat({ message: this.messages[this.messages.length - 1].message })
        .then((res) => {
          if (res.status === 200) {
            this.messages.push({ type: 'bot', message: res.data.message })
            this.storeMessages()
            this.loading = false
          }
        })
        .catch(console.error())
    },
    storeMessages() {
      localStorage.setItem('chat_messages', JSON.stringify(this.messages))
    }
  }
}
</script>

<template>
  <div
    style="height: 300px; background-color: #eee; width: 500px; overflow-y: scroll; padding: 10px"
  >
    <div v-if="messages.length">
      <div
        v-for="(item, index) in messages"
        :key="index"
        :style="item.type === 'user' ? { textAlign: 'right' } : {}"
      >
        <p v-text="item.message"></p>
      </div>
      <div v-if="loading">
        <p>Typing...</p>
      </div>
    </div>
  </div>
  <div>
    <form @submit.prevent="sendMessage" method="post">
      <input v-model="message" type="text" name="message" id="message" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>
