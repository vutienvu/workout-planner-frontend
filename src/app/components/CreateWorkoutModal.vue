<template>
  <div class="d-flex justify-center my-2">
    <v-btn icon="mdi-plus" size="small" @click="isOpen = true"></v-btn>
  </div>

  <v-dialog v-model="isOpen" width="400">
    <v-card
        max-width="400"
        prepend-icon="mdi-pencil"
        title="Create your new workout!"
    >
      <v-text-field v-model="workoutName" label="Workout name" variant="underlined" :rules="[workoutNameRules.required, workoutNameRules.noWhiteSpaces]" class="px-6"></v-text-field>
      <template v-slot:actions>
        <v-btn
            class="ms-auto"
            text="Create"
            variant="elevated"
            color="primary"
        ></v-btn>
        <v-btn
            class=""
            text="Cancel"
            @click="isOpen = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {computed, ref} from 'vue'
import {createWorkout, WorkoutRequest} from '../api/WorkoutAPI.ts'


const isOpen = ref<boolean>(false);
const workoutName = ref<string>("");

const handleCreateWorkout = () => {
  const newWorkout: WorkoutRequest = {
    name: workoutName.value
  };

  createWorkout(newWorkout)
      .then(workout => {
        console.log(workout)
      })
      .catch(error => {
        console.log(error);
      })

}

</script>

<style scoped>

</style>