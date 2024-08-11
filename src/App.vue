<template>
  <v-app>
    <Sidebar />

    <main>
      <RouterView />
    </main>
  </v-app>
</template>

<script setup lang="ts">
  import Sidebar from "./app/components/Sidebar.vue"
</script>
