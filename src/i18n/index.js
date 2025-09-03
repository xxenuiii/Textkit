import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'
import ja from './locales/ja.json'

const messages = {
  zh,
  en,
  ja
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'zh',
  messages
})

export default i18n
