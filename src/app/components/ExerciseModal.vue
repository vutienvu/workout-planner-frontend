<template>
  <v-dialog v-model="isOpen" width="400">
    <v-card max-width="400" prepend-icon="mdi-pencil" :title="createType ? 'Create your exercise' : 'Update your exercise'">
      <v-text-field v-model="exerciseName" label="Exercise name" variant="underlined" :rules="Object.values(exerciseNameRules)" class="px-6"></v-text-field>
      <v-text-field v-model="pauseDuration" suffix="s" label="Pause duration" variant="underlined" :rules="Object.values(exercisePauseDurationRules)" class="px-6"></v-text-field>

      <template v-slot:actions>
        <v-btn class="ms-auto" :text="createType ? 'Create' : 'Update'" variant="elevated" color="primary" @click="createType ? handleCreateExercise() : handleUpdateExercise()"></v-btn>
        <v-btn text="Cancel" @click="isOpen = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {createExercise, updateExercise, ExerciseRequest, ExerciseResponse} from '../api/ExerciseAPI'

  interface Props {
    exerciseId?: number,
    exerciseName?: string,
    pauseDuration?: number,
    workoutId?: number,
    createType: boolean
  }

  const exercises = defineModel<ExerciseResponse[]>('exercises', { required: true });
  const isOpen = defineModel<boolean>('openModal', { required: true});

  const exerciseName = ref<string>("");
  const pauseDuration = ref<number>(0);

  const props = defineProps<Props>();

  const route = useRoute();

  watch(() => isOpen.value, (newValue) => {
    if(newValue && props.exerciseName && props.pauseDuration) {
      exerciseName.value = props.exerciseName;
      pauseDuration.value = props.pauseDuration;
    }
  })

  const handleUpdateExercise = () => {
    const newExercise: ExerciseRequest = {
      name: exerciseName.value,
      pauseDuration: pauseDuration.value,
      workoutId: props.workoutId!
    }

    updateExercise(props.exerciseId!, newExercise)
        .then(() => {
          exercises.value.forEach(e => {
            if(e.exerciseId === props.exerciseId) {
              e.name = newExercise.name;
              e.pauseDuration = newExercise.pauseDuration;
              isOpen.value = false;
              exerciseName.value = "";
              pauseDuration.value = 0;
              return;
            }
          })
        })
        .catch(error => {
          console.log(error.response);
        })
  }

  const handleCreateExercise = () => {
    const newExercise: ExerciseRequest = {
      name: exerciseName.value,
      pauseDuration: pauseDuration.value,
      workoutId: Number(route.params.workoutId)
    };

    createExercise(newExercise)
        .then(exercise => {
          exercises.value.push(exercise);
          isOpen.value = false;
          exerciseName.value = "";
          pauseDuration.value = 0;
        })
        .catch(error => {
          console.log(error);
          isOpen.value = false;
        })
  }

  const exerciseNameRules = {
    required: (value: string) => !!value || 'Exercise name is required',
    noWhiteSpaces: (value: string) => value.trim() !== '' || 'Exercise name cannot be only whitespaces'
  };

  const exercisePauseDurationRules = {
    shouldBeNumber: (value: number) => !isNaN(value) || 'Exercise pause duration should be a number',
    shouldBeWholeNumber: (value: number) => (value - Math.floor(value)) === 0 || 'Exercise pause duration should be a whole number',
    shouldBePositive: (value: number) => value > 0 || 'Exercise pause duration should be a positive number'
  }
</script>

<style scoped>

</style>