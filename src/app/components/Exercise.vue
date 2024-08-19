<template>
  <v-card :title="props.name" hover class="mt-8" elevation="2" @click="handleOpen">
    <template v-slot:subtitle>
      <v-icon icon="mdi-timer" size="20"></v-icon>
      {{ props.pauseDuration + "s" }}
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-pencil" color="primary" size="small" class="mr-2" @click="(e: Event) => handleEdit(e)"></v-btn>
      <v-btn icon="mdi-delete" size="small" @click="(e: Event) => handleRemove(e)"></v-btn>
    </template>
  </v-card>

  <ExerciseModal
      :exercise-id="props.exerciseId"
      :exercise-name="props.name"
      :pause-duration="props.pauseDuration"
      :workout-id="props.workoutId"
      :create-type="false"
      v-model:exercises="exercises"
      v-model:open-modal="isOpenEdit"/>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import ExerciseModal from '../components/ExerciseModal.vue'
import {deleteExercise, ExerciseResponse} from '../api/ExerciseAPI.ts'

interface Props {
  exerciseId: number,
  name: string,
  pauseDuration: number,
  workoutId: number,
}

const props = defineProps<Props>();

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