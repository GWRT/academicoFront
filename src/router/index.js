import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteEdit from '@/views/Estudiantes/EstudianteEdit.vue'
import EstudianteNew from '@/views/Estudiantes/EstudianteNew.vue'
import EstudianteView from '@/views/Estudiantes/EstudianteView.vue'

import CursosTable from '@/views/CursosTable.vue'
import CursoEdit from '@/views/Cursos/CursoEdit.vue'
import CursoNew from '@/views/Cursos/CursoNew.vue'
import CursoView from '@/views/Cursos/CursoView.vue'

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
    {
      path: '/cursos',
      name: 'curs',
      component: CursosTable
    },
    {
      path: '/cursoEdit/:id',
      name: 'cursEdit',
      component: CursoEdit
    },
    {
      path: '/cursoNew',
      name: 'cursNew',
      component: CursoNew
    },
    {
      path: '/cursoView/:id',
      name: 'cursView',
      component: CursoView
    },
  ]
})

export default router
