<template>
    <!-- component -->
    <div class="flex items-center justify-center w-full p-6 bg-quinary text-neutral">
        <div class="container max-w-screen-lg mx-auto">
            <div class="p-4 px-8 shadow-lg bg-tertiary rounded-xl md:pt-8">
                <div class="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">

                    <div class="mb-5">
                        <p class="text-lg font-bold ">Crear nuevo curso</p>
                        <p>Porfavor llene todos los campos.</p>
                    </div>

                    <div class="lg:col-span-2">
                        <form @submit.prevent="updateStudentsForm">
                            <div class="grid grid-cols-1 gap-3 text-sm gap-y-1 md:grid-cols-1">

                                <div class="md:col-span-1">
                                    <label for="course_name" class="font-semibold">Nombre del curso</label>
                                    <input type="text" name="course_name" id="course_name" v-model="nombre"
                                        class="w-full h-10 px-4 mt-1 mb-5 text-black border rounded" value="" required
                                        maxlength="50" />

                                    <label for="hours" class="font-semibold">Horas lectivas</label>
                                    <input type="text" name="hours" id="hours" v-model="horas"
                                        class="w-full h-10 px-4 mt-1 text-black border rounded" value="" required />
                                </div>
                                
                                <div class="mt-12 text-right">
                                    <div class="inline-flex items-end">
                                        <button
                                            class="px-4 py-2 font-bold text-white border rounded bg-secondary hover:bg-black/50 "
                                            type="submit">Registrar</button>
                                    </div>
                                </div>

                            </div>
                        </form>
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
import { showAlert, sendResultResponse } from '@/components/Utils/funciones.js';

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
        console.error("Error fetching courses data:", error);
    }
};

const updateStudentsForm = async () => {
    loading.value = true;
    const params = {
        nombre: nombre.value.trim(),
        horas: parseInt(horas.value, 10),
    };

    await sendResultResponse('PUT', params, url.value, 'Estudiante registrado correctamente');
    loading.value = false;
};

onMounted(() => {
    getCourses();
});

watch(() => route.params.id, () => {
    url.value = `${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/estudiantes/${route.params.id}`;
    getCourses();
});
</script>
