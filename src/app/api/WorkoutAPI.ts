import axiosInstance from './BaseAPI.ts'
import { Exercise } from './ExerciseAPI.ts'

export interface Workout {
    workoutId: number
    name: string
    exercises: Exercise[]
}

export async function getWorkouts(){
    return axiosInstance.get<Workout[]>(`/workouts`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export async function getWorkout(workoutId: number): Promise<Workout> {
    return axiosInstance.get<Workout>(`/workouts/${workoutId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export async function deleteWorkout(workoutId: number) {
    return axiosInstance.delete<Workout>(`/workouts/${workoutId}`)
        .catch(error => {
            throw error;
        });
}