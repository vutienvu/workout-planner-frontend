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
        <v-text-field label="Exercise name" v-model="exerciseToBeUpdated.name" variant="underlined" :rules="Object.values(nameRules)" class="px-6"></v-text-field>
        <v-text-field @keyup.enter="handleReallyUpdateExercise" label="Exercise pause duration" v-model="exerciseToBeUpdated.pauseDuration" variant="underlined" suffix="s" :rules="Object.values(numberRules)"  class="px-6"></v-text-field>
      </form>
    </template>

    <template v-slot:actionButton>
      <v-btn class="ms-auto" variant="elevated" color="primary" :disabled="!isExerciseInputValid" @click="handleReallyUpdateExercise">
        Update
      </v-btn>
    </template>

    <template v-slot:snackbarText>
      <div class="text-center ma-2">
        <v-snackbar
            v-model="isUpdated"
            :timeout="2000"
            location="top"
            color="success"
            style="--v-layout-left: 0"
        >
          Successfuly updated exercise!
        </v-snackbar>
      </div>

      <div class="text-center ma-2">
        <v-snackbar
            v-model="isUpdatedError"
            :timeout="2000"
            location="top"
            color="success"
            style="--v-layout-left: 0"
        >
          Something went wrong!
        </v-snackbar>
      </div>
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

      <template v-slot:snackbarText>
        <div class="text-center ma-2">
          <v-snackbar
              v-model="isRemovedError"
              :timeout="2000"
              location="top"
              color="error"
              style="--v-layout-left: 0"
          >
            Something went wrong!
          </v-snackbar>
        </div>
      </template>
    </ActionModal>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {nameRules, numberRules} from '../helper/rules.ts'
import {deleteExercise, updateExercise, ExerciseResponse} from '../api/ExerciseAPI.ts'
import ActionModal from './ActionModal.vue'

const exercise = defineModel<ExerciseResponse>('exercise', { required: true });

const exercises = defineModel<ExerciseResponse[]>('exercises', { required: true });

const exerciseToBeUpdated = ref<ExerciseResponse>({
  ...exercise.value
});

const isUpdatingExercise = ref<boolean>(false);
const isUpdated = ref<boolean>(false);
const isUpdatedError = ref<boolean>(false);

const isRemovingExercise = ref<boolean>(false);
const isRemovedError = ref<boolean>(false);

watch(() => isUpdatingExercise.value, (newValue) => {
  if (newValue) {
    exerciseToBeUpdated.value = {
      ...exercise.value
    };
  }
});

const isExerciseInputValid = computed(() => {
  return !!exerciseToBeUpdated.value.name && exerciseToBeUpdated.value.pauseDuration > 0;
});

const handleReallyUpdateExercise = () => {
  if (!isExerciseInputValid.value) return;

  updateExercise(exerciseToBeUpdated.value.exerciseId, exerciseToBeUpdated.value)
      .then(() => {
        exercise.value = exerciseToBeUpdated.value;
        isUpdated.value = true
      })
      .catch(() => {
        isUpdatedError.value = true;
      })
      .finally(() => {
        isUpdatingExercise.value = false;
      });
}

const handleReallyRemoveExercise = () => {
  deleteExercise(exerciseToBeUpdated.value.exerciseId)
      .then(() => {
        exercises.value = exercises.value.filter(e => e.exerciseId !== exerciseToBeUpdated.value.exerciseId);
      })
      .catch(() => {
        isRemovedError.value = true;
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