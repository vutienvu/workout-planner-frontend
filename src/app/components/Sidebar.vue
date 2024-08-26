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

          <ActionModal v-model:open-modal="isCreatingWorkout">
              <template v-slot:mainButton>
                <div class="d-flex justify-center my-2">
                  <v-btn icon="mdi-plus" size="small" @click="handleCreateWorkout"></v-btn>
                </div>
              </template>

              <template v-slot:header>
                <v-card-item prepend-icon="mdi-pencil">
                  <v-card-title>Create your workout!</v-card-title>
                </v-card-item>
              </template>

              <template v-slot:input>
                <form @submit.prevent>
                  <v-text-field @keyup.enter="handleReallyCreateWorkout" v-model="currentWorkoutName" label="Workout name" variant="underlined" :rules="Object.values(nameRules)" class="px-6"></v-text-field>
                </form>
              </template>

              <template v-slot:actionButton>
                <v-btn class="ms-auto" variant="elevated" color="primary" :disabled="!isWorkoutNameValid" @click="handleReallyCreateWorkout">
                  Create
                </v-btn>
              </template>

              <template v-slot:snackbarText>
                <template>
                  <div class="text-center ma-2">
                    <v-snackbar
                        v-model="isCreated"
                        :timeout="2000"
                        location="top"
                        color="green"
                        style="--v-layout-left: 0"
                    >
                      Successfuly created workout!
                    </v-snackbar>
                  </div>
                </template>
              </template>
            </ActionModal>
          <ActionModal v-model:open-modal="isRemovingWorkout">
            <template v-slot:header>
              <v-card-item prepend-icon="mdi-delete">
                <v-card-title>Delete your workout!</v-card-title>
              </v-card-item>
            </template>

            <template v-slot:input>
              <v-card-text>
                Are you sure you want to remove this workout?
              </v-card-text>
            </template>

            <template v-slot:actionButton>
              <v-btn class="ms-auto" variant="elevated" color="red" @click="handleReallyRemoveWorkout">
                Remove
              </v-btn>
            </template>

            <template v-slot:snackbarText>
              <template>
                <div class="text-center ma-2">
                  <v-snackbar
                      v-model="isRemoved"
                      :timeout="2000"
                      location="top"
                      color="green"
                      style="--v-layout-left: 0"
                  >
                    Successfuly removed workout!
                  </v-snackbar>
                </div>
              </template>
            </template>
          </ActionModal>
          <ActionModal v-model:open-modal="isUpdatingWorkout">
            <template v-slot:header>
              <v-card-item prepend-icon="mdi-pencil">
                <v-card-title>Update your workout!</v-card-title>
              </v-card-item>
            </template>

            <template v-slot:input>
              <form @submit.prevent>
                <v-text-field @keyup.enter="handleReallyUpdateWorkout" v-model="currentWorkoutName" label="Workout name" variant="underlined" :rules="Object.values(nameRules)" class="px-6"></v-text-field>
              </form>
            </template>

            <template v-slot:actionButton>
              <v-btn class="ms-auto" variant="elevated" color="primary" :disabled="!isWorkoutNameValid" @click="handleReallyUpdateWorkout">
                Update
              </v-btn>
            </template>

            <template v-slot:snackbarText>
              <template>
                <div class="text-center ma-2">
                  <v-snackbar
                      v-model="isUpdated"
                      :timeout="2000"
                      location="top"
                      color="green"
                      style="--v-layout-left: 0"
                  >
                    Successfuly updated workout!
                  </v-snackbar>
                </div>
              </template>
            </template>
          </ActionModal>
      </v-navigation-drawer>
    </aside>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {
  getWorkouts,
  createWorkout,
  WorkoutRequest,
  WorkoutResponse,
  updateWorkout,
  deleteWorkout
} from '../api/WorkoutAPI.ts'
import {nameRules} from '../helper/rules.ts'
import ActionModal from './ActionModal.vue'

const workouts = ref<WorkoutResponse[]>([]);
const currentWorkoutId = ref<number>();
const currentWorkoutName = ref<string>('');

const isCreatingWorkout = ref<boolean>(false);
const isCreated = ref<boolean>(false);

const isUpdatingWorkout = ref<boolean>(false);
const isUpdated = ref<boolean>(false);

const isRemovingWorkout = ref<boolean>(false);
const isRemoved = ref<boolean>(false);

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

const isWorkoutNameValid = computed(() => {
  return !!currentWorkoutName.value && currentWorkoutName.value.trim() !== '';
});

const handleReallyCreateWorkout = () => {
  if (!isWorkoutNameValid.value) return;

  const newWorkout: WorkoutRequest = {
    name: currentWorkoutName.value
  };

  createWorkout(newWorkout)
      .then(workout => {
        workouts.value.push(workout);
        isCreated.value = true;
        currentWorkoutName.value = "";
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        isCreatingWorkout.value = false;
      })
}

const handleReallyUpdateWorkout = () => {
  if (!isWorkoutNameValid.value) return;

  const newWorkout: WorkoutRequest = {
    name: currentWorkoutName.value
  };

  if (currentWorkoutId.value) {
    updateWorkout(currentWorkoutId.value, newWorkout)
        .then(() => {
          workouts.value.forEach(w => {
            if (w.workoutId === currentWorkoutId.value) {
              w.name = currentWorkoutName.value;
              currentWorkoutName.value = "";
              return;
            }
          });

          isUpdated.value = true;
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => {
          isUpdatingWorkout.value = false;
        });
  }
}

const handleReallyRemoveWorkout = () => {
  if (currentWorkoutId.value) {
    deleteWorkout(currentWorkoutId.value)
        .then(() => {
          workouts.value = workouts.value.filter((w: WorkoutResponse) => w.workoutId !== currentWorkoutId.value);
          isRemoved.value = true;
          router.push({
            name: 'home'
          });
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => {
          isRemovingWorkout.value = false;
        })
  }
}

const handleOpenWorkout = (workoutId: number) => {
  router.push({
    name: 'workout',
    params: {
      workoutId: workoutId
    }
  });
}

const handleCreateWorkout = () => {
  isCreatingWorkout.value = true;
  currentWorkoutName.value = '';
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