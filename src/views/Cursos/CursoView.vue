<template>
    <div class="flex items-center justify-center w-full p-6 bg-quinary text-neutral">
        <div class="container max-w-screen-lg mx-auto">
            <div class="p-4 px-4 mb-6 rounded shadow-lg bg-tertiary md:p-8">
                <div class="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                    <div class="text-neutral">
                        <div class="mb-5">
                            <router-link :to="{ path: '/cursos' }" class="">
                                <i class="fa-solid fa-arrow-left "></i>
                                <span class="ml-2 font-medium underline">Regresar a la lista</span>
                            </router-link>
                        </div>
                        <p class="text-lg font-medium">Informacion del curso</p>
                    </div>

                    <div class="mt-10 lg:col-span-2">
                        
                        <div class="grid grid-cols-1 gap-3 text-sm gap-y-1 md:grid-cols-1">
                            <div class="md:col-span-1">
                                <label for="course_name" class="font-semibold">Nombre del curso</label>
                                <input type="text" name="course_name" id="course_name" v-model="nombre"
                                    class="w-full h-10 px-4 mt-1 text-black border rounded" readonly maxlength="50" />

                                <label for="cursos" class="font-semibold">Apellido</label>
                                <input type="text" name="cursos" id="cursos" v-model="horas"
                                    class="w-full h-10 px-4 mt-1 text-black border rounded" readonly />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const nombre = ref('');
const horas = ref('');
const loading = ref(false);
const route = useRoute();
const url = ref(`${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/cursos/${route.params.id}`);

const getCourses = async () => {
    try {
        const response = await axios.get(url.value);

        nombre.value = response.data.data.nombre;
        horas.value = response.data.data.horas;

    } catch (error) {
        console.error("Error fetching student data:", error);
    }
};

onMounted(() => {
    getCourses();
});

watch(() => route.params.id, () => {
    url.value = `${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/cursos/${route.params.id}`;
    getCourses();
});
</script>
