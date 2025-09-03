<template>
  <div class="min-h-screen bg-background">
    <!-- 顶部导航栏 -->
    <nav class="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="flex h-14 items-center px-4">
        <div class="flex items-center space-x-4">
          <button @click="store.toggleSidebar()" class="lg:hidden">
            <MenuIcon class="h-6 w-6" />
          </button>
          <router-link to="/" class="flex items-center space-x-2">
            <span class="font-bold">TextKit</span>
          </router-link>
        </div>
        <div class="flex-1" />
        <button @click="store.toggleDarkMode()" class="ml-auto">
          <SunIcon v-if="store.darkMode" class="h-6 w-6" />
          <MoonIcon v-else class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <!-- 主体内容 -->
    <div class="flex">
      <!-- 侧边栏 -->
      <aside
        :class="[
          'fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 border-r bg-background transition-transform lg:translate-x-0',
          store.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <nav class="space-y-1 p-4">
          <router-link
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            :class="{ 'bg-accent': $route.path === route.path }"
          >
            <component :is="route.icon" class="h-5 w-5" />
            <span>{{ route.name }}</span>
          </router-link>
        </nav>
      </aside>

      <!-- 主内容区域 -->
      <main
        :class="[
          'flex-1 overflow-hidden px-4 py-20 lg:px-8',
          store.sidebarOpen ? 'lg:pl-72' : ''
        ]"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from './stores/app'
import { MenuIcon, SunIcon, MoonIcon, TerminalIcon, KeyIcon, IdentificationIcon, CalculatorIcon, SwitchVerticalIcon } from '@heroicons/vue/outline'

const store = useAppStore()

const routes = [
  { path: '/regex', name: '正则测试器', icon: TerminalIcon },
  { path: '/crypto', name: '加密解密', icon: KeyIcon },
  { path: '/uuid', name: 'UUID生成器', icon: IdentificationIcon },
  { path: '/word-count', name: '文字计数', icon: CalculatorIcon },
  { path: '/case-convert', name: '大小写转换', icon: SwitchVerticalIcon },
]
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
