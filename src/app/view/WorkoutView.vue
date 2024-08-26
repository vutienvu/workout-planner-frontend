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
          <v-text-field label="Exercise name" variant="underlined" class="px-6"></v-text-field>
          <v-text-field label="Exercise pause duration" variant="underlined" suffix="s" class="px-6"></v-text-field>
        </form>
      </template>

      <template v-slot:actionButton>
        <v-btn class="ms-auto" variant="elevated" color="primary">
          Create
        </v-btn>
      </template>
    </ActionModal>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {getWorkout} from '../api/WorkoutAPI.ts'
  import {ExerciseResponse} from '../api/ExerciseAPI'
  import Exercise from '../components/Exercise.vue'
  import ActionModal from '../components/ActionModal.vue'

  const exercises = ref<ExerciseResponse[]>([]);
  const isFetchingWorkout = ref<boolean>(true);
  const isExisting = ref<boolean>(false);

  const isCreatingExercise = ref<boolean>(false);

  const route = useRoute();

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

  const handleCreateExercise = () => {
    isCreatingExercise.value = true;
  }
</script>

<style scoped>

</style>