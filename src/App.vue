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
      if (this.message.length >= 2) {
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
      }
    },
    storeMessages() {
      localStorage.setItem('chat_messages', JSON.stringify(this.messages))
    }
  }
}
</script>

<template>
  <div
    class="container-fluid m-0 bg-secondary p-3 min-vh-100 d-flex flex-column justify-content-center align-items-center"
  >
    <div class="row justify-content-center">
      <div class="col-12 col-size">
        <div class="card rounded-3 shadow border-0">
          <div class="card-header border-0 bg-c-primary text-white d-flex justify-content-between">
            <div class="d-flex">
              <img
                width="40"
                height="40"
                class="rounded-pill"
                src="https://i.ibb.co/nLq68b4/logooo-1.png"
                alt="logo"
              />
              <div class="ms-3">
                <h6 class="mb-0">TourismoBot</h6>
                <p class="mb-0">Bot to guide your trip!</p>
              </div>
            </div>
            <!-- <button class="btn btn-sm btn-light" title="Close">X</button> -->
          </div>
          <div class="card-body chat-box d-flex flex-column-reverse">
            <div v-if="loading" class="row my-2 align-items-start">
              <div class="col-auto d-flex align-items-start gap-2">
                <div>
                  <img
                    width="32"
                    height="32"
                    class="rounded-pill"
                    src="https://i.ibb.co/nLq68b4/logooo-1.png"
                    alt="logo"
                  />
                </div>
                <div
                  class="rounded-3 shadow-sm mb-2 py-2 px-3 d-flex align-items-start justify-content-between gap-2 bg-light"
                >
                  <div>
                    <p class="m-0">Typing...</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row my-2"
              v-for="(item, index) in messages.slice().reverse()"
              :key="index"
              :class="
                item.type === 'user' ? 'align-items-end justify-content-end' : 'align-items-start'
              "
            >
              <div
                class="col-auto d-flex gap-2"
                :class="item.type === 'user' ? 'align-items-start' : 'align-items-end'"
              >
                <div>
                  <img
                    v-if="item.type === 'bot'"
                    width="32"
                    height="32"
                    class="rounded-pill"
                    src="https://i.ibb.co/nLq68b4/logooo-1.png"
                    alt="logo"
                  />
                </div>
                <div
                  class="rounded-3 shadow-sm mb-2 py-2 px-3 d-flex align-items-start justify-content-between gap-2"
                  :class="item.type === 'user' ? 'bg-c-primary text-white' : 'bg-light'"
                >
                  <div>
                    <p class="m-0">{{ item.message }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer border-0 pb-0 bg-white">
            <form @submit.prevent="sendMessage" method="post">
              <input
                v-model="message"
                class="form-control"
                type="text"
                name="message"
                id="message"
                placeholder="Chat with TourismoBot"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scroll bar */
::-webkit-scrollbar {
  width: 6px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background: #dd4848;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #205c91;
}
/* /Scroll bar */

.bg-c-primary {
  background-color: #dd4848;
}

.chat-box {
  height: 500px;
  overflow-y: scroll;
}

.col-size {
  width: 360px;
  height: 80vh;
}
</style>
