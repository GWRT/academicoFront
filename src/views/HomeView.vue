<template>
  <div class="relative flex justify-center w-full py-5 overflow-x-auto shadow-md item-center bg-quinary">
    <table class="table-auto w-full md:w-0.5 text-sm text-left rtl:text-right rounded-lg overflow-auto">
      <thead class="text-xs uppercase text-neutral bg-quinary">
        <tr>
          <th scope="col" class="text-center">
            #
          </th>
          <th scope="col" class="text-center">
            ID
          </th>
          <th scope="col" class="px-4 py-3">
            FOTO
          </th>
          <th scope="col" class="px-8 py-3">
            ESTUDIANTE
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
        <tr v-else v-for="est, i in this.students" :key="est.id"
          class="border-b min-h-5 bg-tertiary hover:bg-secondary/70 text-neutral">

          <td v-text="i + 1" class="w-2 p-4 text-center"></td>

          <td v-text="est.id" class="w-4 p-4 text-center"></td>

          <td class="">
            <div class="flex justify-center p-0">
              <img v-if="est.foto" alt="foto" :src="est.foto" class="w-10 h-10 rounded-full">
              <img v-else src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-256.png"
                class="w-10 h-10 rounded-full">
            </div>
          </td>

          <th scope="row" class="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <div>
              <div class="text-base font-semibold" v-text="`${est.nombre}`"></div>
              <div class="font-normal text-gray-400" v-text="`${est.apellido}`"></div>
            </div>
          </th>

          <!-- <td v-text="`${est.nombre}, ${est.apellido}`" class="px-6 py-4"></td> -->
          <td v-text="new Date(est.created_at).toLocaleDateString('en-US')" class="px-6 py-4"></td>

          <td class="flex px-6 py-4">
            <div class="flex items-center justify-center mx-2">
              <router-link :to="{ path: 'estudianteView/' + est.id }">
                <i class="text-green-600 fa-solid fa-eye dark:text-green-500"></i>
              </router-link>
            </div>
            <div class="flex items-center justify-center mx-2">
              <router-link :to="{ path: 'estudianteEdit/' + est.id }">
                <i class="text-blue-600 fa-solid fa-pencil dark:text-blue-500"></i>
              </router-link>
            </div>
            <div class="flex items-center justify-center mx-2">
              <button v-on:click="$event => deleteStudent(est.id, est.nombre)">
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
      students: null,
      loading: true
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      this.loading = true
      axios.get(`${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/estudiantes`)
        .then(response => {
          this.students = response.data
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteStudent(id, nombre) {
      showConfirmAlert(
        `${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/estudiantes`,
        id,
        'Eliminar Registro',
        `¿Está seguro de eliminar el registro de ${nombre}?`
      )
      this.loading = false;
    },
  },
}
</script>