import { AxiosResponse } from 'axios'
import axiosInstance from './BaseAPI.ts'
import { Exercise } from './ExerciseAPI.ts'

export interface WorkoutRequest {
    name: string
}

export interface WorkoutResponse {
    workoutId: number
    name: string
    exercises: Exercise[]
}

export async function getWorkouts(){
    return axiosInstance.get<WorkoutResponse[]>(`/workouts`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export async function getWorkout(workoutId: number): Promise<WorkoutResponse> {
    return axiosInstance.get<WorkoutResponse>(`/workouts/${workoutId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export async function deleteWorkout(workoutId: number) {
    return axiosInstance.delete<WorkoutResponse>(`/workouts/${workoutId}`)
        .catch(error => {
            throw error;
        });
}

export async function createWorkout(newWorkout: WorkoutRequest) {
    return axiosInstance.post<WorkoutRequest, AxiosResponse<WorkoutResponse>>(`/workouts`, newWorkout)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}