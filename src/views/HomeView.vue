<template>
  <div class="relative flex justify-center w-full py-5 overflow-x-auto shadow-md item-center bg-quinary">
    <table class="w-full md:w-0.5 text-sm text-left rtl:text-right rounded-lg overflow-auto">
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
        <tr v-if="this.loading">
          <td colspan="5">
            <h1 class="text-black">Cargando...</h1>
          </td>
        </tr>
        <tr v-else v-for="est, i in this.students" :key="est.id" class="border-b bg-tertiary hover:bg-secondary/70 text-neutral">

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
        <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            1
          </td>
          <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <img class="w-10 h-10 rounded-full" src="" alt="Jese image">
            <div class="ps-3">
              <div class="text-base font-semibold">Neil Sims</div>
              <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">
            React Developer
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
            </div>
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
          </td>
        </tr> -->
        <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
            2
          </td>
          <th scope="row"
            class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <img class="w-10 h-10 rounded-full" src="" alt="Jese image">
            <div class="ps-3">
              <div class="text-base font-semibold">Bonnie Green</div>
              <div class="font-normal text-gray-500">bonnie@flowbite.com</div>
            </div>
          </th>
          <td class="px-6 py-4">
            Designer
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
            </div>
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
          </td>
        </tr> -->
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
      axios.get('http://academicobackend.test/api/v1/estudiantes')
        .then(response => {
          this.students = response.data
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteStudent(id, nombre) {
      showConfirmAlert('http://academicobackend.test/api/v1/estudiantes/', id, 'Eliminar Registro', `¿Está seguro de eliminar el registro de ${nombre}?`)
      this.loading = false;
    },
  },
}
</script>