<template xmlns="http://www.w3.org/1999/html">
  <div class="h-screen mr-8" style="margin-left: 332px">
    <v-skeleton-loader v-if="isFetchingWorkout" type="list-item-two-line" class="mt-8 rounded-sm"></v-skeleton-loader>

    <div v-else-if="!isExisting" class="text-h4 my-8 text-center">Workout doesn't exist!</div>

    <div v-else>
      <div v-if="exercises.length === 0" class="text-h4 my-8 text-center">Workout contains no exercises.</div>
      <Exercise v-else v-for="(exercise, i) in exercises" :key="exercise.exerciseId"
                v-model:exercise="exercises[i]"
                v-model:exercises="exercises"/>
    </div>

    <ActionModal v-model:open-modal="isCreatingExercise">
      <template v-slot:mainButton>
        <div class="d-flex justify-center mt-4">
          <v-btn icon="mdi-plus" color="primary" size="large" @click="handleCreateExercise"></v-btn>
        </div>
      </template>

      <template v-slot:header>
        <v-card-item prepend-icon="mdi-pencil">
          <v-card-title>Create your exercise!</v-card-title>
        </v-card-item>
      </template>

      <template v-slot:input>
        <form @submit.prevent>
          <v-text-field label="Exercise name" v-model="newExercise.name" variant="underlined" :rules="Object.values(nameRules)" class="px-6"></v-text-field>
          <v-text-field @keyup.enter="handleReallyCreateExercise" label="Exercise pause duration" v-model="newExercise.pauseDuration" variant="underlined" suffix="s" :rules="Object.values(numberRules)" class="px-6"></v-text-field>
        </form>
      </template>

      <template v-slot:actionButton>
        <v-btn class="ms-auto" variant="elevated" color="primary" :disabled="!isExerciseInputValid" @click="handleReallyCreateExercise">
          Create
        </v-btn>
      </template>
    </ActionModal>
  </div>
</template>

<script setup lang="ts">
  import {computed, onMounted, ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {getWorkout} from '../api/WorkoutAPI.ts'
  import {nameRules, numberRules} from '../helper/rules.ts'
  import {createExercise, ExerciseRequest, ExerciseResponse} from '../api/ExerciseAPI'
  import Exercise from '../components/Exercise.vue'
  import ActionModal from '../components/ActionModal.vue'

  const exercises = ref<ExerciseResponse[]>([]);
  const isFetchingWorkout = ref<boolean>(true);
  const isExisting = ref<boolean>(false);

  const isCreatingExercise = ref<boolean>(false);

  const route = useRoute();

  const newExercise = ref<ExerciseRequest>({
    name: '',
    pauseDuration: 0,
    workoutId: Number(route.params.workoutId)
  });

  onMounted(async () => {
    const workoutId: number = Number(route.params.workoutId);

    fetchWorkout(workoutId);
  });

  watch(() => route.params.workoutId, (newWorkoutId, oldWorkoutId) => {
    if (newWorkoutId !== oldWorkoutId) {
      isFetchingWorkout.value = true;

      fetchWorkout(Number(newWorkoutId));
    }
  });

  const isExerciseInputValid = computed(() => {
    return !!newExercise.value.name && newExercise.value.pauseDuration > 0;
  });

  const fetchWorkout = (workoutId: number) => {
    getWorkout(workoutId)
        .then(workoutResponse => {
          exercises.value = workoutResponse.exercises;
          isFetchingWorkout.value = false;
          isExisting.value = true;
        }).catch(() => {
          isFetchingWorkout.value = false;
          isExisting.value = false;
        });
  }

  const handleReallyCreateExercise = () => {
    if (!isExerciseInputValid.value) return;

    createExercise(newExercise.value)
        .then(exercise => {
          exercises.value.push(exercise);
          newExercise.value = {
            name: '',
            pauseDuration: 0,
            workoutId: Number(route.params.workoutId)
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          isCreatingExercise.value = false;
        });
  }

  const handleCreateExercise = () => {
    isCreatingExercise.value = true;
  }
</script>

<style scoped>

</style>