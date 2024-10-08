<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isNavbarOpen = ref(false);
const isDropdownOpen = ref(false);

const isDropdownOpenCursos = ref(false);

function toggleNavbar() {
    isNavbarOpen.value = !isNavbarOpen.value;
}

function toggleDropdown(event) {
    event.stopPropagation(); // Evita que el evento de clic se propague
    isDropdownOpen.value = !isDropdownOpen.value;
    closeDropdownCursos();
}

function toggleDropdownCursos(event) {
    event.stopPropagation(); // Evita que el evento de clic se propague
    isDropdownOpenCursos.value = !isDropdownOpenCursos.value;
    closeDropdown();
}

function closeDropdown() {
    isDropdownOpen.value = false;
}

function closeDropdownCursos() {
    isDropdownOpenCursos.value = false;
}

function handleClickOutside(event) {
    const dropdownElement = document.querySelector('.dropdown-menu');
    if (dropdownElement && !dropdownElement.contains(event.target)) {
        closeDropdown();
        closeDropdownCursos();
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>


<template>
    <nav class="relative flex items-center justify-between w-full py-2 shadow-md flex-nowrap bg-secondary lg:flex-wrap lg:justify-start lg:py-4">
        <div class="flex flex-wrap items-center justify-between w-full px-3">
            <button
                class="block px-2 bg-transparent border-0 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                @click="toggleNavbar" aria-controls="navbarSupportedContent13" aria-expanded="false" aria-label="Toggle navigation">
                <span class="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </button>

            <div :class="{ 'hidden': !isNavbarOpen, 'flex': isNavbarOpen }"
                class="mt-2 flex-grow basis-[100%] items-center lg:mt-0 lg:flex lg:basis-auto">
                <div class="hidden mr-6 uppercase ms-2 lg:block">
                    <a class="text-xl text-neutral hover:text-neutral/80" href="#">Gestion Academica</a>
                </div>
                <ul class="flex flex-col list-style-none me-auto ps-0 lg:mt-1 lg:flex-row">
                    <li class="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2">
                        <a class="text-neutral hover:text-neutral/80 lg:px-2" aria-current="page" href="#">Inicio</a>
                    </li>

                    <!-- dropdown of students -->
                    <li class="relative mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0">
                        <a class="flex items-center transition duration-200 cursor-pointer text-neutral hover:text-neutral/80 hover:ease-in-out focus:text-neutral active:text-black/80 motion-reduce:transition-none lg:px-2"
                            @click="toggleDropdown" aria-expanded="false">
                            Estudiantes
                            <span class="ms-1 [&>svg]:w-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </a>
                        <ul v-if="isDropdownOpen"
                            class="absolute z-10 mt-2 list-none border-none rounded-lg shadow-lg dropdown-menu min-w-max bg-primary dark:bg-neutral-800">
                            <li>
                                <router-link to="/"
                                    class="block w-full px-4 py-2 text-sm font-normal text-neutral hover:bg-secondary focus:bg-secondary/60 focus:outline-none active:bg-secondary/60">
                                    Listar Estudiantes
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/estudianteNew"
                                    class="block w-full px-4 py-2 text-sm font-normal text-neutral hover:bg-secondary focus:bg-secondary/60 focus:outline-none active:bg-secondary/60">
                                    Crear Estudiante
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    
                    <!-- dropdown of courses -->
                    <li class="relative mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0">
                        <a class="flex items-center transition duration-200 cursor-pointer text-neutral hover:text-neutral/80 hover:ease-in-out focus:text-neutral active:text-black/80 motion-reduce:transition-none lg:px-2"
                            @click="toggleDropdownCursos" aria-expanded="false">
                            Cursos                            <span class="ms-1 [&>svg]:w-5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </a>
                        <ul v-if="isDropdownOpenCursos"
                            class="absolute z-10 mt-2 list-none border-none rounded-lg shadow-lg dropdown-menu min-w-max bg-primary dark:bg-neutral-800">
                            <li>
                                <router-link to="/cursos"
                                    class="block w-full px-4 py-2 text-sm font-normal text-neutral hover:bg-secondary focus:bg-secondary/60 focus:outline-none active:bg-secondary/60">
                                    Listar Crusos
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/cursoNew"
                                    class="block w-full px-4 py-2 text-sm font-normal text-neutral hover:bg-secondary focus:bg-secondary/60 focus:outline-none active:bg-secondary/60">
                                    Crear Curso
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>