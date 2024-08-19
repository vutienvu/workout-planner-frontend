import { createRouter, createWebHistory } from 'vue-router'

const routes= [
    {
        path: '/',
        name: 'home',
        component: () => import('../view/EmptyView.vue')
    },
    {
        path: '/workouts/:workoutId',
        name: 'workout',
        component: () => import('../view/WorkoutView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router