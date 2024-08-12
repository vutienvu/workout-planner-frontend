<template>
  <v-card :title="props.exerciseName" hover class="mt-8" elevation="2"></v-card>
</template>

<script setup lang="ts">
interface ExerciseProps {
  exerciseName: string,
  isFetching: boolean
}

const props = defineProps<ExerciseProps>();


</script>

<style scoped>

</style>