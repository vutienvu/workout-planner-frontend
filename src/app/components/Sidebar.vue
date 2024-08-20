<template>
    <aside>
      <v-navigation-drawer :width="300">
        <v-list-item title="Your workouts"></v-list-item>
        <v-divider></v-divider>
          <v-skeleton-loader v-if="isFetchingWorkouts" type="list-item-two-line"></v-skeleton-loader>

          <div v-else v-if="workouts.length > 0" v-for="workout in workouts" :key="workout.workoutId" class="position-relative">
              <v-list-item link height=50 :title="workout.name" @click="handleOpenWorkout(workout.workoutId)"></v-list-item>
              <div class="position-absolute right-0" style="top: 50%; transform: translateY(-50%)">
                <v-btn icon="mdi-pencil" size="x-small"  color="primary" @click="(e: Event) => handleUpdateWorkout(e, workout.workoutId, workout.name)" class="mr-1"></v-btn>
                <v-btn icon="mdi-delete" size="x-small" @click="(e: Event) => handleRemoveWorkout(e, workout.workoutId)" class="mr-1"></v-btn>
              </div>
          </div>

          <div class="d-flex justify-center my-2">
            <v-btn icon="mdi-plus" size="small" @click="isCreatingWorkout = true"></v-btn>
          </div>

          <WorkoutModal v-model:workouts="workouts" v-model:open-modal="isCreatingWorkout" :create-type="true"/>
          <WorkoutModal v-model:workouts="workouts" v-model:open-modal="isUpdatingWorkout" :workout-id="currentWorkoutId" :old-workout-name="currentWorkoutName" :create-type="false"/>
          <DeleteModal v-model:workouts="workouts" v-model:open-modal="isRemovingWorkout" :workout-id="currentWorkoutId" type="workout"/>
      </v-navigation-drawer>
    </aside>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {getWorkouts, WorkoutResponse} from '../api/WorkoutAPI.ts'
import WorkoutModal from './WorkoutModal.vue'
import DeleteModal from './DeleteModal.vue'

const workouts = ref<WorkoutResponse[]>([]);
const currentWorkoutId = ref<number>();
const currentWorkoutName = ref<string>();
const isCreatingWorkout = ref<boolean>(false);
const isUpdatingWorkout = ref<boolean>(false);
const isRemovingWorkout = ref<boolean>(false);
const isFetchingWorkouts = ref<boolean>(true);

const router = useRouter();

onMounted(async () => {
  getWorkouts()
      .then(workoutsResponse => {
          workouts.value = workoutsResponse;
          isFetchingWorkouts.value = false;
      }).catch(error => {
          console.log(error.response);
          isFetchingWorkouts.value = false;
      });
});

watch(() => workouts.value, (newValue, oldValue) => {
  if((oldValue.length - newValue.length) === 1) {
    router.push({
      name: 'home'
    });
  }
});

const handleOpenWorkout = (workoutId: number) => {
  router.push({
    name: 'workout',
    params: {
      workoutId: workoutId
    }
  });
}

const handleUpdateWorkout = (event: Event, workoutId: number, workoutName: string) => {
  event.stopPropagation();
  isUpdatingWorkout.value = true;
  currentWorkoutName.value = workoutName
  currentWorkoutId.value = workoutId;
}

const handleRemoveWorkout = (event: Event, workoutId: number) => {
  event.stopPropagation();
  isRemovingWorkout.value = true;
  currentWorkoutId.value = workoutId;
}
</script>

<style scoped>

</style>