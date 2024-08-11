import { createRouter, createWebHistory } from 'vue-router'

const routes= [
    {
        path: '/',
        component: () => import('../view/EmptyView.vue')
    },
    {
        path: '/workout',
        component: () => import('../view/WorkoutView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router