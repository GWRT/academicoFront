<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col h-screen font-nanum-gothic">
    <NavBar />
    <div class="flex felx-col w-full flex-grow overflow-auto ">
      <RouterView />
    </div>
  </div>

</template>
