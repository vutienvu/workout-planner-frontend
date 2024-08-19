<template xmlns="http://www.w3.org/1999/html">
  <div class="h-screen mr-8" style="margin-left: 332px">
    <v-skeleton-loader v-if="isFetchingWorkout" type="list-item-two-line" class="mt-8 rounded-sm"></v-skeleton-loader>

    <div v-else>
      <div v-if="exercises.length === 0" class="text-h4 my-8 text-center">Workout contains no exercises.</div>
      <Exercise v-else v-for="exercise in exercises" :key="exercise.exerciseId"
                :exercise-id="exercise.exerciseId"
                :name="exercise.name"
                :pause-duration="exercise.pauseDuration"
                :workout-id="exercise.workoutId"
                v-model:exercises="exercises"/>
    </div>

    <div class="d-flex justify-center mt-4">
      <v-btn icon="mdi-plus" color="primary" size="large" @click="handleCreateExercise"></v-btn>
    </div>

    <ExerciseModal create-type v-model:exercises="exercises as ExerciseResponse[]" v-model:open-modal="isCreatingExercise"/>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {getWorkout} from '../api/WorkoutAPI.ts'
  import {ExerciseResponse} from '../api/ExerciseAPI'
  import Exercise from '../components/Exercise.vue'
  import ExerciseModal from '../components/ExerciseModal.vue'

  const exercises = ref<ExerciseResponse[]>([]);
  const isFetchingWorkout = ref<boolean>(true);
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
    getWorkout(Number(workoutId))
        .then(workoutResponse => {
          exercises.value = workoutResponse.exercises;
          isFetchingWorkout.value = false;
        }).catch(error => {
          console.log(error.response);
          isFetchingWorkout.value = false;
        });
  }

  const handleCreateExercise = () => {
    isCreatingExercise.value = true;
  }
</script>

<style scoped>

</style>