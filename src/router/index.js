import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteEdit from '@/views/Estudiantes/EstudianteEdit.vue'
import EstudianteNew from '@/views/Estudiantes/EstudianteNew.vue'
import EstudianteView from '@/views/Estudiantes/EstudianteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/estudianteEdit/:id',
      name: 'estEdit',
      component: EstudianteEdit
    },
    {
      path: '/estudianteNew',
      name: 'estNew',
      component: EstudianteNew
    },
    {
      path: '/estudianteView/:id',
      name: 'estView',
      component: EstudianteView
    },
  ]
})

export default router
