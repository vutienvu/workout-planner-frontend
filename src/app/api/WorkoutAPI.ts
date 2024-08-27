import { AxiosResponse as Response } from 'axios'
import BaseAPI from './BaseAPI.ts'
import { ExerciseResponse } from './ExerciseAPI.ts'

export interface WorkoutRequest {
    name: string
}

export interface WorkoutResponse {
    workoutId: number
    name: string
    exercises: ExerciseResponse[]
}

const WorkoutAPI = {
    API: new BaseAPI(),
    DOMAIN: 'workouts',

    getAll: function() : Promise<WorkoutResponse[]> {
        return this.API.getAll<WorkoutResponse>([this.DOMAIN]);
    },

    get: function(workoutId: number): Promise<WorkoutResponse> {
        return this.API.get<WorkoutResponse>([this.DOMAIN, workoutId]);
    },

    create: function(newWorkout: WorkoutRequest): Promise<WorkoutResponse> {
        return this.API.post<WorkoutResponse>([this.DOMAIN], newWorkout);
    },

    delete: function(workoutId: number): Promise<Response> {
        return this.API.delete([this.DOMAIN, workoutId]);
    },

    update: function(workoutId: number, newWorkout: WorkoutRequest): Promise<Response> {
        return this.API.put([this.DOMAIN, workoutId], newWorkout);
    }
}

export default WorkoutAPI;