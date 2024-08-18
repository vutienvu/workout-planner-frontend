<template>
  <v-card :title="props.name" hover class="mt-8" elevation="2">
    <template v-slot:subtitle>
      <v-icon icon="mdi-timer" size="20"></v-icon>
      {{ props.pauseDuration + "s" }}
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-pencil" color="primary" size="small" class="mr-2"></v-btn>
      <v-btn icon="mdi-delete" size="small"></v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  name: string,
  pauseDuration: number,
  isFetching: boolean
}

const props = defineProps<Props>();


</script>

<style scoped>

</style>