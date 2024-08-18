<template>
  <div class="h-screen mr-8" style="margin-left: 332px">
    <v-skeleton-loader v-if="isFetchingWorkout" type="list-item-two-line" class="mt-8 rounded-sm"></v-skeleton-loader>

    <div v-else>
      <div v-if="workout?.exercises.length === 0" class="text-h4 my-8 text-center">Workout contains no exercises.</div>
      <Exercise v-else v-for="exercise in workout?.exercises" :key="exercise.exerciseId" :exercise-name="exercise.name" :is-fetching="isFetchingWorkout"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {getWorkout, WorkoutResponse} from '../api/WorkoutAPI.ts'
  import Exercise from '../components/Exercise.vue'

  const workout = ref<WorkoutResponse | null>(null);
  const isFetchingWorkout = ref<boolean>(true);

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
          workout.value = workoutResponse;
          isFetchingWorkout.value = false;
        }).catch(error => {
          console.log(error.response);
          isFetchingWorkout.value = false;
        });
  }

</script>

<style scoped>

</style>