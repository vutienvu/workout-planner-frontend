<template>
  <v-card :title="exercise.name" hover class="mt-8" elevation="2" @click="handleOpen">
    <template v-slot:subtitle>
      <v-icon icon="mdi-timer" size="20"></v-icon>
      {{ exercise.pauseDuration + "s" }}
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-pencil" color="primary" size="small" class="mr-2" @click="(e: Event) => handleEdit(e)"></v-btn>
      <v-btn icon="mdi-delete" size="small" @click="(e: Event) => handleRemove(e)"></v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {deleteExercise, ExerciseResponse} from '../api/ExerciseAPI.ts'

interface Props {
  exercise: ExerciseResponse
}

const { exercise } = defineProps<Props>();

const exercises = defineModel<ExerciseResponse[]>('exercises', { required: true });

const isOpenEdit = ref<boolean>(false);

const handleOpen = () => {
  console.log("Open exercise!");
}

const handleEdit = (e: Event) => {
  e.stopPropagation();
  isOpenEdit.value = true;
}

const handleRemove = (e: Event) => {
  e.stopPropagation();

  deleteExercise(props.exerciseId)
      .then(() => {
        exercises.value = exercises.value.filter(e => e.exerciseId !== props.exerciseId);
      })
      .catch(error => {
        console.log(error);
      });
}

</script>

<style scoped>

</style>