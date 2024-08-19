<template>
    <div class="flex items-center justify-center w-full p-6 bg-quinary text-neutral">
        <div class="container max-w-screen-lg mx-auto">
            <div class="p-4 px-4 mb-6 rounded shadow-lg bg-tertiary md:p-8">
                <div class="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                    <div class="text-neutral">
                        <div class="mb-5">
                            <router-link :to="{ path: '/' }" class="">
                                <i class="fa-solid fa-arrow-left "></i>
                                <span class="ml-2 font-medium underline">Regresar a la lista</span>
                            </router-link>
                        </div>
                        <p class="text-lg font-medium">Informacion del estudiante</p>
                    </div>

                    <div class="mt-10 lg:col-span-2">
                        <div class="grid grid-cols-1 gap-3 text-sm gap-y-1 md:grid-cols-2">
                            <div class="md:col-span-1">
                                <label for="first_name" class="font-semibold">Nombre</label>
                                <input type="text" name="first_name" id="first_name" v-model="nombre"
                                    class="w-full h-10 px-4 mt-1 text-black border rounded" readonly maxlength="50" />

                                <label for="last_name" class="font-semibold">Apellido</label>
                                <input type="text" name="last_name" id="last_name" v-model="apellido"
                                    class="w-full h-10 px-4 mt-1 text-black border rounded" readonly />
                            </div>

                            <div class="flex flex-col items-center overflow-hidden md:col-span-1 md:row-span-10">
                                <label for="profile_image" class="mt-3 font-semibold md:mt-0">Foto de perfil</label>
                                <img v-if="foto" :src="foto" id="fotoimg" alt="Profile Picture"
                                    class="w-32 h-32 my-2 rounded-full">
                                <img v-else
                                    src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-256.png"
                                    id="fotoimg" class="w-32 h-32 my-2 rounded-full">
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
const apellido = ref('');
const foto = ref('');
const loading = ref(false);
const route = useRoute();
const url = ref(`${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/estudiantes/${route.params.id}`);

const getStudent = async () => {
    try {
        const response = await axios.get(url.value);

        nombre.value = response.data.data.nombre;
        apellido.value = response.data.data.apellido;
        foto.value = response.data.data.foto;

    } catch (error) {
        console.error("Error fetching student data:", error);
    }
};

onMounted(() => {
    getStudent();
});

watch(() => route.params.id, () => {
    url.value = `${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/estudiantes/${route.params.id}`;
    getStudent();
});
</script>
