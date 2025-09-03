<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">加密解密工具</h1>
      <p class="text-muted-foreground">支持多种加密算法，保护您的敏感数据</p>
    </div>

    <div class="space-y-4">
      <!-- 加密类型选择 -->
      <div class="flex space-x-4">
        <button
          v-for="type in encryptionTypes"
          :key="type.value"
          @click="currentType = type.value"
          class="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          :class="{
            'bg-primary text-primary-foreground': currentType === type.value,
            'bg-background': currentType !== type.value
          }"
        >
          {{ type.label }}
        </button>
      </div>

      <!-- 输入区域 -->
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">输入文本</label>
            <textarea
              v-model="inputText"
              rows="8"
              placeholder="输入要处理的文本"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <!-- AES/RSA 密钥输入 -->
          <div v-if="['aes', 'rsa'].includes(currentType)" class="space-y-2">
            <label class="text-sm font-medium">密钥</label>
            <input
              v-model="key"
              type="text"
              :placeholder="currentType === 'aes' ? '输入AES密钥' : '输入RSA公钥/私钥'"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <!-- 操作按钮 -->
          <div class="flex space-x-4">
            <button
              @click="encrypt"
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              加密
            </button>
            <button
              @click="decrypt"
              class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              解密
            </button>
          </div>
        </div>

        <!-- 输出区域 -->
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">输出结果</label>
            <div class="relative">
              <textarea
                v-model="outputText"
                rows="8"
                readonly
                class="w-full rounded-md border bg-muted px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                v-if="outputText"
                @click="copyToClipboard"
                class="absolute right-2 top-2 rounded-md bg-primary/10 p-2 text-primary hover:bg-primary/20"
              >
                <ClipboardIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- 错误提示 -->
          <div
            v-if="error"
            class="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
          >
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ClipboardIcon } from '@heroicons/vue/outline'
import CryptoJS from 'crypto-js'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const encryptionTypes = [
  { label: 'Base64', value: 'base64' },
  { label: 'MD5', value: 'md5' },
  { label: 'AES', value: 'aes' },
  { label: 'RSA', value: 'rsa' }
]

const currentType = ref('base64')
const inputText = ref('')
const outputText = ref('')
const key = ref('')
const error = ref('')

// 加密操作
const encrypt = () => {
  error.value = ''
  if (!inputText.value) {
    error.value = '请输入要加密的文本'
    return
  }

  try {
    switch (currentType.value) {
      case 'base64':
        outputText.value = btoa(inputText.value)
        break
      case 'md5':
        outputText.value = CryptoJS.MD5(inputText.value).toString()
        break
      case 'aes':
        if (!key.value) {
          error.value = '请输入AES密钥'
          return
        }
        outputText.value = CryptoJS.AES.encrypt(inputText.value, key.value).toString()
        break
      case 'rsa':
        error.value = 'RSA加密功能正在开发中'
        break
    }

    store.addRecentInput(inputText.value)
  } catch (e) {
    error.value = '加密过程中出现错误：' + e.message
  }
}

// 解密操作
const decrypt = () => {
  error.value = ''
  if (!inputText.value) {
    error.value = '请输入要解密的文本'
    return
  }

  try {
    switch (currentType.value) {
      case 'base64':
        outputText.value = atob(inputText.value)
        break
      case 'md5':
        error.value = 'MD5是单向加密，无法解密'
        break
      case 'aes':
        if (!key.value) {
          error.value = '请输入AES密钥'
          return
        }
        const bytes = CryptoJS.AES.decrypt(inputText.value, key.value)
        outputText.value = bytes.toString(CryptoJS.enc.Utf8)
        break
      case 'rsa':
        error.value = 'RSA解密功能正在开发中'
        break
    }
  } catch (e) {
    error.value = '解密过程中出现错误：' + e.message
  }
}

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value)
  } catch (e) {
    error.value = '复制失败：' + e.message
  }
}
</script>