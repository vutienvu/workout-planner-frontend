<template>
  <v-dialog v-model="isOpen" width="500">
    <v-card max-width="600" :title="`Are you sure you want to remove this ${type}?`">
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Remove" variant="elevated" color="red" @click="handleRemove"></v-btn>
        <v-btn text="Cancel" @click="isOpen = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {deleteWorkout, WorkoutResponse} from '../api/WorkoutAPI.ts'

interface Props {
  workoutId: number | undefined,
  type: string
}

const props = defineProps<Props>();

const workouts = defineModel<WorkoutResponse[]>('workouts', { required: true });
const isOpen = defineModel<boolean>('openModal', { required: true });

const handleRemove = () => {
  if (props.workoutId) {
    deleteWorkout(props.workoutId)
        .then(() => {
          workouts.value = workouts.value.filter((w: WorkoutResponse) => w.workoutId !== props.workoutId);
          isOpen.value = false;
        })
        .catch(error => {
          isOpen.value = false;
          console.log(error.response);
        });
  }
}
</script>

<style scoped>

</style>