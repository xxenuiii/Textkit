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
            <span class="font-bold">{{ $t('app.title') }}</span>
          </router-link>
        </div>
        <div class="flex-1" />
        <div class="flex items-center space-x-2">
          <!-- 语言切换器 -->
          <select 
            :value="store.locale" 
            @change="store.setLocale($event.target.value)"
            class="rounded-md border bg-background px-2 py-1 text-sm"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
          <!-- 主题切换器 -->
          <button @click="store.toggleDarkMode()" class="ml-auto">
            <SunIcon v-if="store.darkMode" class="h-6 w-6" />
            <MoonIcon v-else class="h-6 w-6" />
          </button>
        </div>
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
            <span>{{ $t(route.nameKey) }}</span>
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
  { path: '/regex', nameKey: 'nav.regex', icon: TerminalIcon },
  { path: '/crypto', nameKey: 'nav.crypto', icon: KeyIcon },
  { path: '/uuid', nameKey: 'nav.uuid', icon: IdentificationIcon },
  { path: '/word-count', nameKey: 'nav.wordCount', icon: CalculatorIcon },
  { path: '/case-convert', nameKey: 'nav.caseConvert', icon: SwitchVerticalIcon },
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
