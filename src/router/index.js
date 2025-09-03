import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/regex',
      name: 'regex',
      component: () => import('../views/RegexView.vue')
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: () => import('../views/CryptoView.vue')
    },
    {
      path: '/uuid',
      name: 'uuid',
      component: () => import('../views/UuidView.vue')
    },
    {
      path: '/word-count',
      name: 'word-count',
      component: () => import('../views/WordCountView.vue')
    },
    {
      path: '/case-convert',
      name: 'case-convert',
      component: () => import('../views/CaseConvertView.vue')
    }
  ]
})

export default router