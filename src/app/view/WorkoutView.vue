<template>
  <div class="h-screen mr-8" style="margin-left: 332px">
    <v-skeleton-loader v-if="isFetchingWorkout" type="list-item-two-line" class="mt-8 rounded-sm"></v-skeleton-loader>

    <Exercise v-else v-for="exercise in workout?.exercises" :key="exercise.exerciseId" :exercise-name="exercise.name" :is-fetching="isFetchingWorkout"/>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {getWorkout, Workout} from '../api/WorkoutAPI.ts'
  import Exercise from '../components/Exercise.vue'

  const workout = ref<Workout | null>(null);
  const isFetchingWorkout = ref<boolean>(true);

  const route = useRoute();

  onMounted(async () => {
    const workoutId: number = Number(route.params.workoutId);

    getWorkout(workoutId).then(workoutResponse => {
      workout.value = workoutResponse;
      isFetchingWorkout.value = false;
    }).catch(error => {
      console.log("ERROR: ", error);
    });
  });

  watch(() => route.params.workoutId, (newWorkoutId, oldWorkoutId) => {
    if (newWorkoutId !== oldWorkoutId) {
      isFetchingWorkout.value = true;

      getWorkout(Number(newWorkoutId)).then(workoutResponse => {
        workout.value = workoutResponse;
        isFetchingWorkout.value = false;
      }).catch(error => {
        console.log("ERROR: ", error);
      });
    }
  });


</script>

<style scoped>

</style>