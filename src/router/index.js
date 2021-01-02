import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CommitHistory from '../views/CommitHistory.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/commit-history',
    name: 'Commit History',
    component: CommitHistory,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
