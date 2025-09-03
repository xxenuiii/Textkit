<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">TextKit 文本工具集合</h1>
      <p class="text-muted-foreground">一站式文本处理解决方案，提供多种实用工具</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <router-link
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        class="group relative overflow-hidden rounded-lg border bg-card p-6 hover:border-primary"
      >
        <div class="flex items-center gap-4">
          <component :is="tool.icon" class="h-8 w-8 text-primary" />
          <div class="space-y-1">
            <h3 class="font-semibold">{{ tool.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ tool.description }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <div class="space-y-4">
      <h2 class="text-2xl font-semibold">特点</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="space-y-2 rounded-lg border bg-card p-4"
        >
          <component :is="feature.icon" class="h-6 w-6 text-primary" />
          <h3 class="font-semibold">{{ feature.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TerminalIcon, KeyIcon, IdentificationIcon, CalculatorIcon, SwitchVerticalIcon } from '@heroicons/vue/outline'
import { CloudIcon, LightningBoltIcon, DeviceMobileIcon } from '@heroicons/vue/outline'

const tools = [
  {
    path: '/regex',
    name: '正则测试器',
    description: '实时测试和验证正则表达式，支持多种匹配模式',
    icon: TerminalIcon
  },
  {
    path: '/crypto',
    name: '加密解密',
    description: '支持多种加密算法，保护您的敏感数据',
    icon: KeyIcon
  },
  {
    path: '/uuid',
    name: 'UUID生成器',
    description: '生成随机UUID和安全密码',
    icon: IdentificationIcon
  },
  {
    path: '/word-count',
    name: '文字计数',
    description: '统计文本字符数、字数和段落数',
    icon: CalculatorIcon
  },
  {
    path: '/case-convert',
    name: '大小写转换',
    description: '支持多种文本格式转换',
    icon: SwitchVerticalIcon
  }
]

const features = [
  {
    title: '纯前端实现',
    description: '无需后端服务器，所有操作在浏览器中完成',
    icon: CloudIcon
  },
  {
    title: '快速响应',
    description: '实时处理和预览，操作便捷',
    icon: LightningBoltIcon
  },
  {
    title: '响应式设计',
    description: '完美支持移动端和桌面端',
    icon: DeviceMobileIcon
  }
]
</script>