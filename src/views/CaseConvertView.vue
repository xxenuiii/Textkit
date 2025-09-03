<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">大小写转换</h1>
      <p class="text-muted-foreground">支持多种文本格式转换</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">输入文本</label>
          <textarea
            v-model="inputText"
            rows="8"
            placeholder="输入要转换的文本"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <!-- 转换选项 -->
        <div class="grid gap-2 sm:grid-cols-2">
          <button
            v-for="option in convertOptions"
            :key="option.type"
            @click="convert(option.type)"
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- 输出区域 -->
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">转换结果</label>
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
</template>

<script setup>
import { ref } from 'vue'
import { ClipboardIcon } from '@heroicons/vue/outline'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const inputText = ref('')
const outputText = ref('')
const error = ref('')

const convertOptions = [
  { type: 'upper', label: '转换为大写' },
  { type: 'lower', label: '转换为小写' },
  { type: 'capitalize', label: '首字母大写' },
  { type: 'camelCase', label: '驼峰命名' },
  { type: 'snakeCase', label: '下划线命名' },
  { type: 'kebabCase', label: '中划线命名' }
]

// 转换函数
const convert = (type) => {
  error.value = ''
  if (!inputText.value) {
    error.value = '请输入要转换的文本'
    return
  }

  try {
    switch (type) {
      case 'upper':
        outputText.value = inputText.value.toUpperCase()
        break
      case 'lower':
        outputText.value = inputText.value.toLowerCase()
        break
      case 'capitalize':
        outputText.value = inputText.value
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        break
      case 'camelCase':
        outputText.value = inputText.value
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        break
      case 'snakeCase':
        outputText.value = inputText.value
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '_')
          .replace(/([A-Z])/g, '_$1')
          .toLowerCase()
          .replace(/^_/, '')
        break
      case 'kebabCase':
        outputText.value = inputText.value
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .replace(/^-/, '')
        break
    }

    store.addRecentInput(inputText.value)
  } catch (e) {
    error.value = '转换过程中出现错误：' + e.message
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