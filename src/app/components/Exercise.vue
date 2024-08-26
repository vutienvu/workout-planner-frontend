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
        <v-text-field label="Exercise name" v-model="newExercise.name" variant="underlined" class="px-6"></v-text-field>
        <v-text-field label="Exercise pause duration" v-model="newExercise.pauseDuration" variant="underlined" suffix="s" class="px-6"></v-text-field>
      </form>
    </template>

    <template v-slot:actionButton>
      <v-btn class="ms-auto" variant="elevated" color="primary" @click="handleReallyUpdateExercise">
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
      <v-btn class="ms-auto" variant="elevated" color="red" @click="handleReallyRemoveExercise">
        Delete
      </v-btn>
    </template>
  </ActionModal>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {deleteExercise, updateExercise, ExerciseResponse} from '../api/ExerciseAPI.ts'
import ActionModal from './ActionModal.vue'

const exercise = defineModel<ExerciseResponse>('exercise', { required: true });

const exercises = defineModel<ExerciseResponse[]>('exercises', { required: true });

const newExercise = ref<ExerciseResponse>({
  ...exercise.value
});

const isUpdatingExercise = ref<boolean>(false);
const isRemovingExercise = ref<boolean>(false);

const handleReallyUpdateExercise = () => {
  updateExercise(newExercise.value.exerciseId, newExercise.value)
      .then(() => {
        exercise.value = newExercise.value;
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        isUpdatingExercise.value = false;
      });
}

const handleReallyRemoveExercise = () => {
  deleteExercise(newExercise.value.exerciseId)
      .then(() => {
        exercises.value = exercises.value.filter(e => e.exerciseId !== newExercise.value.exerciseId);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        isRemovingExercise.value = false;
      });
}

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
}

</script>

<style scoped>

</style>