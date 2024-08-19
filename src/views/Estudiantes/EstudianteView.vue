<template>
    <div class="w-full p-6 bg-quinary flex items-center justify-center text-neutral">
        <div class="container max-w-screen-lg mx-auto">
            <div class="bg-tertiary rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="text-neutral">
                        <div class="mb-5">
                            <router-link :to="{ path: '/' }" class="">
                                <i class="fa-solid fa-arrow-left "></i>
                                <span class="ml-2 font-medium underline">Regresar a la lista</span>
                            </router-link>
                        </div>
                        <p class="font-medium text-lg">Informacion del estudiante</p>
                    </div>

                    <div class="lg:col-span-2 mt-10">
                        <div class="grid gap-3 gap-y-1 text-sm grid-cols-1 md:grid-cols-2">
                            <div class="md:col-span-1">
                                <label for="first_name" class="font-semibold">Nombre</label>
                                <input type="text" name="first_name" id="first_name" v-model="nombre"
                                    class="h-10 border mt-1 rounded px-4 w-full text-black" readonly maxlength="50" />

                                <label for="last_name" class="font-semibold">Apellido</label>
                                <input type="text" name="last_name" id="last_name" v-model="apellido"
                                    class="h-10 border mt-1 rounded px-4 w-full text-black" readonly />
                            </div>

                            <div class="flex flex-col md:col-span-1 items-center md:row-span-10 overflow-hidden">
                                <label for="profile_image" class="font-semibold mt-3 md:mt-0">Foto de perfil</label>
                                <img v-if="foto" :src="foto" id="fotoimg" alt="Profile Picture"
                                    class="w-32 h-32 rounded-full my-2">
                                <img v-else
                                    src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-256.png"
                                    id="fotoimg" class="w-32 h-32 rounded-full my-2">
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
const url = ref(`http://academicobackend.test/api/v1/estudiantes/${route.params.id}`);

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
    url.value = `http://academicobackend.test/api/v1/estudiantes/${route.params.id}`;
    getStudent();
});
</script>
