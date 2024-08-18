import { AxiosResponse } from 'axios'
import axiosInstance from './BaseAPI.ts'


export interface ExerciseRequest {
    name: string,
    pauseDuration: number,
    workoutId: number
}

export interface ExerciseResponse {
    exerciseId: number
    name: string
    pauseDuration: number
    workoutId: number
}

export async function deleteExercise(exerciseId: number) {
    axiosInstance.delete<ExerciseResponse>(`/exercises/${exerciseId}`)
        .catch(error => {
            throw error;
        });
}

export async function createExercise(newExercise: ExerciseRequest) {
    return axiosInstance.post<ExerciseRequest, AxiosResponse<ExerciseResponse>>('/exercises', newExercise)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}