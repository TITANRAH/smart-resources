import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import CustomLayout from '../views/custom/CustomLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
     path: '/custom',
     name: 'custom',
     component: CustomLayout,
     children: [
      {
        path: 'seeder',
        name: 'seeder',
        component:()=>  import('../views/custom/SeederView.vue')
      }
     ]
    },
  
  ]
})

export default router
