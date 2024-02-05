<script>
import { chat } from '@/services/OpenAI'
import { BOT_NAME, BOT_ABOUT, BOT_LOGO } from '@/helpers/settings'

export default {
  data() {
    return {
      message: '',
      messages: localStorage.getItem('chat_messages')
        ? JSON.parse(localStorage.getItem('chat_messages'))
        : [],
      loading: false,
      chatOpen: false,
      BOT_NAME,
      BOT_ABOUT,
      BOT_LOGO
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
            // eslint-disable-next-line no-undef
            Swal.fire({
              title: 'Something went wrong!',
              text: 'Please refresh page and try again.',
              icon: 'error',
              confirmButtonText: 'Okay'
            })
            this.clearMessages()
            this.loading = false
          })
      }
    },
    storeMessages() {
      localStorage.setItem('chat_messages', JSON.stringify(this.messages))
    },
    openChatBox() {
      this.chatOpen = !this.chatOpen
    },
    clearMessages() {
      this.messages = []
      localStorage.removeItem('chat_messages')
    }
  }
}
</script>

<template>
  <div v-if="chatOpen" class="col-12 chat-box animate__animated animate__fadeInUp">
    <div class="card rounded-3 shadow border-0">
      <div class="card-header border-0 bg-c-primary text-white d-flex justify-content-between">
        <div class="d-flex">
          <img width="40" height="40" class="rounded-pill" :src="BOT_LOGO" :alt="BOT_NAME" />
          <div class="ms-3">
            <h6 class="mb-0">{{ BOT_NAME }}</h6>
            <p class="mb-0">{{ BOT_ABOUT }}</p>
          </div>
        </div>
        <button
          v-if="messages.length"
          @click="clearMessages"
          class="btn text-white border-0 animate__animated animate__zoomIn"
          title="Clear messages"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <div class="card-body chat-body d-flex flex-column-reverse">
        <div v-if="loading" class="row my-2 align-items-start">
          <div class="col-auto d-flex align-items-start gap-2">
            <div>
              <img width="32" height="32" class="rounded-pill" :src="BOT_LOGO" :alt="BOT_NAME" />
            </div>
            <div
              class="rounded-3 shadow-sm mb-2 py-2 px-3 d-flex align-items-start justify-content-between gap-2 bg-light"
            >
              <div>
                <div class="loader"></div>
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
                :src="BOT_LOGO"
                :alt="BOT_NAME"
              />
            </div>
            <div
              class="rounded-3 shadow-sm mb-2 py-2 px-3 d-flex align-items-start justify-content-between gap-2"
              :class="item.type === 'user' ? 'bg-c-primary text-white' : 'bg-light text-dark'"
            >
              <div>
                <p class="m-0">{{ item.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer border-0 py-3">
        <form @submit.prevent="sendMessage" method="post">
          <textarea
            v-model="message"
            @keyup.enter.prevent="sendMessage"
            class="form-control textarea"
            type="text"
            name="message"
            id="message"
            :placeholder="`Chat with ${BOT_NAME}`"
          ></textarea>
          <div v-if="message.length >= 2" class="send-btn-box">
            <button type="submit" class="btn btn-primary border-0 bg-c-primary send-btn text-white">
              <i class="fa-solid fa-paper-plane animate__animated animate__bounceIn"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="chat-btn animate__animated animate__shakeY">
    <button
      @click="openChatBox"
      class="btn btn-primary border-0 bg-c-primary chat-btn-style text-white shadow"
    >
      <i v-if="!chatOpen" class="fa-solid fa-comment-dots animate__animated animate__bounceIn"></i>
      <i v-else class="fa-solid fa-times animate__animated animate__bounceIn"></i>
    </button>
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

.chat-body {
  height: 430px;
  overflow-y: scroll;
}

.chat-box {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 360px;
  z-index: 99999;
}
.chat-btn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 99999;
}

.chat-btn-style {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border-radius: 50%;
  height: 56px;
  position: absolute;
  right: 20px;
  bottom: 24px;
  width: 56px;
  transition: 0.3s;
}
.chat-btn-style:hover {
  background-color: #205c91;
}

.textarea {
  display: flex;
  flex-direction: row;
  height: auto;
  height: 42px;
  line-height: 1.5;
  padding: 8px 12px;
  resize: none;
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

.loader {
  width: 30px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #205c91 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  20% {
    background-position:
      0% 0%,
      50% 50%,
      100% 50%;
  }
  40% {
    background-position:
      0% 100%,
      50% 0%,
      100% 50%;
  }
  60% {
    background-position:
      0% 50%,
      50% 100%,
      100% 0%;
  }
  80% {
    background-position:
      0% 50%,
      50% 50%,
      100% 100%;
  }
}

@media screen and (max-width: 425px) {
  .chat-body {
    height: 380px;
  }

  .chat-box {
    bottom: 80px;
    right: 10px;
    width: 355px;
  }

  .chat-btn {
    bottom: -10px;
    right: -10px;
  }
}

@media screen and (max-width: 375px) {
  .chat-body {
    height: 380px;
  }

  .chat-box {
    bottom: 80px;
    right: 0;
    width: 100%;
  }

  .chat-btn {
    bottom: -10px;
    right: -10px;
  }
}
</style>
