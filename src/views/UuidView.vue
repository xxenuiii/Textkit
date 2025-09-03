<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">UUID / 随机密码生成器</h1>
      <p class="text-muted-foreground">生成 UUID 或自定义随机密码</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- UUID 生成器 -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">UUID 生成器</h2>
        <div class="space-y-4 rounded-lg border bg-card p-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">生成数量</label>
            <input
              v-model.number="uuidCount"
              type="number"
              min="1"
              max="100"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="flex space-x-4">
            <button
              @click="generateUuids"
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              生成 UUID
            </button>
            <button
              v-if="uuids.length"
              @click="copyUuids"
              class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              复制全部
            </button>
          </div>

          <div v-if="uuids.length" class="space-y-2">
            <div
              v-for="(uuid, index) in uuids"
              :key="index"
              class="flex items-center justify-between rounded-md border bg-background p-2 font-mono text-sm"
            >
              <span>{{ uuid }}</span>
              <button
                @click="copyText(uuid)"
                class="rounded-md p-1 hover:bg-accent hover:text-accent-foreground"
              >
                <ClipboardIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 随机密码生成器 -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">随机密码生成器</h2>
        <div class="space-y-4 rounded-lg border bg-card p-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">密码长度</label>
            <input
              v-model.number="passwordLength"
              type="number"
              min="4"
              max="64"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">字符类型</label>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex items-center space-x-2">
                <input
                  v-model="passwordOptions.uppercase"
                  type="checkbox"
                  class="h-4 w-4 rounded border-primary"
                />
                <span class="text-sm">大写字母</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  v-model="passwordOptions.lowercase"
                  type="checkbox"
                  class="h-4 w-4 rounded border-primary"
                />
                <span class="text-sm">小写字母</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  v-model="passwordOptions.numbers"
                  type="checkbox"
                  class="h-4 w-4 rounded border-primary"
                />
                <span class="text-sm">数字</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  v-model="passwordOptions.special"
                  type="checkbox"
                  class="h-4 w-4 rounded border-primary"
                />
                <span class="text-sm">特殊字符</span>
              </label>
            </div>
          </div>

          <div class="flex space-x-4">
            <button
              @click="generatePassword"
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              生成密码
            </button>
            <button
              v-if="password"
              @click="copyText(password)"
              class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              复制密码
            </button>
          </div>

          <div v-if="password" class="rounded-md border bg-background p-3 font-mono text-lg">
            {{ password }}
          </div>
        </div>
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
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { ClipboardIcon } from '@heroicons/vue/outline'

// UUID 生成器
const uuidCount = ref(5)
const uuids = ref([])

const generateUuids = () => {
  error.value = ''
  uuids.value = Array(uuidCount.value)
    .fill(null)
    .map(() => uuidv4())
}

const copyUuids = async () => {
  try {
    await navigator.clipboard.writeText(uuids.value.join('\n'))
  } catch (e) {
    error.value = '复制失败：' + e.message
  }
}

// 随机密码生成器
const passwordLength = ref(16)
const password = ref('')
const error = ref('')

const passwordOptions = ref({
  uppercase: true,
  lowercase: true,
  numbers: true,
  special: false
})

const generatePassword = () => {
  error.value = ''

  // 验证选项
  if (!Object.values(passwordOptions.value).some(Boolean)) {
    error.value = '请至少选择一种字符类型'
    return
  }

  // 字符集
  const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  }

  // 构建可用字符集
  let availableChars = ''
  Object.entries(passwordOptions.value).forEach(([key, value]) => {
    if (value) availableChars += chars[key]
  })

  // 生成密码
  let result = ''
  for (let i = 0; i < passwordLength.value; i++) {
    result += availableChars.charAt(Math.floor(Math.random() * availableChars.length))
  }

  password.value = result
}

// 复制文本
const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (e) {
    error.value = '复制失败：' + e.message
  }
}
</script>