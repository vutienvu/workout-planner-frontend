<template>
    <aside>
      <v-navigation-drawer :width="300">
        <v-list-item title="Your workouts"></v-list-item>
        <v-divider></v-divider>
          <v-skeleton-loader v-if="isFetchingWorkouts" type="list-item-two-line"></v-skeleton-loader>

          <div v-else v-if="workouts.length > 0" v-for="workout in workouts" :key="workout.workoutId" class="position-relative">
              <v-list-item link height=50 :title="workout.name" @click="handleOpenWorkout(workout.workoutId)"></v-list-item>
              <div class="position-absolute right-0" style="top: 50%; transform: translateY(-50%)">
                <v-btn icon="mdi-pencil" size="x-small"  color="primary" @click="handleRenameWorkout" class="mr-1"></v-btn>
                <v-btn icon="mdi-delete" size="x-small" @click="handleDeleteWorkout" class="mr-1"></v-btn>
              </div>
          </div>
      </v-navigation-drawer>
    </aside>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {getWorkouts, Workout} from '../api/WorkoutAPI.ts'

const workouts = ref<Workout[]>([]);
const isFetchingWorkouts = ref<boolean>(true);

const router = useRouter();

onMounted(async () => {
  getWorkouts()
      .then(workoutsResponse =>
          {
            workouts.value = workoutsResponse;
            isFetchingWorkouts.value = false;
          })
      .catch(error =>
          {
            console.log("ERROR: ", error);
          });
});

const handleOpenWorkout = (workoutId: number) => {
  router.push({
    name: 'workout',
    params: {
      workoutId: workoutId
    }
  });
}

const handleRenameWorkout = (event: Event) => {
  event.stopPropagation();
  alert("Edit workout name.")
}

const handleDeleteWorkout = (event: Event) => {
  event.stopPropagation();
  alert("Delete workout.");
}

</script>

<style scoped>

</style>