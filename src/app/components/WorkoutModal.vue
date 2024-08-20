<template>
  <v-dialog v-model="isOpen" width="400">
    <v-card
        max-width="400"
        prepend-icon="mdi-pencil"
        :title="props.createType ? 'Create your workout!' : 'Edit your workout!'"
    >
      <form @submit.prevent>
        <v-text-field @keyup.enter="handleCreateWorkout()" v-model="workoutName" label="Workout name" variant="underlined" :rules="Object.values(workoutNameRules)" class="px-6"></v-text-field>
      </form>

      <template v-slot:actions>
        <v-btn
            class="ms-auto"
            :text="props.createType ? 'Create' : 'Update'"
            variant="elevated"
            color="primary"
            :disabled="!isWorkoutNameValid"
            @click="props.createType ? handleCreateWorkout() : handleUpdateWorkout()"
        ></v-btn>
        <v-btn
            text="Cancel"
            @click="isOpen = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <template>
    <div class="text-center ma-2">
      <v-snackbar
          v-model="isDone"
          :timeout="2000"
          location="top"
          color="green"
          style="--v-layout-left: 0"
      >
        {{ props.createType ? "Workout successfuly created!" : "Workout successfuly updated!"}}
      </v-snackbar>
    </div>
  </template>
</template>

<script setup lang="ts">
import {computed, watch, ref} from 'vue'
import {createWorkout, updateWorkout, WorkoutResponse, WorkoutRequest} from '../api/WorkoutAPI.ts'

interface WorkoutModalProps {
  workoutId?: number
  oldWorkoutName?: string
  createType: boolean
}

const workouts = defineModel<WorkoutResponse[]>('workouts', { required: true});
const isOpen = defineModel<boolean>('openModal', { required: true});

const props = defineProps<WorkoutModalProps>();

const isDone = ref<boolean>(false);
const workoutName = ref<string>("");

watch(() => isOpen.value, (newValue) => {
  if(newValue && props.oldWorkoutName) {
    workoutName.value = props.oldWorkoutName;
  }
});

const handleUpdateWorkout = () => {
  const newWorkout: WorkoutRequest = {
    name: workoutName.value
  };

  if (props.workoutId) {
    updateWorkout(props.workoutId, newWorkout)
        .then(() => {
          workouts.value.forEach(w => {
            if (w.workoutId === props.workoutId) {
              w.name = workoutName.value;
              isOpen.value = false;
              workoutName.value = "";
              return;
            }
          });
        })
        .catch(error => {
          console.log(error.response);
        });
  }
}

const handleCreateWorkout = () => {
  if (!isWorkoutNameValid.value) return;

  const newWorkout: WorkoutRequest = {
    name: workoutName.value
  };

  createWorkout(newWorkout)
      .then(workout => {
        workouts.value.push(workout);
        isDone.value = true;
        isOpen.value = false;
        workoutName.value = "";
      })
      .catch(error => {
        console.log(error);
        isOpen.value = false;
      })

}

const isWorkoutNameValid = computed(() => {
  return !!workoutName.value && workoutName.value.trim() !== '';
});

const workoutNameRules = {
  required: (value: string) => !!value || 'Workout name is required',
  noWhiteSpaces: (value: string) => value.trim() !== '' || 'Workout name cannot be only whitespaces'
};
</script>

<style scoped>

</style>