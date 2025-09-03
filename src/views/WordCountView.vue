<template>
  <div class="space-y-6">
    <!-- 标题 -->
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">{{ $t('wordCount.title') }}</h1>
      <p class="text-muted-foreground">{{ $t('wordCount.subtitle') }}</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">{{ $t('wordCount.inputText') }}</label>
          <textarea
            v-model="text"
            rows="12"
            placeholder="在此输入或粘贴要统计的文本"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <button
            @click="clearText"
            class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
          >
            清空文本
          </button>

          <label class="flex items-center space-x-2">
            <input
              v-model="countOptions.ignoreWhitespace"
              type="checkbox"
              class="h-4 w-4 rounded border-primary"
            />
            <span class="text-sm">忽略空白字符</span>
          </label>

          <label class="flex items-center space-x-2">
            <input
              v-model="countOptions.countPunctuation"
              type="checkbox"
              class="h-4 w-4 rounded border-primary"
            />
            <span class="text-sm">计算标点符号</span>
          </label>
        </div>
      </div>

      <!-- 统计结果 -->
      <div class="space-y-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <!-- 字符统计 -->
          <div class="rounded-lg border bg-card p-4">
            <h3 class="text-sm font-medium text-muted-foreground">字符数</h3>
            <p class="mt-2 text-2xl font-bold">
              {{ stats.characters }}
              <span class="text-base font-normal text-muted-foreground">
                {{ countOptions.ignoreWhitespace ? '(不含空格)' : '(含空格)' }}
              </span>
            </p>
          </div>

          <!-- 单词统计 -->
          <div class="rounded-lg border bg-card p-4">
            <h3 class="text-sm font-medium text-muted-foreground">单词数</h3>
            <p class="mt-2 text-2xl font-bold">{{ stats.words }}</p>
          </div>

          <!-- 中文字数 -->
          <div class="rounded-lg border bg-card p-4">
            <h3 class="text-sm font-medium text-muted-foreground">中文字数</h3>
            <p class="mt-2 text-2xl font-bold">{{ stats.chineseChars }}</p>
          </div>

          <!-- 段落统计 -->
          <div class="rounded-lg border bg-card p-4">
            <h3 class="text-sm font-medium text-muted-foreground">段落数</h3>
            <p class="mt-2 text-2xl font-bold">{{ stats.paragraphs }}</p>
          </div>
        </div>

        <!-- 详细统计 -->
        <div class="rounded-lg border bg-card p-4">
          <h3 class="mb-4 font-medium">详细统计</h3>
          <div class="space-y-2 text-sm">
            <p><span class="text-muted-foreground">英文字母：</span>{{ stats.letters }}</p>
            <p><span class="text-muted-foreground">数字：</span>{{ stats.numbers }}</p>
            <p><span class="text-muted-foreground">标点符号：</span>{{ stats.punctuation }}</p>
            <p><span class="text-muted-foreground">空格：</span>{{ stats.spaces }}</p>
            <p><span class="text-muted-foreground">行数：</span>{{ stats.lines }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const text = ref('')
const countOptions = ref({
  ignoreWhitespace: false,
  countPunctuation: true
})

// 清空文本
const clearText = () => {
  text.value = ''
}

// 统计结果
const stats = computed(() => {
  const result = {
    characters: 0,
    words: 0,
    chineseChars: 0,
    paragraphs: 0,
    letters: 0,
    numbers: 0,
    punctuation: 0,
    spaces: 0,
    lines: 0
  }

  if (!text.value) return result
  const t = text.value

  // 字符数
  result.characters = countOptions.value.ignoreWhitespace ? t.replace(/\s/g, '').length : t.length

  // 单词数（英文按空格，中文连续字符算一个词）
  result.words = t.trim().split(/\s+/).filter(Boolean).length

  // 中文字符数
  result.chineseChars = (t.match(/[\u4e00-\u9fa5]/g) || []).length

  // 段落数（连续空行分割）
  result.paragraphs = t.split(/\n\s*\n/).filter(Boolean).length

  // 英文字母
  result.letters = (t.match(/[a-zA-Z]/g) || []).length

  // 数字
  result.numbers = (t.match(/\d/g) || []).length

  // 标点符号（可选）
  result.punctuation = countOptions.value.countPunctuation
    ? (t.match(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~·ˉ¨‘’“”、。，；：？！…—《》【】（）]/g) || []).length
    : 0

  // 空格数
  result.spaces = (t.match(/\s/g) || []).length

  // 行数
  result.lines = t.split(/\n/).length

  return result
})
</script>
