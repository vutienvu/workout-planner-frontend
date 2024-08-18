<template>
  <v-dialog v-model="isOpen" width="400">
    <v-card max-width="400" prepend-icon="mdi-pencil" title="Create your exercise">
      <v-text-field label="Exercise name" variant="underlined" class="px-6"></v-text-field>
      <v-text-field label="Pause duration" variant="underlined" class="px-6"></v-text-field>

      <template v-slot:actions>
        <v-btn class="ms-auto" text="Create" variant="elevated" color="primary"></v-btn>
        <v-btn text="Cancel" @click="isOpen = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  const isOpen = defineModel<boolean>('openModal', { required: true});
</script>

<style scoped>

</style>