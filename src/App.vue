<script>
import { chat } from './services/OpenAI'

export default {
  data() {
    return {
      message: '',
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
        this.message = ''
        this.loading = true
        chat({ message: this.messages[this.messages.length - 1].message })
          .then((res) => {
            if (res.status === 200) {
              this.messages.push({ type: 'bot', message: res.data.message })
              this.storeMessages()
              this.loading = false
            }
          })
          .catch((err) => {
            console.log(err)
            Swal.fire({
              title: 'Something went wrong!',
              text: 'Please refresh page and try again.',
              icon: 'error',
              confirmButtonText: 'Okay'
            })
            localStorage.removeItem('chat_messages')
          })
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
          <div class="card-footer border-0 py-3 bg-white">
            <form @submit.prevent="sendMessage" method="post">
              <textarea
                v-model="message"
                class="form-control textarea"
                type="text"
                name="message"
                id="message"
                placeholder="Chat with TourismoBot"
              ></textarea>
              <div v-if="message.length >= 2" class="send-btn-box">
                <button type="submit" class="btn bg-c-primary send-btn text-white">
                  <i class="fa-solid fa-paper-plane"></i>
                </button>
              </div>
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
  height: 430px;
  overflow-y: scroll;
}

.col-size {
  width: 360px;
  height: 80vh;
}

.textarea {
  display: flex;
  flex-direction: row;
  height: auto;
  height: 42px;
  line-height: 1.5;
  padding: 8px 12px;
}

.send-btn-box {
  align-items: center;
  display: flex;
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  border-radius: 50%;
  height: 25px;
  position: absolute;
  right: 20px;
  bottom: 24px;
  width: 25px;
  transition: 0.3s;
}
.send-btn:hover {
  background-color: #205c91;
}

@media screen and (max-width: 375px) {
  .chat-box {
    height: 75vh;
    overflow-y: scroll;
  }

  .col-size {
    width: 100%;
    height: 100vh;
  }
}
</style>
