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