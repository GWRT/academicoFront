<script setup>
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log(file.name);
    }
};

const triggerFileInput = () => {
    document.getElementById('profile_image').click();
};
</script>

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
                        <form v-on:submit="saveStudentsForm">
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
                                        id="profile_image" class="hidden" @change="handleFileChange"
                                        v-on:change="previewImage" />

                                    <img v-if="this.foto" :src="this.foto" id="fotoimg" alt="Profile Picture"
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

<script>
import { showAlert, sendResultResponse } from '@/components/Utils/funciones.js'

export default {
    data() {
        return {
            nombre: '',
            apellido: '',
            foto: '',
            url: `${import.meta.env.VITE_ACADEMICO_API_URL}/api/v1/estudiantes`,
            loading: false
        }
    },
    methods: {
        saveStudentsForm() {
            this.loading = true
            event.preventDefault();
            var myImage = document.getElementById('fotoimg');
            this.foto = myImage.src;

            if (this.nombre.trim() === '') {
                showAlert('Ingrese un nombre', 'warning', 'first_name');
            } else if (this.apellido.trim() === '') {
                showAlert('Ingrese un apellido', 'warning', 'last_name');
            } else {
                var params = {
                    nombre: this.nombre.trim(),
                    apellido: this.apellido.trim(),
                    foto: this.foto.trim()
                }

                sendResultResponse('POST', params, this.url, 'Estudiante registrado correctamente');
            }
        },
        previewImage(event) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                var image = document.getElementById('fotoimg');
                image.src = reader.result;
                this.foto = image.src;
            }
        },
    },
}

</script>