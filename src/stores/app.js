import { defineStore } from 'pinia'
import i18n from '../i18n'

export const useAppStore = defineStore('app', {
  state: () => ({
    darkMode: false,
    sidebarOpen: true,
    currentTool: null,
    recentInputs: [],
    favorites: [],
    locale: localStorage.getItem('locale') || 'zh'
  }),
  
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle('dark', this.darkMode)
    },
    
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    
    setCurrentTool(tool) {
      this.currentTool = tool
    },
    
    addRecentInput(input) {
      if (!this.recentInputs.includes(input)) {
        this.recentInputs.unshift(input)
        if (this.recentInputs.length > 10) {
          this.recentInputs.pop()
        }
      }
    },
    
    toggleFavorite(toolName) {
      const index = this.favorites.indexOf(toolName)
      if (index === -1) {
        this.favorites.push(toolName)
      } else {
        this.favorites.splice(index, 1)
      }
    },
    
    setLocale(locale) {
      this.locale = locale
      i18n.global.locale.value = locale
      localStorage.setItem('locale', locale)
    }
  },
  
  persist: true
})