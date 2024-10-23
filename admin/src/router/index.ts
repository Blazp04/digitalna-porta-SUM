import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginView.vue'
import DashbordView from '../views/DashbordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashbord',
      // component: () => import('../views/DashbordView.vue')
      component: DashbordView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
  ]
})

export default router
