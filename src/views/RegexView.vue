<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">正则测试器</h1>
      <p class="text-muted-foreground">实时测试和验证正则表达式，支持多种匹配模式</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">正则表达式</label>
          <div class="flex space-x-2">
            <input
              v-model="regex"
              type="text"
              placeholder="输入正则表达式"
              class="flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div class="flex space-x-4">
            <label class="flex items-center space-x-2">
              <input
                v-model="flags.global"
                type="checkbox"
                class="h-4 w-4 rounded border-primary"
              />
              <span class="text-sm">全局匹配 (g)</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                v-model="flags.ignoreCase"
                type="checkbox"
                class="h-4 w-4 rounded border-primary"
              />
              <span class="text-sm">忽略大小写 (i)</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                v-model="flags.multiline"
                type="checkbox"
                class="h-4 w-4 rounded border-primary"
              />
              <span class="text-sm">多行匹配 (m)</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">测试文本</label>
          <textarea
            v-model="text"
            rows="10"
            placeholder="输入要测试的文本"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <!-- 结果区域 -->
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold">匹配结果</h3>
          <div
            class="min-h-[200px] rounded-md border bg-card p-4 font-mono text-sm"
            v-html="highlightedText"
          />
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-semibold">匹配详情</h3>
          <div class="rounded-md border bg-card p-4">
            <div v-if="matches.length" class="space-y-2">
              <p>共找到 {{ matches.length }} 个匹配：</p>
              <ul class="list-inside list-disc space-y-1">
                <li v-for="(match, index) in matches" :key="index">
                  <span class="font-mono text-primary">{{ match[0] }}</span>
                  <span class="text-sm text-muted-foreground">
                    (位置: {{ match.index }})
                  </span>
                </li>
              </ul>
            </div>
            <p v-else class="text-muted-foreground">未找到匹配项</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'

const store = useAppStore()

const regex = ref('')
const text = ref('')
const flags = ref({
  global: true,
  ignoreCase: false,
  multiline: false
})

// 计算正则表达式标志
const computedFlags = computed(() => {
  let result = ''
  if (flags.value.global) result += 'g'
  if (flags.value.ignoreCase) result += 'i'
  if (flags.value.multiline) result += 'm'
  return result
})

// 计算匹配结果
const matches = computed(() => {
  if (!regex.value || !text.value) return []
  try {
    const re = new RegExp(regex.value, computedFlags.value)
    const results = []
    let match
    if (flags.value.global) {
      while ((match = re.exec(text.value)) !== null) {
        results.push(match)
      }
    } else {
      match = re.exec(text.value)
      if (match) results.push(match)
    }
    return results
  } catch (e) {
    return []
  }
})

// 高亮显示匹配文本
const highlightedText = computed(() => {
  if (!regex.value || !text.value) return text.value
  try {
    const re = new RegExp(regex.value, computedFlags.value)
    return text.value.replace(re, '<span class="bg-primary/20 text-primary">$&</span>')
  } catch (e) {
    return text.value
  }
})

// 保存最近输入
const saveRecentInput = () => {
  if (text.value) {
    store.addRecentInput(text.value)
  }
}
</script>