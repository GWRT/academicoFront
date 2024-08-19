<template>
    <!-- component -->
    <div class="w-full p-6 bg-quinary flex items-center justify-center text-neutral">
        <div class="container max-w-screen-lg mx-auto">
            <div class="bg-tertiary rounded-xl shadow-lg p-4 px-8 md:pt-8">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">

                    <div class="mb-5">
                        <p class="font-bold text-lg ">Crear nuevo estudiante</p>
                        <p>Porfavor llene todos los campos.</p>
                    </div>

                    <div class="lg:col-span-2">
                        <form @submit.prevent="updateStudentsForm">
                            <div class="grid gap-3 gap-y-1 text-sm grid-cols-1 md:grid-cols-2">

                                <div class="md:col-span-1">
                                    <label for="first_name" class="font-semibold">Nombre</label>
                                    <input type="text" name="first_name" id="first_name" v-model="nombre"
                                        class="h-10 border mt-1 rounded px-4 w-full mb-5 text-black" value="" required
                                        maxlength="50" />

                                    <label for="last_name" class="font-semibold">Apellido</label>
                                    <input type="text" name="last_name" id="last_name" v-model="apellido"
                                        class="h-10 border mt-1 rounded px-4 w-full text-black" value="" required />
                                </div>

                                <div class="flex flex-col md:col-span-1 items-center md:row-span-10 overflow-hidden">
                                    <label for="profile_image" class="font-semibold mt-3 md:mt-0">Foto de perfil</label>
                                    <input type="file" accept="image/png, image/jpg, image/jpeg" name="profile_image"
                                        id="profile_image" class="hidden" @change="handleFileChange"/>

                                    <img v-if="foto" :src="foto" id="fotoimg" alt="Profile Picture"
                                        class="w-32 h-32 rounded-full my-2">
                                    <img v-else
                                        src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-256.png"
                                        id="fotoimg" class="w-32 h-32 rounded-full my-2">

                                    <button type="button" @click="triggerFileInput"
                                        class="flex items-center justify-center rounded p-2 bg-secondary hover:bg-black/50">
                                        <i class="fas fa-upload"></i>
                                    </button>
                                </div>

                                <div class="text-right mt-12">
                                    <div class="inline-flex items-end">
                                        <button
                                            class="bg-secondary hover:bg-black/50 text-white font-bold py-2 px-4 border rounded "
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
const apellido = ref('');
const foto = ref('');
const loading = ref(false);
const route = useRoute();
const url = ref(`http://academicobackend.test/api/v1/estudiantes/${route.params.id}`);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            foto.value = reader.result;
        };
    }
};

const triggerFileInput = () => {
    document.getElementById('profile_image').click();
};

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

const updateStudentsForm = async () => {
    loading.value = true;
    const params = {
        nombre: nombre.value.trim(),
        apellido: apellido.value.trim(),
        foto: foto.value.trim()
    };

    await sendResultResponse('PUT', params, url.value, 'Estudiante registrado correctamente');
    loading.value = false;
};

onMounted(() => {
    getStudent();
});

watch(() => route.params.id, () => {
    url.value = `http://academicobackend.test/api/v1/estudiantes/${route.params.id}`;
    getStudent();
});
</script>
