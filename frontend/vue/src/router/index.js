import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login'
import Profile from "@/views/Profile"

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
