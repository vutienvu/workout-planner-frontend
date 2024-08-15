import axiosInstance from './BaseAPI.ts'
import { Exercise } from './ExerciseAPI.ts'

export interface Workout {
    workoutId: number
    name: string
    exercises: Exercise[]
}

export async function getWorkouts(){
    const workouts: Workout[] = await axiosInstance.get<Workout[]>('/workouts').then(response => {
        console.log("Calling getWorkouts!");
        return response.data;
    }).catch(error => {
        console.error("Error fetching workouts: ", error);
        return [];
    });

    return workouts;
}

export async function getWorkout(workoutId: number) {
    return axiosInstance.get<Workout>(`/workouts/${workoutId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export async function deleteWorkout(workoutId: number) {
    await axiosInstance.delete<Workout>(`/workouts/${workoutId}`).then(() => {
        console.log("Successfuly deleted workout.");
    }).catch(error => {
        console.error("Error fetching workout: ", error);
        return null;
    });

    return workout;
}