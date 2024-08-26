<template>
  <v-card :title="exercise.name" hover class="mt-8" elevation="2" @click="handleOpen">
    <template v-slot:subtitle>
      <v-icon icon="mdi-timer" size="20"></v-icon>
      {{ exercise.pauseDuration + "s" }}
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-pencil" color="primary" size="small" class="mr-2" @click="(e: Event) => handleUpdateExercise(e)"></v-btn>
      <v-btn icon="mdi-delete" size="small" @click="(e: Event) => handleRemoveExercise(e)"></v-btn>
    </template>
  </v-card>

  <ActionModal v-model:open-modal="isUpdatingExercise">
  <template v-slot:header>
    <v-card-item prepend-icon="mdi-pencil">
      <v-card-title>Update your exercise!</v-card-title>
    </v-card-item>
  </template>

  <template v-slot:input>
    <form @submit.prevent>
      <v-text-field label="Exercise name" v-model="exercise.name" variant="underlined" class="px-6"></v-text-field>
      <v-text-field label="Exercise pause duration" v-model="exercise.pauseDuration" variant="underlined" suffix="s" class="px-6"></v-text-field>
    </form>
  </template>

  <template v-slot:actionButton>
    <v-btn class="ms-auto" variant="elevated" color="primary">
      Update
    </v-btn>
  </template>
</ActionModal>
  <ActionModal v-model:open-modal="isRemovingExercise">
    <template v-slot:header>
      <v-card-item prepend-icon="mdi-delete">
        <v-card-title>Delete your exercise!</v-card-title>
      </v-card-item>
    </template>

    <template v-slot:input>
      <v-card-text>
        Are you sure you want to remove this exercise?
      </v-card-text>
    </template>

    <template v-slot:actionButton>
      <v-btn class="ms-auto" variant="elevated" color="red">
        Delete
      </v-btn>
    </template>
  </ActionModal>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {deleteExercise, ExerciseResponse} from '../api/ExerciseAPI.ts'
import ActionModal from './ActionModal.vue'

interface Props {
  exercise: ExerciseResponse
}

const { exercise } = defineProps<Props>();

const exercises = defineModel<ExerciseResponse[]>('exercises', { required: true });

const isUpdatingExercise = ref<boolean>(false);
const isRemovingExercise = ref<boolean>(false);

const handleOpen = () => {
  console.log("Open exercise!");
}

const handleUpdateExercise = (e: Event) => {
  e.stopPropagation();
  isUpdatingExercise.value = true;
}

const handleRemoveExercise = (event: Event) => {
  event.stopPropagation();
  isRemovingExercise.value = true;

  // e.stopPropagation();
  //
  // deleteExercise(exercise.exerciseId)
  //     .then(() => {
  //       exercises.value = exercises.value.filter(e => e.exerciseId !== exercise.exerciseId);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
}

</script>

<style scoped>

</style>