<template>
    <div class="relative flex justify-center w-full py-5 overflow-x-auto shadow-md item-center bg-quinary">
      <table class="table-auto w-full md:w-0.5 text-sm text-left rounded-lg overflow-auto">
        <thead class="text-xs uppercase text-neutral bg-quinary">
          <tr>
            <th scope="col" class="text-center">
              #
            </th>
            <th scope="col" class="text-center">
              ID
            </th>
            <th scope="col" class="px-4 py-3">
              NOMBRE
            </th>
            <th scope="col" class="px-8 py-3">
              HORAS
            </th>
            <th scope="col" class="px-6 py-3">
              REGISTRO
            </th>
            <th scope="col" class="px-6 py-3 text-center">
              EDITAR
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="this.loading" class="h-8">
            <td colspan="5">
              <h1 class="text-black">Cargando...</h1>
            </td>
          </tr>
          <tr v-else v-for="course, i in this.courses" :key="course.id"
            class="border-b min-h-5 bg-tertiary hover:bg-secondary/70 text-neutral">
  
            <td v-text="i + 1" class="w-2 p-4 text-center"></td>
  
            <td v-text="course.id" class="w-4 p-4 text-center"></td>
  
            <td v-text="course.nombre" class="w-4 p-4 text-center"></td>
  
            <td v-text="course.horas" class="w-4 p-4 text-center"></td>
  
            <td v-text="new Date(course.created_at).toLocaleDateString('en-US')" class="px-6 py-4"></td>
  
            <td class="relative flex items-center justify-center px-6 py-4">
                <div class="flex items-center justify-center mx-2">
                    <router-link :to="{ path: 'cursoView/' + course.id }">
                      <i class="text-green-600 fa-solid fa-eye dark:text-green-500"></i>
                    </router-link>
                  </div>
                  <div class="flex items-center justify-center mx-2">
                    <router-link :to="{ path: 'cursoEdit/' + course.id }">
                      <i class="text-blue-600 fa-solid fa-pencil dark:text-blue-500"></i>
                    </router-link>
                  </div>
                  <div class="flex items-center justify-center mx-2">
                    <button v-on:click="$event => deleteCourse(course.id, course.nombre)">
                      <i class="text-red-600 fa-solid fa-trash dark:text-red-500"></i>
                    </button>
                  </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
  </template>
  
  <script>
  import axios from 'axios'
  import { showConfirmAlert } from '../components/Utils/funciones.js'
  
  export default {
    data() {
      return {
        courses: null,
        loading: true
      }
    },
    mounted() {
      this.getCourses()
    },
    methods: {
      getCourses() {
        this.loading = true
        axios.get(`${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/cursos`)
          .then(response => {
            this.courses = response.data
            this.loading = false
          })
          .catch(error => {
            console.log(error)
          })
      },
      deleteCourse(id, nombre) {
        showConfirmAlert(
          `${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/cursos/`,
          id,
          'Eliminar Registro',
          `¿Está seguro de eliminar el registro de ${nombre}?`
        )
        this.loading = false;
      },
    },
  }
  </script>