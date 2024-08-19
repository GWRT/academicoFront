<template>
    <!-- component -->
    <div class="flex items-center justify-center w-full p-6 bg-quinary text-neutral">
        <div class="container max-w-screen-lg mx-auto">
            <div class="p-4 px-8 shadow-lg bg-tertiary rounded-xl md:pt-8">
                <div class="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">

                    <div class="mb-5">
                        <p class="text-lg font-bold ">Crear nuevo estudiante</p>
                        <p>Porfavor llene todos los campos.</p>
                    </div>

                    <div class="lg:col-span-2">
                        <form @submit="saveStudentsForm">
                            <div class="grid grid-cols-1 gap-3 text-sm gap-y-1 md:grid-cols-2">

                                <div class="md:col-span-1">
                                    <label for="first_name" class="font-semibold">Nombre</label>
                                    <input type="text" name="fisrt_name" id="first_name" v-model="nombre"
                                        class="w-full h-10 px-4 mt-1 mb-5 text-black border rounded" value="" required
                                        maxlength="50" />

                                    <label for="last_name" class="font-semibold">Apellido</label>
                                    <input type="text" name="last_name" id="last_name" v-model="apellido"
                                        class="w-full h-10 px-4 mt-1 text-black border rounded" value="" required />
                                </div>

                                <div class="flex flex-col items-center overflow-hidden md:col-span-1 md:row-span-10">
                                    <label for="profile_image" class="mt-3 font-semibold md:mt-0">Foto de perfil</label>
                                    <input type="file" accept="image/png, image/jpg, image/jpeg" name="profile_image"
                                        id="profile_image" class="hidden" @change="previewImage" />

                                    <img v-if="foto" :src="foto" id="fotoimg" alt="Profile Picture"
                                        class="w-32 h-32 my-2 rounded-full">
                                    <img v-else
                                        src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-256.png"
                                        id="fotoimg" class="w-32 h-32 my-2 rounded-full">

                                    <button type="button" @click="triggerFileInput"
                                        class="flex items-center justify-center p-2 rounded bg-secondary hover:bg-black/50">
                                        <i class="fas fa-upload"></i>
                                    </button>
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
import { ref } from 'vue';
import { showAlert, sendResultResponse } from '@/components/Utils/funciones.js'

const nombre = ref('');
const apellido = ref('');
const foto = ref('');
const url = `${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/estudiantes`;
const loading = ref(false);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log(file.name);
    }
};

const triggerFileInput = () => {
    document.getElementById('profile_image').click();
};

const previewImage = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
        foto.value = reader.result;
    }
};

const saveStudentsForm = (event) => {
    this.loading = true
    event.preventDefault();

    if (nombre.value.trim() === '') {
        showAlert('Ingrese un nombre', 'warning', 'first_name');
    } else if (apellido.value.trim() === '') {
        showAlert('Ingrese un apellido', 'warning', 'last_name');
    } else {
        const params = {
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            foto: foto.value.trim()
        }

        sendResultResponse('POST', params, url, 'Estudiante registrado correctamente');
    }
};

</script>