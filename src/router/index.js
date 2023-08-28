import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue'
import CustomLayout from '../views/custom/CustomLayout.vue'
import FigmaLayout from '../views/figmas/FigmaLayout.vue'

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
          component: () => import('../views/custom/SeederView.vue')
        },
        {
          path: '',
          name: 'custom-list',
          component: () => import('../views/custom/CustomView.vue')
        },
        {
          path: 'custom-pendientes',
          name: 'custom-pendientes',
          component: () => import('../views/custom/CustomPendientesView.vue')
        },
        {
          path: 'custom-realizadas',
          name: 'custom-realizadas',
          component: () => import('../views/custom/CustomRealizadasView.vue')
        },
      
      ]


    },
    {
      path: '/customizacion/:id',
      name: 'customizacion',
      component: () => import('../views/custom/SingleCustomView.vue')
    },
    {
      path: '/editar-custom/:id',
      name: 'edit-custom',
      component: () => import('../views/custom/EditCustomView.vue')
    },
    {
      path: '/figma',
      name: 'figma',
      component: FigmaLayout,
      children: [
        {
          path: '',
          name: 'figmas',
          component: () => import('../views/figmas/FigmasView.vue')
        }
      ]
    },
    {
      path: '/agregar-figma',
      name: 'agregar-figma',
      component: () => import('../views/figma-form/FigmaForm.vue')
    },
    {
      path: '/agregar-custom',
      name: 'agregar-custom',
      component: () => import('../views/custom-form/CustomForm.vue')
    }
 
  ]

})

export default router
