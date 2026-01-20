import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
